import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#151F28] border-gray-500 border-t text-gray-800 w-full md:px-10 mx-auto pb-8 pt-14 px-8">
      <div className="flex flex-col gap-12 max-md:items-center max-w-[1200px] min-[794px]:flex-row md:justify-between mx-auto">
        {/* Topcar Section */}
        <div className="w-full md:max-w-[340px] sm:max-w-[500px]">
          <h2 className="text-[#FED700] text-xl font-bold italic">TOPCAR</h2>
          <p className="text-gray-200 text-sm leading-7 mt-8">
            Website to buy, sell and rent new and used cars with famous brands
            such as Bentley, Mercedes, Audi, Porsche, Honda...
          </p>
          {/* Social Media Icons */}
          <div className="flex text-[#2596be] text-xl mt-5 space-x-4 cursor-pointer">
            <FaInstagram className="hover:scale-x-110 transition-all duration-300" />
            <FaFacebook className="hover:scale-110 transition-all duration-300" />
            <FaTwitter className="hover:scale-110 transition-all duration-300" />
            <FaYoutube className="hover:scale-110 transition-all duration-300" />
            <FaTiktok className="hover:scale-110 transition-all duration-300" />
          </div>
        </div>

        {/* Carvago Section */}

        <div className="flex flex-wrap justify-between w-full gap-10 items-center md:w-[550px] sm:w-[500px]">
          <div>
            <h3 className="text-[#FED700] font-bold">Carvago</h3>
            <ul className="text-gray-200 text-sm mt-8 space-y-4">
              <li className="cursor-pointer hover:translate-x-2 transition-all duration-300">
                Buy
              </li>
              <li className="cursor-pointer hover:translate-x-2 transition-all duration-300">
                Reviews
              </li>
              <li className="cursor-pointer hover:translate-x-2 transition-all duration-300">
                Site map
              </li>
              <li className="cursor-pointer hover:translate-x-2 transition-all duration-300">
                How it works
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-[#FED700] font-bold">Services</h3>
            <ul className="text-gray-200 text-sm mt-8 space-y-4">
              <li className="cursor-pointer hover:translate-x-2 transition-all duration-300">
                Delivery
              </li>
              <li className="cursor-pointer hover:translate-x-2 transition-all duration-300">
                CarAudit
              </li>
              <li className="cursor-pointer hover:translate-x-2 transition-all duration-300">
                Warranty
              </li>
              <li className="cursor-pointer hover:translate-x-2 transition-all duration-300">
                Financing
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="">
            <h3 className="text-[#FED700] font-bold">Company</h3>
            <ul className="text-gray-200 text-sm mb-8 mt-8 space-y-4">
              <li className="cursor-pointer hover:translate-x-2 transition-all duration-300">
                About us
              </li>
              <li className="cursor-pointer hover:translate-x-2 transition-all duration-300">
                Contact us
              </li>
              <li className="cursor-pointer hover:translate-x-2 transition-all duration-300">
                Terms of use
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t-[1px] text-gray-500 text-xs max-w-[1200px] mt-8 mx-auto pt-4">
        Topcar, {currentYear} all rights reserved
      </div>
    </footer>
  );
};

export default Footer;
