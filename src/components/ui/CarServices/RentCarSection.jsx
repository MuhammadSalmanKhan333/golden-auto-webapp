import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CarCard from "../CarCard";
import car1 from "../../../assets/images/CarCard.png";
import car2 from "../../../assets/images/CarCard.png";
import car3 from "../../../assets/images/CarCard.png";

const rentCarData = [
  { id: 1, image: car1, name: "Mazda", subname: "MX2 2019", price: 400 },
  { id: 2, image: car2, name: "Maserati", subname: "Levante 2021", price: 500 },
  {
    id: 3,
    image: car3,
    name: "Bentley",
    subname: "Flying Spur 2019",
    price: 700,
  },
];

const RentCarSection = () => {
  return (
    <div className="rounded-lg">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-semibold text-gray-300">RENT CAR</h2>
        <a
          href="#"
          className="flex items-center text-lg text-[#FED700] font-medium"
        >
          See all <FaArrowRight className="ml-2 text-[#FED700]" size={20} />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rentCarData.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default RentCarSection;
