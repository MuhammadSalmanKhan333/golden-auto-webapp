import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CarCard from "../CarCard";
import car4 from "../../../assets/images/CarCard.png";
import car5 from "../../../assets/images/CarCard.png";
import car6 from "../../../assets/images/CarCard.png";
import { Link } from "react-router-dom";

const buyCarData = [
  {
    id: 4,
    image: car4,
    name: "Audi",
    subname: "A8 2022",
    price: 1900,
    fuel: "Petrol",
    seats: 4,
    transmission: "Manual",
    type: "Hatchback",
  },
  {
    id: 5,
    image: car5,
    name: "Mercedes",
    subname: "G-Class 2021",
    price: 3200,
    fuel: "Diesel",
    seats: 5,
    transmission: "Automatic",
    type: "SUV",
  },
  {
    id: 6,
    image: car6,
    name: "BMW",
    subname: "M5 2020",
    price: 2800,
    fuel: "Hybrid",
    seats: 4,
    transmission: "Manual",
    type: "Sedan",
  },
];

const BuyCarSection = () => {
  return (
    <div className="rounded-lg mt-20">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-semibold text-[#FED700]">Best Selling</h2>
        <Link
          to="/listing"
          className="flex items-center text-lg text-[#FED700] font-medium"
        >
          View All <FaArrowRight className="ml-2 text-[#FED700]" size={20} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {buyCarData.map((car) => (
          <Link key={car.id} to={`/details`}>
            <CarCard car={car} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BuyCarSection;
