import React from "react";
import RentCarSection from "./RentCarSection";
import BuyCarSection from "./BuyCarSection";

const CarServices = () => {
  return (
    // <section className="px-5 sm:px-10 xl:px-20 border border-red-500">
    <section className="max-w-[1200px] mx-auto max-xl:mx-10 mt-28">
      <div className="text-center mb-20">
        <h1 className="text-3xl font-semibold text-[#FED700]">ALL SERVICES</h1>
      </div>
      <RentCarSection />
      <BuyCarSection />
    </section>
    // </section>
  );
};

export default CarServices;
