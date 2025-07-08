import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import utils from "../../../utils/utils";
import logo from "../../../assets/images/logo.svg";
import person from "../../../assets/icons/person.svg";
import passwordIcon from "../../../assets/icons/passwordIcon.svg";
import emailIcon1 from "../../../assets/icons/emailIcon1.svg";
import call from "../../../assets/icons/call.svg";
import ntn from "../../../assets/icons/ntn.svg";
import clipboard from "../../../assets/icons/clipboard.svg";

const Register = () => {
  const navigate = useNavigate();
  const [isBusiness, setIsBusiness] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fname: "",
    lname: "",
    contact: "",
    registration_no: "",
    ntn_no: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.fname.trim()) {
      newErrors.fname = "First name is required";
    }

    if (!formData.lname.trim()) {
      newErrors.lname = "Last name is required";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    }

    if (isBusiness) {
      if (!formData.registration_no.trim()) {
        newErrors.registration_no = "Registration number is required";
      }

      if (!formData.ntn_no.trim()) {
        newErrors.ntn_no = "NTN number is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fname: formData.fname,
        lname: formData.lname,
        contact: formData.contact,
        type: "normal",
        picture: "",
        account_type: isBusiness ? "business" : "private",
        role: 1,
        ...(isBusiness && {
          registration_no: formData.registration_no,
          ntn_no: formData.ntn_no,
        }),
      };
      await axios.post(`${utils.BASE_URL}users`, userData, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );

      let errorMessage = "Registration failed. Please try again.";
      let fieldErrors = {};

      if (error.response?.data?.error) {
        const strapiError = error.response.data.error;

        if (strapiError.details?.errors) {
          strapiError.details.errors.forEach((err) => {
            const fieldName = err.path[err.path.length - 1];
            fieldErrors[fieldName] = err.message;
          });
        }

        if (strapiError.message?.includes("already taken")) {
          if (strapiError.message.includes("Email")) {
            fieldErrors.email = "Email already registered";
          } else if (strapiError.message.includes("Username")) {
            fieldErrors.username = "Username already taken";
          }
        } else if (strapiError.message) {
          errorMessage = strapiError.message;
        }
      }

      setErrors({
        ...fieldErrors,
        submit: Object.keys(fieldErrors).length === 0 ? errorMessage : "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full p-4">
      <div className="bg-opacity-20 backdrop-blur-md rounded-lg w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex justify-center">
          <img src={logo} alt="Logo" className="w-36 h-36" />
        </Link>

        {/* Account Type Switch */}
        <div className="flex justify-center min-w-[335px] space-x-4 mb-6 bg-white w-fit mx-auto p-1 rounded-full">
          <button
            type="button"
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
            type="button"
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

        <h2 className="text-2xl font-bold text-center mb-2 text-white">
          Create New Account
        </h2>
        <p className="text-[#B4B4B4] text-sm text-center mb-6">
          Set up your username and password <br /> you can always change it
          later.
        </p>

        {/* Error Message */}
        {errors.submit && (
          <div className="text-red-500 text-center mb-4">{errors.submit}</div>
        )}

        {/* Success Message */}
        {success && (
          <div className="text-green-500 text-center mb-4">
            Registration successful! Redirecting to login...
          </div>
        )}

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-y-auto h-[40vh] max-w-[335px] mx-auto scrollbar-hide"
        >
          {/* Username */}
          <div className="flex items-center bg-[#344C63] rounded-md py-4 px-2">
            <img src={person} alt="" className="mr-2" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
              required
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}

          {/* Email */}
          <div className="flex items-center bg-[#344C63] rounded-md py-4 px-2">
            <img src={emailIcon1} alt="" className="mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
              required
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          {/* Password */}
          <div className="flex items-center bg-[#344C63] rounded-md py-4 px-2">
            <img src={passwordIcon} alt="" className="mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
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
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          {/* Confirm Password */}
          <div className="flex items-center bg-[#344C63] rounded-md py-4 px-2">
            <img src={passwordIcon} alt="" className="mr-2" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

          {/* First Name */}
          <div className="flex items-center bg-[#344C63] rounded-md py-4 px-2">
            <img src={person} alt="" className="mr-2" />
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
              required
            />
          </div>
          {errors.fname && (
            <p className="text-red-500 text-sm">{errors.fname}</p>
          )}

          {/* Last Name */}
          <div className="flex items-center bg-[#344C63] rounded-md py-4 px-2">
            <img src={person} alt="" className="mr-2" />
            <input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
              required
            />
          </div>
          {errors.lname && (
            <p className="text-red-500 text-sm">{errors.lname}</p>
          )}

          {/* Contact Number */}
          <div className="flex items-center bg-[#344C63] rounded-md py-4 px-2">
            <img src={call} alt="" className="mr-2" />
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
              required
            />
          </div>
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact}</p>
          )}

          {/* Business-Specific Fields */}
          {isBusiness && (
            <>
              <div className="flex items-center bg-[#344C63] rounded-md py-4 px-2">
                <img src={clipboard} alt="" className="mr-2" />
                <input
                  type="text"
                  name="registration_no"
                  value={formData.registration_no}
                  onChange={handleChange}
                  placeholder="Registration No"
                  className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
                  required
                />
              </div>
              {errors.registration_no && (
                <p className="text-red-500 text-sm">{errors.registration_no}</p>
              )}

              <div className="flex items-center bg-[#344C63] rounded-md py-4 px-2">
                <img src={ntn} alt="" className="mr-2" />
                <input
                  type="text"
                  name="ntn_no"
                  value={formData.ntn_no}
                  onChange={handleChange}
                  placeholder="NTN Number"
                  className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
                  required
                />
              </div>
              {errors.ntn_no && (
                <p className="text-red-500 text-sm">{errors.ntn_no}</p>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FED700] text-white py-3 px-4 rounded-md hover:bg-opacity-30 transition-colors"
          >
            {isLoading
              ? "Processing..."
              : isBusiness
              ? "Create Business Account"
              : "Create Private Account"}
          </button>
        </form>

        <p className="text-center text-white text-sm mt-2">
          Already have an account?
          <Link to="/login" className="text-[#FED700] hover:underline ml-1">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
