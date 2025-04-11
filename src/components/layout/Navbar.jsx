import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import logo1 from "../../assets/images/golden-auto.png";
import { Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { MdNotifications } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile;
};

const Navbar = () => {
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const isMobile = useMediaQuery();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountDropdown(false);
        setNotifDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="z-20 md:py-5 bg-gray-700">
      <nav className="header flex flex-col md:flex-row justify-between items-center max-w-[1200px] md:h-[44px] lg:mx-auto sm:pl-4 sm:pr-6 xl:px-0">
        <Link to="/">
          <img
            className={`${
              isMobile ? "w-24 my-3" : "size-28"
            } text-white hover:cursor-pointer`}
            src={isMobile ? logo1 : logo}
            alt="Image not loaded"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="flex gap-8 lg:gap-16 list-none font-normal text-base text-white hover:cursor-pointer items-center m-0 p-0">
          <li className="hover:text-[#FED700]">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-[#FED700]">
            <Link to="/listing">Listing</Link>
          </li>
          <li className="hover:text-[#FED700]">
            <Link to="/contact">{isMobile ? "Contact" : "Contact Us"}</Link>
          </li>
          <li>
            <div className="md:hidden flex gap-3 md:gap-4 items-center">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => {
                    setNotifDropdown(!notifDropdown);
                    setAccountDropdown(false);
                  }}
                  className="text-white text-2xl hover:text-yellow-400 transition"
                >
                  <MdNotifications />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </button>
                {notifDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">
                        Notifications
                      </p>
                    </div>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      New message received
                    </Link>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your ad was approved
                    </Link>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      New cars matching your search
                    </Link>
                  </div>
                )}
              </div>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => {
                    setAccountDropdown(!accountDropdown);
                    setNotifDropdown(false);
                  }}
                  className="text-white hover:text-[#FED700] transition"
                >
                  <FaUserAlt size={20} />
                </button>
                {accountDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Register
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <Link
                      to="/my-ads"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                    >
                      My Ads
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </li>
        </ul>
        <div className="hidden md:flex gap-3 md:gap-4 items-center">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setNotifDropdown(!notifDropdown);
                setAccountDropdown(false);
              }}
              className="text-white text-2xl hover:text-[#FED700] transition"
            >
              <MdNotifications />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            {notifDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">
                    Notifications
                  </p>
                </div>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  New message received
                </Link>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your ad was approved
                </Link>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  New cars matching your search
                </Link>
              </div>
            )}
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setAccountDropdown(!accountDropdown);
                setNotifDropdown(false);
              }}
              className="text-white hover:text-[#FED700] transition"
            >
              <FaUserLarge size={20} />
            </button>
            {accountDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Register
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <Link
                  to="/messages"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                >
                  Messages
                </Link>
                <Link
                  to="/my-ads"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                >
                  My Ads
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  to="/account-sellings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                >
                  Account Sellings
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
