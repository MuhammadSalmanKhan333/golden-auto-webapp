import MainImage from "../../assets/images/main-img.png";
import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full bg-[#151F28] lg:my-10 relative overflow-hidden">
      <div className="mx-8 md:mx-14 xl:mx-auto max-w-[1200px] flex flex-col lg:flex-row items-center">
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-1/2 py-10 md:py-16 z-10">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-[#FED700] mb-4 sm:mb-6 md:mb-10">
            Buy, sell & rent{" "}
            <span className="text-red-500 block">reputable cars</span>
          </h1>
          <p className="text-gray-100 text-base sm:text-lg mt-2 font-light max-w-[450px]">
            Buy and sell reputable cars. Renting a car is easy and fast with
            Topcar.
          </p>
          <div className="flex gap-6 md:gap-10 mt-6 md:mt-10">
            <p className="font-bold text-xl sm:text-2xl md:text-3xl text-[#FED700] flex flex-col gap-1">
              50+{" "}
              <span className="text-gray-100 font-normal text-sm sm:text-base">
                Car brands
              </span>
            </p>
            <div className="border-[0.5px] border-[#d2cdcd] h-8 md:h-12"></div>
            <p className="font-bold text-xl sm:text-2xl md:text-3xl text-[#FED700] flex flex-col gap-1">
              10k+{" "}
              <span className="text-gray-100 font-normal text-sm sm:text-base">
                Clients
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE - Desktop */}
        <div className="hidden lg:block absolute -right-8 top-0 h-full w-1/2">
          <img
            src={MainImage}
            className="h-full max-w-[1200px] w-full object-contain"
            alt="Luxury sports car"
          />
        </div>

        {/* RIGHT IMAGE - Mobile and Tablet */}
        <div className="w-full px-4 py-3 lg:hidden">
          <img
            src={MainImage}
            className="w-full h-auto max-h-[400px] object-contain mx-auto"
            alt="Luxury sports car"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
