import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../../assets/images/logo.svg";
import Modal from "../../../components/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
const Login = () => {
  const [isBusiness, setIsBusiness] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isOpenLoader, setIsOpenLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);

  const openModalLoader = () => setIsOpenLoader(true);
  const closeModalLoader = () => setIsOpenLoader(false);
  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .max(255, "Email must be less than 255 characters")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Email must follow the standard email format"
        ),
      password: Yup.string().when("isOTPSent", {
        is: false,
        then: Yup.string().required("Password is required"),
      }),
      newPassword: Yup.string().when("isOTPSent", {
        is: true,
        then: Yup.string().required("OTP is required"),
      }),
    }),
    onSubmit: (values) => {
      submitLogin(values);
    },
  });
  const handleForgotPassword = async (email) => {
    openModalLoader();
    try {
      const response = await fetch(
        `http://54.173.110.62:3001/api/users/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setMessage("Password reset OTP sent to your email");
        setIsOTPSent(true);
        setIsForgotPasswordModalOpen(false);
        setIsResetPasswordModalOpen(true);
      } else {
        setMessage("Failed to send reset OTP. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      closeModalLoader();
    }
  };
  const handleResetPassword = async (email, newPassword) => {
    openModalLoader();
    try {
      const response = await fetch(
        `http://54.173.110.62:3001/api/users/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      if (response.ok) {
        setMessage("Password reset successfully.");
        setIsResetPasswordModalOpen(false);
        setIsOTPModalOpen(false);
      } else {
        setMessage("Failed to reset password. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      closeModalLoader();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center w-full p-4"
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="bg-opacity-20  rounded-lg  w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="" />{" "}
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
        <h2 className="text-2xl font-bold text-center mb-2 text-[#FED700]">
          Welcome Back
        </h2>

        {/* Registration Form */}
        <form className="flex flex-col   max-w-[335px] mx-auto mb-3">
          {/* Email Field */}
          <div className="flex items-center bg-[#808493] mb-4 rounded-md py-3 px-2">
            <FaEnvelope className="text-[#FED700] mx-2" />
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
              required
            />
          </div>

          {/* Password Field */}
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
          <span
            className="text-[#E0E0E0] leading-[16px] mb-10 mt-1 cursor-pointer hover:underline text-[16px] font-[500]"
            onClick={() => setIsForgotPasswordModalOpen(true)}
          >
            Forgot password?
          </span>
          {/* Log In Button */}
          <button
            type="submit"
            className="w-full bg-[#FED700] text-white py-2 px-4 rounded-md hover:bg-opacity-30 transition-colors"
          >
            Log In
          </button>
        </form>

        {/* Already Have an Account? Log In */}
        <p className="text-center text-white text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#FED700] hover:underline">
            Register
          </Link>
        </p>
      </div>
      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
        title="Forgot Password"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleForgotPassword(formik.values.identifier);
          }}
        >
          <input
            className="w-full px-4 py-4 mb-4 rounded-lg font-normal text-[#090A0A] leading-[16px] text-[16px] border placeholder-[#72777A] placeholder:font-normal placeholder:text-[16px] placeholder:leading-[16px] focus:outline-none border-[#E3E5E5]"
            type="email"
            name="identifier"
            placeholder="Email"
            value={formik.values.identifier}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500 text-sm mt-4">{message}</div>
          <button
            type="submit"
            className="text-[#fff] cursor-pointer leading-[16px] text-[16px] font-medium mb-7 mt-[46px] tracking-wide bg-[#FED700] w-full py-4 rounded-[48px] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          >
            <span className="ml-3">Send Reset OTP</span>
          </button>
        </form>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        isOpen={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
        title="Reset Password"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleResetPassword();
            formik.values.identifier, formik.values.newPassword;
          }}
        >
          <input
            className="w-full px-4 py-4 mb-4 rounded-lg font-normal text-[#090A0A] leading-[16px] text-[16px] border placeholder-[#72777A] placeholder:font-normal placeholder:text-[16px] placeholder:leading-[16px] focus:outline-none border-[#E3E5E5]"
            type="email"
            name="identifier"
            placeholder="Email"
            value={formik.values.identifier}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled
          />
          <input
            className="w-full px-4 py-4 mb-4 rounded-lg font-normal text-[#090A0A] leading-[16px] text-[16px] border placeholder-[#72777A] placeholder:font-normal placeholder:text-[16px] placeholder:leading-[16px] focus:outline-none border-[#E3E5E5]"
            type="text"
            name="newPassword"
            placeholder="OTP"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500 text-sm mt-4">{message}</div>
          <button
            type="submit"
            className="text-[#fff] leading-[16px] text-[16px] font-medium mb-7 mt-[46px] tracking-wide bg-[#CCAA5A] w-full py-4 rounded-[48px] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          >
            <span className="ml-3">Reset Password</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Login;
