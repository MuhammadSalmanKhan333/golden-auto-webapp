import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CarCard from "../CarCard";
import car1 from "../../../assets/images/CarCard.png";
import car2 from "../../../assets/images/CarCard.png";
import car3 from "../../../assets/images/CarCard.png";
import { Link } from "react-router-dom";

const rentCarData = [
  {
    id: 1,
    image: car1,
    name: "Audi",
    subname: "A8 2022",
    price: 1900,
    fuel: "Petrol",
    seats: 4,
    transmission: "Manual",
    type: "Hatchback",
  },
  {
    id: 2,
    image: car2,
    name: "Mercedes",
    subname: "G-Class 2021",
    price: 3200,
    fuel: "Diesel",
    seats: 5,
    transmission: "Automatic",
    type: "SUV",
  },
  {
    id: 3,
    image: car3,
    name: "BMW",
    subname: "M5 2020",
    price: 2800,
    fuel: "Hybrid",
    seats: 4,
    transmission: "Manual",
    type: "Sedan",
  },
];

const RentCarSection = () => {
  return (
    <div className="rounded-lg">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-semibold text-[#FED700] ">Nearby Car</h2>
        <Link
          to="/listing"
          className="flex items-center text-lg text-[#FED700] font-medium"
        >
          View All <FaArrowRight className="ml-2 text-[#FED700]" size={20} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rentCarData.map((car) => (
          <Link to={`/details`}>
            <CarCard key={car.id} car={car} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RentCarSection;
