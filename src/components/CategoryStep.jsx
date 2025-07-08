import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { fetchData } from "../services/apiService"; // General API function
const CategoryStep = ({
  categoryData,
  setCategoryData,
  updateCategoryData,
}) => {
  const {
    category,
    subCategory,
    manufacturer,
    model,
    name,
    price,
    description,
  } = categoryData;
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);

  const [errorCategories, setErrorCategories] = useState("");
  const [errorSubCategories, setErrorSubCategories] = useState("");
  const [errorBrands, setErrorBrands] = useState("");
  const [errorModels, setErrorModels] = useState("");

  // Fetch categories and brands on mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setErrorCategories("");
      try {
        const data = await fetchData("categories");
        setCategories(data?.data || []);
      } catch (error) {
        setErrorCategories(error.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    const fetchBrands = async () => {
      setLoadingBrands(true);
      setErrorBrands("");
      try {
        const data = await fetchData("brands?pagination[limit]=200");
        setBrands(data.data);
      } catch (error) {
        setErrorBrands(error.message);
      } finally {
        setLoadingBrands(false);
      }
    };

    fetchCategories();
    fetchBrands();
  }, []);

  // Fetch subcategories when category is selected
  useEffect(() => {
    if (!category?.id) return;

    const fetchSubCategories = async () => {
      setLoadingSubCategories(true);
      setErrorSubCategories("");
      try {
        const path = `sub-categories?filters[category][id]=${category.id}&pagination[limit]=200`;
        const data = await fetchData(path);
        setSubCategories(data?.data || []);
      } catch (error) {
        setErrorSubCategories(error.message);
      } finally {
        setLoadingSubCategories(false);
      }
    };

    fetchSubCategories();
  }, [category]);

  // Fetch models when manufacturer is selected
  useEffect(() => {
    if (!manufacturer?.id) {
      setModels([]);
      return;
    }

    const loadModels = async () => {
      setLoadingModels(true);
      setErrorModels("");
      try {
        const data = await fetchData(
          `models?filters[brand][id]=${manufacturer.id}&pagination[limit]=200`
        );
        setModels(data.data);
      } catch (error) {
        setErrorModels(error.message);
      } finally {
        setLoadingModels(false);
      }
    };

    loadModels();
  }, [manufacturer]);

  const dropdownClass = (isDisabled) =>
    `w-full p-3 rounded-lg border border-gray-600 bg-[#1F2937] appearance-none focus:outline-none focus:ring-2 ${
      isDisabled
        ? "text-gray-500 cursor-not-allowed"
        : "focus:ring-yellow-400 cursor-pointer"
    }`;

  return (
    <div className="bg-[#1e212b] rounded-lg p-6 text-white shadow-md w-full mx-auto">
      <h2 className="text-xl font-semibold text-[#FED700] mb-1">
        Basic Information
      </h2>
      <p className="text-sm text-gray-300 mb-6">
        Please provide basic information about your product.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Category */}
        <div>
          <label className="block mb-2 text-md font-semibold text-[#FED700]">
            Category
          </label>
          <div className="relative">
            <select
              className={dropdownClass(false)}
              value={category?.id || ""}
              onChange={(e) => {
                const selected = categories.find(
                  (cat) => cat.id === Number(e.target.value)
                );
                updateCategoryData("category", selected || null);
                updateCategoryData("subCategory", null);
                updateCategoryData("manufacturer", null);
                updateCategoryData("model", null);
              }}
            >
              <option value="">Select a category</option>
              {loadingCategories ? (
                <option disabled>Loading...</option>
              ) : errorCategories ? (
                <option disabled>Error loading categories</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-200 text-md pointer-events-none">
              <FaChevronDown />
            </div>
          </div>
        </div>

        {/* Subcategory */}
        <div>
          <label className="block mb-2 text-md font-semibold text-[#FED700]">
            Subcategory
          </label>
          <div className="relative">
            <select
              className={dropdownClass(!category)}
              value={subCategory?.id || ""}
              onChange={(e) => {
                const selected = subCategories.find(
                  (sub) => sub.id === Number(e.target.value)
                );
                updateCategoryData("subCategory", selected || null);
                updateCategoryData("manufacturer", null);
                updateCategoryData("model", null);
              }}
              disabled={!category || loadingSubCategories}
            >
              <option value="">Select a subcategory</option>
              {loadingSubCategories ? (
                <option disabled>Loading...</option>
              ) : errorSubCategories ? (
                <option disabled>Error loading subcategories</option>
              ) : (
                subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))
              )}
            </select>
            <div
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                !category ? "text-gray-500" : "text-gray-200"
              } text-md pointer-events-none`}
            >
              <FaChevronDown />
            </div>
          </div>
        </div>

        {/* Manufacturer */}
        <div>
          <label className="block mb-2 text-md font-semibold text-[#FED700]">
            Manufacturer
          </label>
          <div className="relative">
            <select
              className={dropdownClass(!subCategory)}
              value={manufacturer?.id || ""}
              onChange={(e) => {
                const selected = brands.find(
                  (brand) => brand.id === Number(e.target.value)
                );
                updateCategoryData("manufacturer", selected || null);
                updateCategoryData("model", null);
              }}
              disabled={!subCategory}
            >
              <option value="">Select a manufacturer</option>
              {loadingBrands ? (
                <option disabled>Loading...</option>
              ) : errorBrands ? (
                <option disabled>Error loading brands</option>
              ) : (
                brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))
              )}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-200 text-md pointer-events-none">
              <FaChevronDown />
            </div>
          </div>
        </div>

        {/* Model */}
        <div>
          <label className="block mb-2 text-md font-semibold text-[#FED700]">
            Model
          </label>
          <div className="relative">
            <select
              className={dropdownClass(!manufacturer)}
              value={model?.id || ""}
              onChange={(e) => {
                const selected = models.find(
                  (m) => m.id === Number(e.target.value)
                );
                updateCategoryData("model", selected || null);
              }}
              disabled={!manufacturer}
            >
              <option value="">Select a model</option>
              {loadingModels ? (
                <option disabled>Loading...</option>
              ) : errorModels ? (
                <option disabled>Error loading models</option>
              ) : (
                models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))
              )}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-200 text-md pointer-events-none">
              <FaChevronDown />
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-2 text-md font-semibold text-[#FED700]">
            Name
          </label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-[#1F2937] appearance-none text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FED700]"
            value={name}
            onChange={(e) => updateCategoryData("name", e.target.value)}
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label className="block mb-2 text-md font-semibold text-[#FED700]">
            Price
          </label>
          <input
            type="number"
            className="w-full p-3 rounded-lg bg-[#1F2937] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FED700] hide-spinner"
            value={price}
            onChange={(e) => updateCategoryData("price", e.target.value)}
            placeholder="Enter price"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 text-md font-semibold text-[#FED700]">
            Description
          </label>
          <textarea
            className="w-full p-3 rounded-lg bg-[#1F2937] appearance-none text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FED700]"
            value={description}
            onChange={(e) => updateCategoryData("description", e.target.value)}
            placeholder="Enter description about Vehicle"
            rows={3}
          ></textarea>
        </div>
      </div>

      {/* Selected Display */}
      {model && (
        <div className="text-green-400 text-sm mt-4">
          <p>
            Selected: {category?.name} &gt; {subCategory?.name} &gt;{" "}
            {manufacturer?.name} &gt; {model?.name} &gt; {name} - ${price}
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryStep;
