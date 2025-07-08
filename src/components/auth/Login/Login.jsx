import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../../../assets/images/logo.svg";
import emailIcon from "../../../assets/icons/emailIcon.svg";
import passwordIcon from "../../../assets/icons/passwordIcon.svg";
import utils from "../../../utils/utils";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../../features/authSlice";

const Login = () => {
  const [isBusiness, setIsBusiness] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await axios.post(`${utils.BASE_URL}auth/local`, {
        identifier: email,
        password: password,
      });

      const { jwt, user } = response.data;

      if (
        (!isBusiness && user.account_type === "private") ||
        (isBusiness && user.account_type === "business")
      ) {
        dispatch(loginSuccess({ jwt, user }));
        toast.success("Login successful!");
        navigate(isBusiness ? "/dashboard" : "/");
      } else {
        toast.error(
          `This account is registered as "${user.account_type}". Please select the correct account type.`
        );
        dispatch(
          loginFailure({
            message: `Account type mismatch.`,
          })
        );
      }
    } catch (err) {
      dispatch(
        loginFailure(err.response?.data?.error || { message: "Login failed" })
      );
      toast.error(
        err.response?.data?.error?.message ||
          "Invalid credentials or network issue"
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center w-full p-4"
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="bg-opacity-20 backdrop-blur-md rounded-lg w-full max-w-md">
        <Link to="/" className="flex justify-center">
          <img src={logo} alt="Logo" className="w-36 h-36" />
        </Link>

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

        <h2 className="text-2xl font-bold text-center mb-2 text-[#FED700]">
          Welcome Back
        </h2>

        <form
          className="space-y-4 max-w-[335px] mx-auto mb-3"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center bg-[#344C63] rounded-md py-4 px-2">
            <img src={emailIcon} alt="" className="mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center bg-[#344C63] rounded-md py-4 px-2">
            <img src={passwordIcon} alt="" className="mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent text-[#E2E3E4] placeholder-[#E2E3E4] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {error && (
            <p className="text-red-500 text-sm">
              {error.message || "Login failed"}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FED700] text-white py-3 px-4 rounded-md hover:bg-opacity-30 transition-colors"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

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
