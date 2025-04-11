import React from "react";
import Slider from "react-slick";

const brands = [
  { name: "Honda", logo: "/brands/honda.png" },
  { name: "Jaguar", logo: "/brands/jagure.png" },
  { name: "Nissan", logo: "/brands/nissan.png" },
  { name: "Mercedes", logo: "/brands/mercedes.png" },
  { name: "Audi", logo: "/brands/audi.png" },
  { name: "BMW", logo: "/brands/bmw.png" },
  { name: "Tesla", logo: "/brands/tesla.png" },
];

const settings = {
  infinite: true,
  speed: 1500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  arrows: false,
  cssEase: "ease",
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 4 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 500,
      settings: { slidesToShow: 2 },
    },
  ],
};

const BrandCarousel = () => {
  return (
    <div className="max-w-[1200px] mx-6 sm:mx-10 xl:mx-auto mt-28">
      <h2 className="text-[#FED700] text-2xl font-semibold text-left pl-3">
        Brands
      </h2>
      <div className="max-w-[1200px] px-10 mx-auto overflow-hidden mt-5 border-3 border-[#293041] rounded-2xl p-2 bg-[#1D2834]">
        <Slider {...settings}>
          {brands.map((brand, index) => (
            <div key={index} className="pl-16 !w-0">
              {" "}
              {/* Adjust horizontal spacing */}
              <div className="size-24 flex flex-col justify-center items-center bg-[#111827] rounded-2xl border border-[#293041] p-4 cursor-pointer">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="size-8 object-contain mb-2"
                />
                <p className="text-white text-sm font-normal">{brand.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BrandCarousel;
