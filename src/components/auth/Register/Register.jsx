import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBuilding,
  FaPhone,
  FaIdCard,
  FaHashtag,
} from "react-icons/fa";
import logo from "../../../assets/images/logo.svg";

const Register = () => {
  const [isBusiness, setIsBusiness] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center w-full p-4">
      <div className=" bg-opacity-20 backdrop-blur-md  rounded-lg  w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="" />
        </div>

        {/* Switch Button */}
        <div className="flex justify-center space-x-4 mb-6 bg-white w-fit mx-auto p-1 rounded-full">
          <button
            className={`px-6 py-2 rounded-full transition-colors ${
              !isBusiness
                ? "bg-[#FED800] text-white"
                : "bg-transparent text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => setIsBusiness(false)}
          >
            Private
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-colors ${
              isBusiness
                ? "bg-[#FED800] text-white"
                : "bg-transparent text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setIsBusiness(true)}
          >
            Business
          </button>
        </div>

        {/* Form Title */}
        <h2 className="text-2xl font-bold text-center mb-2 text-white">
          Create New Account
        </h2>
        <p className="text-[#B4B4B4] text-sm text-center mb-6">
          Set up your username and password <br /> you can always change it
          later.
        </p>

        {/* Registration Form */}
        <form className="space-y-4 overflow-y-auto h-[40vh] max-w-[335px] mx-auto scrollbar-hide">
          {/* Common Fields */}
          <div className="flex items-center bg-[#808493] rounded-md py-3 px-2">
            <FaUser className="text-[#FED700] mx-2" />
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center bg-[#808493] rounded-md py-3 px-2">
            <FaEnvelope className="text-[#FED700] mx-2" />
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center bg-[#808493] rounded-md py-3 px-2">
            <FaLock className="text-[#FED700] mx-2" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-white mx-2"
            >
              {showPassword ? (
                <FaEyeSlash color="#D8D8D8" />
              ) : (
                <FaEye color="#D8D8D8" />
              )}
            </button>
          </div>

          <div className="flex items-center bg-[#808493] rounded-md py-3 px-2">
            <FaLock className="text-[#FED700] mx-2" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm Password"
              className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-white mx-2"
            >
              {showConfirmPassword ? (
                <FaEyeSlash color="#D8D8D8" />
              ) : (
                <FaEye color="#D8D8D8" />
              )}
            </button>
          </div>

          {/* Business-Specific Fields */}
          {isBusiness && (
            <>
              <div className="flex items-center bg-[#808493] rounded-md py-3 px-2 ">
                <FaBuilding className="text-[#FED700] mx-2" />
                <input
                  type="text"
                  id="businessName"
                  placeholder="Business Name"
                  className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center bg-[#808493] rounded-md py-3 px-2">
                <FaPhone className="text-[#FED700] mx-2" />
                <input
                  type="tel"
                  id="contactNumber"
                  placeholder="Contact Number"
                  className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center bg-[#808493] rounded-md py-3 px-2">
                <FaIdCard className="text-[#FED700] mx-2" />
                <input
                  type="text"
                  id="registrationNo"
                  placeholder="Registration No"
                  className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center bg-[#808493] rounded-md py-3 px-2">
                <FaHashtag className="text-[#FED700] mx-2" />
                <input
                  type="text"
                  id="ntnNumber"
                  placeholder="NTN Number"
                  className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
                  required
                />
              </div>
            </>
          )}

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-[#FED700] text-white py-2 px-4 rounded-md hover:bg-opacity-30 transition-colors"
          >
            Create Account
          </button>
        </form>

        {/* Already Have an Account? Log In */}
        <p className="text-center text-white pb-10 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FED700] hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
