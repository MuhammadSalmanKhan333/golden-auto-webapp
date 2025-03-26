import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="z-20 pt-5 pb-3 bg-[#151F28] shadow-lg shadow-gray-500 fixed w-screen top-0">
      <nav className="header flex justify-between items-center max-w-[1200px] h-[44px] lg:mx-auto px-3 sm:pl-4 sm:pr-6 xl:px-0">
        <img
          className="size-24 text-white hover:cursor-pointer"
          src={logo}
          alt="Image not loaded"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 lg:gap-16 list-none font-normal text-lg text-white hover:cursor-pointer items-center m-0 p-0">
          <li>Home</li>
          <li>Rent Car</li>
          <li>Buy Car</li>
          <li>News</li>
        </ul>
        <div className="hidden md:flex gap-3 items-center">
          <Link
            to="/login"
            className="bg-[#FED700] text-black px-6 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-yellow-500"
          >
            Sign In
          </Link>
          <Link
            to="/settings"
            className="text-[#FED700] text-2xl cursor-pointer"
          >
            <CiSettings />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-3xl cursor-pointer">
          {isOpen ? (
            <HiX onClick={() => setIsOpen(false)} />
          ) : (
            <HiMenuAlt3 onClick={() => setIsOpen(true)} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-20 right-0 w-52 sm:w-1/3 h-full bg-[#151F28] shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <ul className="flex flex-col gap-6 items-center justify-center p-6 text-white text-lg ">
          <li
            className="cursor-pointer tracking-widest"
            onClick={() => setIsOpen(false)}
          >
            Home
          </li>
          <li
            className="cursor-pointer tracking-wider"
            onClick={() => setIsOpen(false)}
          >
            Rent Car
          </li>
          <li
            className="cursor-pointer tracking-widest"
            onClick={() => setIsOpen(false)}
          >
            Buy Car
          </li>
          <li
            className="cursor-pointer tracking-widest"
            onClick={() => setIsOpen(false)}
          >
            News
          </li>
        </ul>
        <div className="flex flex-col items-center gap-4 p-6">
          <Link
            to="/login"
            className="bg-[#FED700] text-black w-fit px-7 py-2 rounded-lg text-center text-sm font-medium cursor-pointer hover:bg-yellow-500"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
          <Link
            to="/settings"
            className="bg-[#FED700] text-black w-fit px-6 py-2 rounded-lg text-center text-sm font-medium cursor-pointer hover:bg-yellow-500"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
