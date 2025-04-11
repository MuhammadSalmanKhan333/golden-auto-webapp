import React, { useState } from "react";

const CarCategories = () => {
  const [activeTab, setActiveTab] = useState("honda");

  const brands = {
    honda: {
      name: "Honda",
      image:
        "https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      ad: {
        title: "Honda Summer Sale",
        description: "Get 0% APR financing on all 2023 models",
        cta: "View Offers",
      },
    },
    audi: {
      name: "Audi",
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      ad: {
        title: "Audi Premium Selection",
        description: "Certified Pre-Owned with extended warranty",
        cta: "Explore CPO",
      },
    },
    bmw: {
      name: "BMW",
      image:
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      ad: {
        title: "BMW Ultimate Drive",
        description: "Test drive the new electric lineup",
        cta: "Book Now",
      },
    },
    mercedes: {
      name: "Mercedes",
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      ad: {
        title: "Mercedes-Benz Event",
        description: "Exclusive lease offers this month",
        cta: "Learn More",
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col">
        {/* Centered Tabs with more width */}
        <div className="flex justify-center space-x-8">
          {Object.keys(brands).map((brandKey) => (
            <button
              key={brandKey}
              onClick={() => setActiveTab(brandKey)}
              className={`py-4 px-1 text-center lg:min-w-[200px] border-b-2 font-medium text-sm ${
                activeTab === brandKey
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {brands[brandKey].name}
            </button>
          ))}
        </div>

        {/* Image Container with Ad Card */}
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <img
            src={brands[activeTab].image}
            alt={`${brands[activeTab].name} car`}
            className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover object-center"
          />

          {/* Ad Card Overlay */}
          <div className="absolute top-6 left-6 bg-gray-900 bg-opacity-50 p-6 rounded-lg max-w-xs backdrop-blur-[2px] border border-gray-700 border-opacity-50">
            <h3 className="text-lg font-bold text-white drop-shadow-md mb-2">
              {brands[activeTab].ad.title}
            </h3>
            <p className="text-gray-100 mb-4 drop-shadow-sm">
              {brands[activeTab].ad.description}
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:shadow-lg">
              {brands[activeTab].ad.cta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCategories;
