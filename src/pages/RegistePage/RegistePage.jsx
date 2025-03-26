import React from "react";
import Register from "../../components/auth/Register/Register";
import { Carousel } from "antd";
import carImage1 from "../../assets/images/car1.png";
import carImage2 from "../../assets/images/car2.png";
import carImage3 from "../../assets/images/car3.png";
import "./RegistePage.css";

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
              className="h-screen bg-cover bg-center flex justify-center items-center"
              style={{ backgroundImage: `url(${carImage1})` }}
            >
              <h3 className="text-white text-4xl text-center text-shadow">
                Explore the Best Cars
              </h3>
            </div>
          </div>
          <div>
            <div
              className="h-screen bg-cover bg-center flex justify-center items-center"
              style={{ backgroundImage: `url(${carImage2})` }}
            >
              <h3 className="text-white text-4xl text-center text-shadow">
                Luxury and Performance
              </h3>
            </div>
          </div>
          <div>
            <div
              className="h-screen bg-cover bg-center flex justify-center items-center"
              style={{ backgroundImage: `url(${carImage3})` }}
            >
              <h3 className="text-white text-4xl text-center text-shadow">
                Your Dream Car Awaits
              </h3>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default RegistePage;