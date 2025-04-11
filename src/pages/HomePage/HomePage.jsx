import React from "react";
import BrandCarousel from "../../components/ui/BrandCarousel";
import HeroSection from "../../components/ui/HeroSection";
import CarServies from "../../components/ui/CarServices/CarServices";
import BannerSection from "../../components/ui/NewsSection/BannerSection";
import CarCategories from "../../components/ui/CarCategories";
import LatestCar from "../../components/ui/LatestCar";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#151F28]">
      <HeroSection />
      <BrandCarousel />
      <CarServies />
      <CarCategories />
      <LatestCar />
      <BannerSection />
    </div>
  );
};

export default HomePage;
