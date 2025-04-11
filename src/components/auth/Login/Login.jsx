import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../../assets/images/logo.svg";
import emailIcon from "../../../assets/icons/emailIcon.svg";
import passwordIcon from "../../../assets/icons/passwordIcon.svg";

const Login = () => {
  const [isBusiness, setIsBusiness] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center w-full p-4"
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="bg-opacity-20 backdrop-blur-md rounded-lg  w-full max-w-md">
        {/* Logo */}
        <Link to='/' className="flex justify-center">
          <img src={logo} alt="Logo" className="w-36 h-36" />{" "}
        </Link>

        {/* Switch Button */}
        <div className="flex justify-center min-w-[335px] space-x-4 mb-6 bg-white w-fit mx-auto p-1 rounded-full">
          <button
            className={`px-11.5 py-2 rounded-full transition-colors ${
              !isBusiness
                ? "bg-[#FED800] text-white"
                : "bg-transparent text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => setIsBusiness(false)}
          >
            Private
          </button>
          <button
            className={`px-11.5 py-2 rounded-full transition-colors ${
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
        <h2 className="text-2xl font-bold text-center mb-2 text-[#FED700]">
          Welcome Back
        </h2>

        {/* Registration Form */}
        <form className="space-y-4  max-w-[335px] mx-auto mb-3">
          {/* Email Field */}
          <div className="flex items-center bg-[#344C63] rounded-md py-4 px-2">
            <img src={emailIcon} alt="" className="mr-2" />
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center bg-[#344C63] rounded-md py-4 px-2">
            <img src={passwordIcon} alt="" className="mr-2" />
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

          {/* Log In Button */}
          <button
            type="submit"
            className="w-full bg-[#FED700] text-white py-3 px-4 rounded-md hover:bg-opacity-30 transition-colors"
          >
            Log In
          </button>
        </form>

        {/* Already Have an Account? Log In */}
        <p className="text-center text-white text-sm">
          First time here? 
          <Link to="/register" className="text-[#FED700] hover:underline ml-1">
             Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
