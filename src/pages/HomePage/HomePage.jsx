import React from "react";
import Navbar from "../../components/layout/Navbar";
import SearchBar from "../../components/ui/SearchBar";
import BrandCarousel from "../../components/ui/BrandCarousel";
import HeroSection from "../../components/ui/HeroSection";
import CarServies from "../../components/ui/CarServices/CarServices";
import BannerSection from "../../components/ui/NewsSection/BannerSection";
import Footer from "../../components/layout/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#151F28] pt-20">
      <Navbar />
      <HeroSection />
      <SearchBar />
      <BrandCarousel />
      <CarServies />
      <BannerSection />
      <Footer />
    </div>
  );
};

export default HomePage;
