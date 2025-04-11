import { FaStar, FaGasPump, FaUsers, FaCogs, FaCarSide } from "react-icons/fa";
import React from "react";

const CarCard = ({ car }) => {
  return (
    <div className="rounded-xl border-2 border-[#293041] p-2 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="bg-[#1c2331] p-4 rounded-xl text-white shadow-lg mx-auto">
        {/* Rating Section */}
        <div className="flex items-center text-yellow-400 text-lg font-semibold mb-2">
          <FaStar />
          <span className="ml-1">4.9</span>
          <span className="text-gray-400 ml-1">/ 5.0</span>
        </div>

        {/* Car Image */}
        <img
          src={car.image}
          alt={car.name}
          className="max-w-[200px] mx-auto rounded-lg my-6"
        />

        {/* Car Details */}
        <div className="w-full">
          <p className="text-gray-400">{car.name}</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-normal">{car.subname}</p>
            <p className="text-yellow-400 text-lg font-medium">$90,000</p>
          </div>
        </div>

        <div className="border-b border-gray-600 my-3"></div>

        {/* Features Section */}
        <div className="flex flex-wrap max-[500px]:gap-6 min-[500px]:gap-5 justify-between text-gray-300 text-sm w-full">
          <div className="flex items-center gap-1">
            <FaGasPump className="text-yellow-400" />
            <span>Petrol</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUsers className="text-yellow-400" />
            <span>4</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCogs className="text-yellow-400" />
            <span>Manual</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCarSide className="text-yellow-400" />
            <span>Hatchback</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
