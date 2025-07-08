import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/icons/User.png";

const UserDropdown = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log(user);

  return (
    <div className="relative py-1" ref={dropdownRef}>
      <button
        className="text-white transition cursor-pointer"
        onClick={toggleDropdown}
      >
        <img
          src={UserIcon}
          alt="User"
          className="w-7 h-7 md:w-9 md:h-9 inline-block align-middle"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 md:w-60 bg-white rounded-xl shadow-lg z-50 border border-gray-500">
          {user ? (
            <>
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-300">
                <p className="font-semibold text-gray-800 capitalize">
                  {user.fname} {user.lname}
                </p>
                <p
                  className="text-sm text-gray-600 truncate font-medium"
                  title={user.email}
                >
                  {user.email}
                </p>
              </div>

              <div className="py-1 text-sm text-gray-600 font-medium">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={toggleDropdown}
                >
                  Profile
                </Link>
                <Link
                  to="/my-listings"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={toggleDropdown}
                >
                  My Listing
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={toggleDropdown}
                >
                  Settings
                </Link>
                <Link
                  to="/billing"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={toggleDropdown}
                >
                  Billing and Payments
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-b-xl hover:bg-gray-100 border-t border-gray-300 text-red-600"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Guest Options */}
              <div className="py-1 text-sm text-gray-700">
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
