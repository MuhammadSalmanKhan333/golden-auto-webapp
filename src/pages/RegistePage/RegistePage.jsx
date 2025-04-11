import React from "react";
import Register from "../../components/auth/Register/Register";
import { Carousel } from "antd";
import carImage1 from "../../assets/images/car1.png";
import carImage2 from "../../assets/images/car2.png";
import carImage3 from "../../assets/images/car3.png";
import "./RegistePage.css";
import { Link } from "react-router-dom";

const RegistePage = () => {
  return (
    <div className="flex h-screen bg-[#151F28]">
      {/* Left Side: Login/Register Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-5 backdrop-blur-md">
        <Register />
      </div>

      {/* Right Side: Carousel with Images and Text Overlay */}
      <div className="flex-1 hidden md:block relative overflow-hidden">
        <Carousel autoplay effect="fade">
          <div>
            <div
              className="h-screen bg-cover bg-center relative"
              style={{ backgroundImage: `url(${carImage1})` }}
            >
              <div className="absolute top-20 left-10 text-white max-w-md">
                <h3 className="text-4xl font-bold mb-4">
                  Locate the Destination
                </h3>
                <p className="text-lg">
                  Your destination is at your fingertips. Open app & enter where
                  you want to go
                </p>
              </div>
              <Link 
                to="/" 
                className="absolute top-20 right-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-2 px-4 rounded-full transition-all duration-300 border border-white/30"
              >
                Skip
              </Link>
            </div>
          </div>
          <div>
            <div
              className="h-screen bg-cover bg-center relative"
              style={{ backgroundImage: `url(${carImage2})` }}
            >
              <div className="absolute top-20 left-10 text-white max-w-md">
                <h3 className="text-4xl font-bold mb-4">Your Perfect Ride</h3>
                <p className="text-lg">
                  Find your perfect ride - filter by brand, model, price, and
                  more.
                </p>
              </div>
              <Link 
                to="/" 
                className="absolute top-20 right-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-2 px-4 rounded-full transition-all duration-300 border border-white/30"
              >
                Skip
              </Link>
            </div>
          </div>
          <div>
            <div
              className="h-screen bg-cover bg-center relative"
              style={{ backgroundImage: `url(${carImage3})` }}
            >
              <div className="absolute top-20 left-10 text-white max-w-md">
                <h3 className="text-4xl font-bold mb-4">Selling your Car?</h3>
                <p className="text-lg">
                  We make it easy and fast to connect with buyers
                </p>
              </div>
              <Link
                to="/" 
                className="absolute top-20 right-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-2 px-4 rounded-full transition-all duration-300 border border-white/30"
              >
                Skip
              </Link>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default RegistePage;
