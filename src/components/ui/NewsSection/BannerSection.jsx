import React from "react";
import bannerImage from "../../../assets/images/bannerImage.png";
import { Link } from "react-router-dom";

const BannerSection = () => {
  return (
    <div className="bg-black text-white mt-20 relative">
      {/* Image Section */}
      <div>
        <img
          src={bannerImage}
          alt="Car banner"
          className="h-[450px] w-full object-cover"
        />
      </div>

      {/* Content Section - Now aligned to the right */}
      <div className="text-left -translate-y-1/2 absolute lg:max-w-[450px] lg:right-20 max-[500px]:px-4 max-w-[350px] md:max-w-[380px] md:right-14 right-4 top-1/2 xl:right-44">
        <h2 className="text-2xl text-yellow-400 font-bold lg:text-4xl">
          CAR NEWS
        </h2>
        <p className="text-justify text-sm md:text-[19px] mt-4">
          More than 5000 car owners are selling and effectively renting on
          Topcar. Register to become our partner today to increase your monthly
          income.
        </p>
        <div className="flex flex-col gap-4 mt-6 sm:flex-row">
          <Link
            to="/register"
            className="bg-white rounded-md text-black text-center font-semibold hover:bg-gray-200 md:px-6 md:py-3 px-4 py-2"
          >
            Register
          </Link>
          <button className="bg-red-600 cursor-pointer rounded-md text-white font-semibold hover:bg-red-700 md:px-6 md:py-3 px-4 py-2">
            Post news
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
