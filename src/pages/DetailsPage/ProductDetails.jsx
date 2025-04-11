import React, { useEffect, useState } from "react";
import mainImage from "../../assets/images/productImages/PImage.png";
import fuelImage from "../../assets/images/icons/fuel.png";
import mielageImage from "../../assets/images/icons/mielage.png";
import dateImage from "../../assets/images/icons/calendar.png";
import profileImage from "../../assets/images/profileImage.jpg";
import {
  FiEye,
  FiEyeOff,
  FiShoppingCart,
  FiMessageCircle,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
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
  const [showNumber, setShowNumber] = useState(false);

  const phoneNumber = "123 456 7890";
  const maskedNumber = phoneNumber.replace(/\d/g, "*").replace(/^.{3}/, "123");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const popularFeatures = [
    { label: "Exterior Color", value: "Red" },
    { label: "Interior Color", value: "Grey" },
    { label: "Drivetrain", value: "All-wheel Drive" },
    { label: "MPG", value: "21-27" },
    { label: "Fuel Type", value: "Gasoline" },
    { label: "Transmission", value: "10-Speed Automatic" },
    { label: "Engine", value: "2.0L I4 16V GDI DOHC Turbo" },
    { label: "VIN", value: "5JKB5825TB8VC" },
    { label: "Stock", value: "32,769 mi" },
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
    <section className="bg-[#151F28] min-h-screen pt-4 md:pt-8 ">
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
        <div className="sm:w-full lg:min-w-[400px] bg-gray-700 rounded-xl shadow-md p-4 space-y-6">
          {/* Profile Header */}
          <div className="flex gap-6">
            <img
              src={profileImage}
              alt="Profile"
              className="size-20 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-[#FED700] text-xl">Mark Jane</h2>
              <p className="text-md text-gray-200">Member since: 4 years</p>
              <p className="text-md text-gray-200">Account type: private</p>
              <p className="text-sm text-green-600 font-medium mt-1">
                ● User is online now!
              </p>
              <div className="flex items-center gap-2 text-gray-200 my-4">
                <div className="bg-green-100 p-1 rounded-full flex items-center justify-center">
                  <FiMapPin className="text-green-600 size-4" />
                </div>
                <span>70 Washington Street</span>
              </div>
              <a
                href="#"
                className="text-red-500 font-semibold underline hover:text-red-600"
              >
                See all ads
              </a>
            </div>
          </div>

          {/* Mobile Number Toggle */}
          <div className="bg-blue-200/50 flex items-center justify-between px-4 py-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-full">
                <FiPhone className="text-blue-500 cursor-pointer" />
              </div>
              <span className="text-lg font-semibold text-gray-800 tracking-wide cursor-pointer">
                {showNumber ? phoneNumber : maskedNumber}
              </span>
            </div>
            <button
              onClick={() => setShowNumber(!showNumber)}
              className="text-[#FED700] hover:text-yellow-500 font-bold cursor-pointer"
            >
              {showNumber ? <FiEyeOff size={26} /> : <FiEye size={26} />}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="flex items-center justify-center gap-2 w-full sm:w-1/2 px-4 py-3 bg-[#FED700]  text-lg font-semibold rounded-md hover:bg-yellow-500 transition cursor-pointer">
              <FiShoppingCart /> Buy Now
            </button>
            <button className="flex items-center justify-center gap-2 w-full sm:w-1/2 px-4 py-3 bg-[#FED700]  text-lg font-semibold rounded-md hover:bg-yellow-500 transition cursor-pointer">
              <FiMessageCircle /> Chat
            </button>
          </div>
        </div>
      </div>

      {/* overviews section */}
      <div className="max-[500px]:!mx-6 max-lg:mx-12 max-w-4xl lg:ml-10 xl:ml-28 mt-6 py-10">
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
          <h3 className="text-[#FED700] text-lg font-semibold mb-6">
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

        {/* Popular Features Section */}
        <div className="py-8">
          <h3 className="text-[#FED700] text-xl font-semibold mb-6">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {popularFeatures.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 justify-between border-b border-gray-600 py-2"
              >
                <span className="text-gray-400 font-medium">{item.label}</span>
                <span className="text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
