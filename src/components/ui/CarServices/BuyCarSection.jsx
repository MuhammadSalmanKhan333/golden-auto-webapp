import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CarCard from "../CarCard";
import car4 from "../../../assets/images/CarCard.png";
import car5 from "../../../assets/images/CarCard.png";
import car6 from "../../../assets/images/CarCard.png";

const buyCarData = [
  { id: 4, image: car4, name: "Audi", subname: "A8 2022", price: 900 },
  {
    id: 5,
    image: car5,
    name: "Mercedes",
    subname: "G-Class 2021",
    price: 1200,
  },
  { id: 6, image: car6, name: "BMW", subname: "M5 2020", price: 800 },
];

const BuyCarSection = () => {
  return (
    <div className="rounded-lg mt-20">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-semibold text-gray-300">BUY CAR</h2>
        <a
          href="#"
          className="flex items-center text-lg text-[#FED700] font-medium"
        >
          See all <FaArrowRight className="ml-2 text-[#FED700]" size={20} />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {buyCarData.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default BuyCarSection;
