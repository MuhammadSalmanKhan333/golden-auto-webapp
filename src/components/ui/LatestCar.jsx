import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowDropDown, MdArrowForward, MdArrowBack } from "react-icons/md";
import {fetchData} from "../../services/apiService"
import utils from "../../utils/utils"

const LatestCar = () => {
  const [categories, setCategories] = useState([]); // [{id, name}]
  const [carData, setCarData] = useState({}); // { [name]: [...] }
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [visibleCategories, setVisibleCategories] = useState([]);

  const filters = ["All", ...categories.map((cat) => cat.name)];

  // Fetch categories and their cars
  useEffect(() => {
    const fetchCategoriesAndCars = async () => {
      try {
        // Step 1: Fetch Categories
        const categoryRes = await fetchData(`/categories`);
        const categoryList = categoryRes.data; // Adjust based on actual API

        setCategories(categoryList);
        setVisibleCategories([categoryList[0]?.name]);
        setSelectedFilter(categoryList[0]?.name);

       
        const carDataObj = {};
        for (const category of categoryList) {
          const carsRes =  await fetchData(
            `vehicles?populate=brand.brand&populate=brand.model&filters[category][category]=${category.id}&pagination[limit]=8&sort=updatedAt:desc`
          );
          carDataObj[category.name] = carsRes.data;
          console.log(carsRes.data)
        }
        
        setCarData(carDataObj);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchCategoriesAndCars();
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setFilterOpen(false);
    setVisibleCategories(
      filter === "All" ? categories.map((c) => c.name) : [filter]
    );
  };

  const handleLoadMore = () => {
    const remaining = categories
      .map((c) => c.name)
      .filter((name) => !visibleCategories.includes(name));
    if (remaining.length > 0) {
      setVisibleCategories([...visibleCategories, remaining[0]]);
    }
  };

  // Arrow components
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition-all"
    >
      <MdArrowForward className="text-white text-xl" />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition-all"
    >
      <MdArrowBack className="text-white text-xl" />
    </button>
  );

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#FED700]">Latest Cars</h2>
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-1 border border-[#FED700] text-[#FED700] px-4 py-2 rounded-lg hover:bg-[#FED700]/10"
          >
            <span>Filter</span>
            <MdArrowDropDown
              size={20}
              className={`transition-transform ${filterOpen ? "rotate-180" : ""}`}
            />
          </button>
          {filterOpen && (
            <ul className="absolute mt-2 right-0 w-40 bg-white border rounded-lg shadow-lg z-10 overflow-hidden">
              {filters.map((f) => (
                <li
                  key={f}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors ${
                    (f === "All" &&
                      visibleCategories.length === categories.length) ||
                    visibleCategories.includes(f)
                      ? "bg-gray-100 font-medium"
                      : ""
                  }`}
                  onClick={() => handleFilterChange(f)}
                >
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Carousels */}
      <div className="relative">
        {visibleCategories.map(
          (category) =>
            carData[category]?.length > 0 && (
              <div key={category} className="mb-10 relative">
                <h3 className="text-xl text-white font-semibold mb-4">
                  {category}
                </h3>
             <Slider {...sliderSettings}>
  {carData[category].map((car) => (
    <div key={car.id} className="px-2">
      <div className="relative aspect-square w-92 h-92 overflow-hidden rounded-lg shadow-lg group">
        <img
          src={utils.BASE_URL_MEDIA +car.picture?.picture?.[0] || "/placeholder.jpg"}
          alt={car.brand?.model?.name || "Car"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 bg-white/20 backdrop-blur-md text-white w-full">
          <h4 className="font-semibold text-lg">{car.brand?.brand?.name}</h4>
          <p className="text-sm">{car.brand?.model?.name}</p>
        </div>
      </div>
    </div>
  ))}
</Slider>

              </div>
            )
        )}
      </div>

      {/* Load More */}
      {visibleCategories.length < categories.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center bg-[#FED700] hover:bg-[#FED700]/90 text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors shadow hover:shadow-md"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default LatestCar;
