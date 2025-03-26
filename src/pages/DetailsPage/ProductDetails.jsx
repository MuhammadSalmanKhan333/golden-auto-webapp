import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import mainImage from "../../assets/images/productImages/PImage.png";
import fuelImage from "../../assets/images/icons/fuel.png";
import mielageImage from "../../assets/images/icons/mielage.png";
import dateImage from "../../assets/images/icons/calendar.png";
import bodyStyleImage from "../../assets/images/icons/bodyStyle.png";
import tranmissionImage from "../../assets/images/icons/transmission.png";
import exteriorImage from "../../assets/images/icons/exterior.png";
import interiorImage from "../../assets/images/icons/interior.png";
import typeImage from "../../assets/images/icons/type.png";
import engineImage from "../../assets/images/icons/engine.png";
import Slider from "react-slick";
import car1 from "../../assets/images/productImages/Pimage1.png";
import car2 from "../../assets/images/productImages/Pimage2.png";
import car3 from "../../assets/images/productImages/Pimage3.png";
import car4 from "../../assets/images/productImages/Pimage4.png";
import car5 from "../../assets/images/productImages/Pimage5.png";
import "./ProductDetails.css";
const ProductDetails = () => {
  const carDetails = [
    {
      icon: bodyStyleImage,
      label: "Body Style",
      value: "SUV",
    },
    {
      icon: fuelImage,
      label: "Fuel Type",
      value: "Gas",
    },
    {
      icon: mielageImage,
      label: "Mileage",
      value: "Gas",
    },
    {
      icon: tranmissionImage,
      label: "Transmission",
      value: "Automatic",
    },
    {
      icon: exteriorImage,
      label: "Exterior Color",
      value: "Red",
    },
    {
      icon: interiorImage,
      label: "Interior Color",
      value: "White",
    },
    {
      icon: typeImage,
      label: "Drive Type",
      value: "4WD",
    },
    {
      icon: engineImage,
      label: "Engine",
      value: "2 Cylinder",
    },
  ];

  const carImages = [car1, car2, car3, car4, car5];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Show 5 images at a time
    slidesToScroll: 1,
    arrows: true, // Enable Slick's default arrows
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div className="bg-[#151F28] min-h-screen pt-20">
      <Navbar />
      <div className="flex flex-col rounded-xl gap-10 max-w-screen px-12 lg:px-10 xl:px-28 mt-12 mx-auto lg:flex-row max-[500px]:px-6">
        {/* Left Section - Main Image and Slider */}
        <div className="w-full lg:w-[55%] xl:w-[65%]">
          <img
            src={mainImage}
            alt="Car"
            className="h-[450px] rounded-xl shadow-xl w-full object-cover"
          />
          {/* Image Slider */}
          <div className="w-[95%] mt-5 mx-auto">
            <Slider {...settings} className="mt-4 slick-slider">
              {carImages.map((img, index) => (
                <div key={index} className="px-1">
                  <img
                    src={img}
                    alt={`Car ${index + 1}`}
                    className="border-2 border-transparent h-16 rounded-xl w-full cursor-pointer hover:border-red-500 object-cover"
                    onClick={() => setSelectedImage(img)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Right Section - Car Details */}
        <div className="w-full lg:min-w-[400px] pt-2 space-y-4">
          <span className="bg-green-500 rounded text-white px-3 py-1">
            Certified
          </span>
          <div className="flex justify-between gap-10 items-center mt-10 relative">
            <h1 className="text-[#FED700] max-[500px]:text-lg max-[500px]:font-semibold text-2xl font-bold">
              Nissan Murano SV
            </h1>
            <div className="text-2xl max-[500px]:text-lg max-[500px]:font-semibold text-gray-100 font-bold">
              $56,895
            </div>
            <div className="text-gray-200 text-lg -top-8 absolute line-through right-0">
              $66,985
            </div>
          </div>
          <ul className="text-gray-100 my-8 space-y-3">
            <li className="flex gap-3 items-center">
              <img src={dateImage} alt="Year" className="h-5 w-5" /> Year: 2029
            </li>
            <li className="flex gap-3 items-center">
              <img src={mielageImage} alt="Mileage" className="h-5 w-5" />{" "}
              Mileage: 15,000
            </li>
            <li className="flex gap-3 items-center">
              <img src={fuelImage} alt="Fuel" className="h-5 w-5" /> Fuel Type:
              Diesel
            </li>
          </ul>
          <div className="flex gap-4">
            <button className="bg-yellow-300 rounded-lg text-black drop-shadow-lg hover:bg-yellow-500 hover:cursor-pointer px-4 py-1">
              Buy Now
            </button>
            <button className="bg-yellow-300 rounded-lg text-black drop-shadow-lg hover:bg-yellow-500 hover:cursor-pointer px-4 py-1">
              Chat
            </button>
          </div>
        </div>
      </div>

      {/* overviews section */}
      <div className="max-[500px]:!mx-6 max-lg:mx-12 max-w-4xl lg:ml-10 xl:ml-28 my-10 py-10">
        {/* Basic Overview Section */}
        <h2 className="text-[#FED700] text-xl font-semibold mb-6">
          Basic Overview
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
          {carDetails.map((item, index) => (
            <div key={index} className="flex gap-4 items-center">
              <img src={item.icon} alt={item.label} className="h-6 w-6" />
              <div>
                <p className="text-gray-500 text-sm">{item.label}</p>
                <p className="text-white font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Description Section */}
        <div className="border-gray-300 border-y mt-8 py-8">
          <h3 className="text-[#FED700] text-lg font-semibold mb-4">
            Description
          </h3>
          <p className="text-gray-100 text-sm leading-relaxed">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in classical Latin literature from 45 BC, making it
            over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage...
          </p>
          <button className="text-red-500 font-medium hover:cursor-pointer hover:underline mt-2">
            See More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
