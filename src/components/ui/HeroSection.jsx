import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/listing?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="relative">
      {/* Hero section with clip-path */}
      <section className="relative w-full h-[180px] bg-gray-700 flex flex-col justify-center items-center text-center text-white px-5 clip-path-rounded-bottom">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold px-4 mb-5 md:mb-12">
          Let's find your perfect car
        </h1>
      </section>

      {/* Search field positioned absolutely below the clip-path */}
      <div className="absolute -bottom-16 md:-bottom-19 left-0 right-0 flex justify-center">
        <div className="flex flex-col w-full max-w-2xl px-5">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Describe what you're looking for"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-white pl-12 pr-6 shadow-gray-900 py-3 md:py-4 rounded-full border-2 border-gray-700 focus:outline-none text-gray-900 shadow text-sm md:text-base"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>

          {/* Button group */}
          <div className="flex justify-center gap-4 mt-3">
            <Link to="/listing" className="px-6 py-1.5 cursor-pointer rounded-md border-1 border-white text-gray-400">
              Shop New
            </Link>
            <Link to='/listing' className="px-6 py-1.5 cursor-pointer rounded-md border-1 border-white text-gray-400">
              Shop Used
            </Link>
          </div>
        </div>
      </div>

      {/* Custom clip-path for rounded bottom effect */}
      <style jsx global>{`
        .clip-path-rounded-bottom {
          clip-path: ellipse(150% 100% at 50% 0%);
        }
        @media (min-width: 768px) {
          .clip-path-rounded-bottom {
            clip-path: ellipse(120% 100% at 50% 0%);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
