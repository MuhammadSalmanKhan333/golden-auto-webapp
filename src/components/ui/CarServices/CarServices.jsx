import React from "react";
import RentCarSection from "./RentCarSection";
import BuyCarSection from "./BuyCarSection";

const CarServices = () => {
  return (
    <section className="max-w-[1200px] mx-auto max-xl:mx-10 mt-20 md:mt-28">
      <RentCarSection />
      <BuyCarSection />
    </section>
  );
};

export default CarServices;
