import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CarCard from "../CarCard";
import { Link } from "react-router-dom";

const NearbySection = ({ cars, loading, error }) => {
  return (
    <div className="rounded-lg">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-semibold text-[#FED700]">Nearby Car</h2>
        <Link
          to="/listing"
          className="flex items-center text-lg text-[#FED700] font-medium"
        >
          View All <FaArrowRight className="ml-2 text-[#FED700]" size={20} />
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-64 bg-gray-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-gray-700 rounded col-span-2"></div>
                  <div className="h-2 bg-gray-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-gray-400 border-x-4 border-red-500 text-red-700 p-4 mb-6">
          <p className="font-bold">Error loading nearby cars</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      ) : cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <Link to={`/details/${car.id}`} key={car.id}>
              <CarCard car={car} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-lg text-gray-300">
          No nearby cars available at the moment
        </div>
      )}
    </div>
  );
};

export default NearbySection;
