import React from "react";
import {
  FaTruck,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaArrowRight,
} from "react-icons/fa";
import car_image from "../../assets/images/CarCard.png";
import { FaShieldAlt, FaTachometerAlt, FaCar, FaPalette } from "react-icons/fa";
import mainImage from "../../assets/images/main-image.png";
import { useLocation } from "react-router-dom";
import utils from "../../utils/utils";

const OrderDetails = () => {
  const location = useLocation();
  const { carData, purchaseData, totalAmount } = location.state || {};

  console.log("Car Data:", carData);
  console.log("Purchase Data:", purchaseData);
  console.log("Total Amount:", totalAmount);

  return (
    <div className="bg-[#151F28] px-20 pt-10 min-h-screen flex flex-col gap-6">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-[#FED700] pl-2">Order Details</h1>

      {/* Order ID */}
      <div className="p-5 rounded-xl shadow-md bg-gray-700">
        <div className="flex items-center justify-between mb-4 px-2">
          <p className="text-gray-300 font-medium">
            Order ID:{" "}
            <span className="text-[#FED700] font-semibold block">
              #{purchaseData?.id}
            </span>
          </p>
          <div className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border border-green-500 bg-green-100 text-green-700">
            {purchaseData?.order_status || "empty"}
          </div>
        </div>

        {/* Info Row */}
        <div className="grid grid-cols-12 gap-6 mb-5 items-stretch">
          {/* Delivery Status */}
          <div className="col-span-6 bg-[#1c2331] rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <FaTruck className="text-gray-200 w-6 h-6" />
            <p className="font-medium text-lg text-[#FED700]">
              Be patient, package on deliver!
            </p>
            <div className="flex items-center justify-between text-sm text-gray-800 mt-1">
              <p className="border p-2 rounded-2xl bg-gray-300 flex items-center gap-2">
                <FaTruck className="text-gray-600 w-4 h-4" />
                Malang, Indonesia
              </p>
              {/* <FaArrowRight className="text-gray-500 w-4 h-4" />
               */}
              <div className="flex items-center mx-2 text-[#FED700]">
                ------------
                <FaArrowRight className=" w-4 h-4" />
              </div>
              <p className="border p-2 rounded-2xl bg-gray-300 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-600 w-4 h-4" />
                Emir’s House, Indonesia
              </p>
            </div>
            <div className="w-full h-3 bg-gray-400 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-yellow-400 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
          </div>

          {/* Estimated Arrival */}
          <div className="col-span-3 bg-[#1c2331] rounded-2xl shadow-sm p-6 flex flex-col justify-between">
            <FaTruck className="text-gray-200 w-6 h-6" />
            <div>
              <p className="text-sm text-gray-300">Estimated Arrival</p>
              <p className="text-lg font-semibold text-[#FED700]">
                9 July 2024
              </p>
            </div>
          </div>

          {/* Delivery Duration */}
          <div className="col-span-3 bg-[#1c2331] rounded-2xl shadow-sm p-6 flex flex-col justify-between">
            <FaInfoCircle className="text-gray-200 w-6 h-6" />
            <div>
              <p className="text-sm text-gray-300">Delivered in</p>
              <p className="text-lg font-semibold text-[#FED700]">5 Days</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Timeline */}
          <div className="p-6 bg-[#1c2331] rounded-2xl shadow-sm">
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-[#FED700]">Timeline</h2>

              <div className="text-sm space-y-4 text-gray-200">
                {/* Timeline Item 1 */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-10">
                  <div className="w-full sm:w-40 flex-shrink-0 font-medium text-[#FED700]">
                    4 Jul (Now) 06:00
                  </div>
                  <div className="flex-1">
                    <p>Your package is packed by the courier</p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-10">
                  <div className="w-full sm:w-40 flex-shrink-0">
                    2 Jul 06:00
                  </div>
                  <div className="flex-1">
                    <p>Shipment has been created</p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-10">
                  <div className="w-full sm:w-40 flex-shrink-0">
                    1 Jul 06:00
                  </div>
                  <div className="flex-1">
                    <p>Order placed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Info */}
          <div className="flex gap-6 p-6 bg-[#1c2331] rounded-2xl shadow-sm">
            {/* Car Image (Left) */}
            <div className="flex-shrink-0 w-1/3 bg-gray-300 overflow-hidden rounded-xl">
              <img
                src={
                  carData?.picture?.picture?.[0]
                    ? utils.BASE_URL_MEDIA + carData.picture?.picture[0]
                    : "Not Found"
                }
                alt="Car"
                className="h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Car Details (Right) */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div className="space-y-3">
                {/* Title & Price */}
                <div className="flex justify-between gap-5 items-start">
                  <h3 className="text-lg font-semibold text-[#FED700]">
                    {carData?.name || " "}
                  </h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    ${carData?.price || " "}
                  </span>
                </div>

                {/* Key Specs (Grid) */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-200">
                    <FaShieldAlt className="text-blue-500" />
                    <span>{carData?.condition || " "}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <FaCar className="text-blue-500" />
                    <span>{carData?.body_type || " "}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <FaTachometerAlt className="text-purple-500" />
                    <span>{carData?.kilometer || " "} mi</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <FaPalette className="text-purple-500" />
                    <span className="flex items-center gap-1">
                      {carData?.information?.features?.color ||
                        carData?.information?.exterior_color ||
                        " "}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button (Bottom-aligned) */}
              <button className="mt-4 w-full py-2 bg-[#FED700] hover:bg-yellow-500 rounded-lg font-medium transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
