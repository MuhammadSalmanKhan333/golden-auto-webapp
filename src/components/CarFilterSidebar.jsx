// --- CarFilterSidebar.jsx ---
import React, { useState, useRef, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import utils from "../utils/utils";

const CarFilterSidebar = () => {
  const [filters, setFilters] = useState({
    location: "",
    lat: null,
    lng: null,
    radius: 50,
    makeModel: [],
    year: [],
    feul_type: [],
    body_type: [],
    transmission: [],
    engineType: [],
    priceMin: "",
    priceMax: "",
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [dropdowns, setDropdowns] = useState({});
  const [localFilterOptions, setLocalFilterOptions] = useState({
    makeModel: [],
    year: ["2024", "2023", "2022"],
    feul_type: ["Petrol", "Hybrid"],
    body_type: ["Coupe", "Sedan"],
    "Engine & Drive Train": {
      transmission: ["Automatic", "Manual"],
      engineType: ["Gas", "Plug In hybrid"],
    },
  });

  const autocompleteRef = useRef(null);
  const skipUrlSyncRef = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          `${utils.BASE_URL}brands?pagination[limit]=200`,
          {
            headers: { Authorization: `Bearer ${utils.token}` },
          }
        );

        const brands = response.data.data.map((brand) => ({
          id: brand.id,
          name: brand.name,
        }));

        setLocalFilterOptions((prev) => ({
          ...prev,
          makeModel: brands,
        }));

        parseUrlParams();
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const parseUrlParams = () => {
    if (skipUrlSyncRef.current) {
      skipUrlSyncRef.current = false;
      return;
    }

    const parsed = qs.parse(location.search, { ignoreQueryPrefix: true });
    const andFilters = parsed?.filters?.$and || [];

    const newFilters = {
      location: "",
      lat: null,
      lng: null,
      radius: 50,
      makeModel: [],
      year: [],
      feul_type: [],
      body_type: [],
      transmission: [],
      engineType: [],
      priceMin: "",
      priceMax: "",
    };

    for (const filter of andFilters) {
      if (filter.price?.$gte !== undefined)
        newFilters.priceMin = filter.price.$gte;
      if (filter.price?.$lte !== undefined)
        newFilters.priceMax = filter.price.$lte;

      if (filter.$or) {
        filter.$or.forEach((cond) => {
          if (cond.year) newFilters.year.push(cond.year);
          if (cond.body_type) newFilters.body_type.push(cond.body_type);
          if (cond.transmission)
            newFilters.transmission.push(cond.transmission);
          if (cond.engineType) newFilters.engineType.push(cond.engineType);
          if (cond.feul_type) newFilters.feul_type.push(cond.feul_type);
          if (cond.brand?.brand) {
            const matchedBrand = localFilterOptions.makeModel.find(
              (b) =>
                b.id === cond.brand.brand || b.id === Number(cond.brand.brand)
            );
            if (matchedBrand) {
              newFilters.makeModel.push({
                id: matchedBrand.id,
                name: matchedBrand.name,
              });
            }
          }
        });
      }
    }

    setFilters(newFilters);
  };

  useEffect(() => {
    if (localFilterOptions.makeModel.length > 0) {
      parseUrlParams();
    }
  }, [location.search]);

  useEffect(() => {
    const tags = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (key === "makeModel") {
            tags.push({ category: key, value: v.name, id: v.id });
          } else {
            tags.push({ category: key, value: v });
          }
        });
      }
    });
    if (filters.location)
      tags.push({ category: "location", value: filters.location });
    if (filters.priceMin)
      tags.push({ category: "priceMin", value: filters.priceMin });
    if (filters.priceMax)
      tags.push({ category: "priceMax", value: filters.priceMax });
    setSelectedTags(tags);
  }, [filters]);

  const handleLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const location = place.formatted_address;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setFilters((prev) => ({ ...prev, location, lat, lng }));
    }
  };

  const handleManualLocationChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      location: e.target.value,
      lat: null,
      lng: null,
    }));
  };

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTag = (key, value) => {
    setFilters((prev) => {
      if (key === "makeModel") {
        const exists = prev.makeModel.some((m) => m.id === value.id);
        return {
          ...prev,
          makeModel: exists
            ? prev.makeModel.filter((m) => m.id !== value.id)
            : [...prev.makeModel, value],
        };
      } else {
        const current = prev[key] || [];
        const exists = current.includes(value);
        return {
          ...prev,
          [key]: exists
            ? current.filter((v) => v !== value)
            : [...current, value],
        };
      }
    });
  };

  const handleClearAll = () => {
    setFilters({
      location: "",
      lat: null,
      lng: null,
      radius: 50,
      makeModel: [],
      year: [],
      feul_type: [],
      body_type: [],
      transmission: [],
      engineType: [],
      priceMin: "",
      priceMax: "",
    });
    skipUrlSyncRef.current = true;
    navigate("/listing", { replace: true });
  };

  const buildFilterParams = () => {
    const andFilters = [];
    if (filters.priceMin)
      andFilters.push({ price: { $gte: Number(filters.priceMin) } });
    if (filters.priceMax)
      andFilters.push({ price: { $lte: Number(filters.priceMax) } });
    if (filters.year.length > 0)
      andFilters.push({ $or: filters.year.map((year) => ({ year })) });
    if (filters.body_type.length > 0)
      andFilters.push({
        $or: filters.body_type.map((t) => ({ body_type: t })),
      });
    if (filters.transmission.length > 0)
      andFilters.push({
        $or: filters.transmission.map((t) => ({ transmission: t })),
      });
    if (filters.engineType.length > 0)
      andFilters.push({
        $or: filters.engineType.map((e) => ({ engineType: e })),
      });
    if (filters.feul_type.length > 0)
      andFilters.push({
        $or: filters.feul_type.map((f) => ({ feul_type: f })),
      });
    if (filters.makeModel.length > 0) {
      andFilters.push({
        $or: filters.makeModel.map((m) => ({ brand: { brand: m.id } })),
      });
    }
    return qs.stringify(
      { filters: { $and: andFilters } },
      { encode: false, arrayFormat: "indices" }
    );
  };

  // Add this new effect to preserve dropdown states based on filters
  useEffect(() => {
    // Keep dropdowns open for categories that have active filters
    const activeFilterCategories = Object.entries(filters)
      .filter(
        ([key, value]) =>
          Array.isArray(value) &&
          value.length > 0 &&
          (key === "makeModel" ||
            key === "year" ||
            key === "feul_type" ||
            key === "body_type")
      )
      .map(([key]) => key);

    // Also check nested categories like transmission and engineType
    if (filters.transmission?.length > 0 || filters.engineType?.length > 0) {
      activeFilterCategories.push("Engine & Drive Train");
    }

    // Update dropdowns state to keep relevant sections open
    const updatedDropdowns = { ...dropdowns };
    activeFilterCategories.forEach((category) => {
      updatedDropdowns[category] = true;
    });

    setDropdowns(updatedDropdowns);
  }, [filters]);

  return (
    <section className="rounded-xl text-white border-2 border-[#293041] p-2 cursor-pointer hover:shadow-xl transition-all duration-300 w-full max-w-md mx-auto">
      <div className="bg-[#1c2331] rounded-xl p-4 shadow-lg h-[100vh] overflow-y-auto custom-scroll">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-400">Filter</h2>

          {selectedTags.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-sm text-red-400 hover:underline"
            >
              ✕ Clear all
            </button>
          )}
        </div>

        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedTags.map((tag) => (
              <div
                key={`${tag.category}-${tag.value}`}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag.value}
                <FaTimes
                  className="cursor-pointer"
                  onClick={() => {
                    if (tag.category === "makeModel") {
                      setFilters((prev) => ({
                        ...prev,
                        makeModel: prev.makeModel.filter(
                          (m) => m.id !== tag.id
                        ),
                      }));
                    } else {
                      toggleTag(tag.category, tag.value);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Location</label>
          <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white placeholder-gray-400"
              placeholder="Enter a location"
              value={filters.location}
              onChange={handleManualLocationChange}
            />
          </Autocomplete>
          <label className="flex flex-col mt-4">
            <p className="block text-sm font-medium mb-1">Search Radius</p>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.radius}
              onChange={(e) =>
                setFilters({ ...filters, radius: +e.target.value })
              }
              className="w-full mt-2"
            />
          </label>
          <p className="text-xs text-gray-400">{filters.radius} miles</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Price Range ($)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, priceMin: e.target.value }))
              }
              className="w-full p-2 rounded bg-[#1F2937] border border-gray-600 text-white"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, priceMax: e.target.value }))
              }
              className="w-full p-2 rounded bg-[#1F2937] border border-gray-600 text-white"
            />
          </div>
        </div>

        {Object.entries(localFilterOptions).map(([key, options]) => {
          if (typeof options === "object" && !Array.isArray(options)) {
            return (
              <div key={key} className="mb-4">
                <button
                  onClick={() => toggleDropdown(key)}
                  className="flex justify-between items-center w-full font-medium text-left"
                >
                  {key}
                  <FaChevronDown
                    className={`${
                      dropdowns[key] ? "rotate-180" : ""
                    } transition-transform`}
                  />
                </button>
                {dropdowns[key] && (
                  <div className="pl-2 mt-2 space-y-4">
                    {Object.entries(options).map(([subKey, subOptions]) => (
                      <div key={subKey}>
                        <p className="text-sm font-semibold mb-1 text-gray-400">
                          {subKey}
                        </p>
                        <div className="space-y-1">
                          {subOptions.map((option) => (
                            <label
                              key={option}
                              className="flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                checked={filters[subKey]?.includes(option)}
                                onChange={() => toggleTag(subKey, option)}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div key={key} className="mb-3">
                <button
                  onClick={() => toggleDropdown(key)}
                  className="flex justify-between items-center w-full font-medium text-left"
                >
                  {key === "makeModel" ? "Make & Model" : key}
                  <FaChevronDown
                    className={`${
                      dropdowns[key] ? "rotate-180" : ""
                    } transition-transform`}
                  />
                </button>
                {dropdowns[key] && (
                  <div className="mt-2 space-y-2">
                    {options.map((option) => (
                      <label
                        key={option.id || option}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={
                            key === "makeModel"
                              ? filters.makeModel.some(
                                  (m) => m.id === option.id
                                )
                              : filters[key]?.includes(option)
                          }
                          onChange={() => {
                            if (key === "makeModel") {
                              toggleTag(key, option);
                            } else {
                              toggleTag(key, option);
                            }
                          }}
                        />
                        {option.name || option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          }
        })}

        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              const query = buildFilterParams();
              skipUrlSyncRef.current = true;
              navigate(`/listing?${query}`);
            }}
            className="px-4 py-2 bg-[#FED700] text-black rounded cursor-pointer"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarFilterSidebar;
