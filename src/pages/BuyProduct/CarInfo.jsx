import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGasPump,
  FaTachometerAlt,
  FaChevronUp,
  FaChevronDown,
  FaCarSide,
  FaCheckCircle,
} from "react-icons/fa";
import mainImage from "../../assets/images/productImages/PImage.png";
import utils from "../../utils/utils";
import car_image from "../../assets/images/CarCard.png";

const CarInfo = ({ carData, loading, error }) => {
  const [showDetails, setShowDetails] = useState(true);
  const toggleDetails = () => setShowDetails(!showDetails);

  const carDetails = {
    image: carData?.picture?.picture?.[0]
      ? utils.BASE_URL_MEDIA + carData.picture?.picture[0]
      : mainImage,
    images: carData?.picture?.picture
      ? carData.picture.picture.map((img) => utils.BASE_URL_MEDIA + img)
      : [mainImage],
    location: carData?.location?.Address,
    name: carData?.name?.split("|")[0]?.trim(),
    year: carData?.year,
    price: carData?.price,
    feul: carData?.feul_type,
    kilometer: carData?.kilometer,
    transmission: carData?.transmission,
    bodyType: carData?.body_type,
    condition: carData?.condition,
    brand: {
      name: carData?.brand?.brand?.name || "Unknown",
      icon: carData?.brand?.brand?.icon
        ? utils.BASE_URL_MEDIA + carData.brand.brand.icon
        : null,
    },
    model: {
      name: carData?.brand?.model?.name || "Unknown",
    },
    color: {
      interior: carData?.information?.interior_color || "N/A",
      exterior:
        carData?.information?.exterior_color ||
        carData?.information?.features?.color ||
        "N/A",
    },
    subCategory: carData?.category?.sub_category?.name || "Unknown",
    seat: carData?.information?.seat || carData?.information?.features?.seat,
    door: carData?.information?.features?.door,
  };

  if (loading) {
    return (
      <div className="min-w-[500px] mx-auto bg-gray-700 rounded-lg shadow-md overflow-hidden border">
        <div className="bg-[#FED700] p-4 rounded-t-lg">
          <h2 className="text-xl font-bold pl-1">Car Detail</h2>
        </div>
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            {/* Title Skeleton */}
            <div className="h-6 bg-gray-600 rounded w-3/4"></div>
            <div className="h-4 bg-gray-600 rounded w-1/2"></div>

            {/* Image Skeleton */}
            <div className="w-full h-52 bg-gray-600 rounded-lg my-3"></div>

            {/* Details Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-600 rounded w-2/3"></div>
              <div className="h-4 bg-gray-600 rounded w-1/2"></div>
              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
            </div>

            {/* Toggle Button Skeleton */}
            <div className="h-4 bg-gray-600 rounded w-1/4 ml-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-w-[500px] mx-auto bg-gray-700 rounded-lg shadow-md overflow-hidden border">
        <div className="bg-[#FED700] p-4 rounded-t-lg">
          <h2 className="text-xl font-bold pl-1">Car Detail</h2>
        </div>
        <div className="p-4 text-center py-8">
          <div className="text-red-400 font-medium">
            Failed to load car details
          </div>
          <div className="text-gray-400 text-sm mt-2">{error}</div>
        </div>
      </div>
    );
  }

  if (!carData) {
    return (
      <div className="min-w-[500px] mx-auto bg-gray-700 rounded-lg shadow-md overflow-hidden border">
        <div className="bg-[#FED700] p-4 rounded-t-lg">
          <h2 className="text-xl font-bold pl-1">Car Detail</h2>
        </div>
        <div className="p-4 text-center py-8 text-gray-400">
          No car data available
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-[500px] mx-auto bg-gray-700 rounded-lg shadow-md overflow-hidden border">
      <div className="bg-[#FED700] p-4 rounded-t-lg">
        <h2 className="text-xl font-bold pl-1">Car Detail</h2>
      </div>

      <div className="p-4">
        <h3 className="text-lg text-[#FED700] font-semibold">
          {carDetails.name}
        </h3>
        <p className="text-sm text-gray-200 mb-3">{carDetails.brand.name}</p>

        <img
          src={carDetails.image}
          alt={carDetails.name}
          className="w-full h-52 object-cover rounded-lg my-3"
          onError={(e) => {
            e.target.src = car_image; // Fallback image if main image fails to load
          }}
        />

        <ul className="mt-2 space-y-1 text-sm text-gray-200">
          <li className="mr-[130px]">✓ {carDetails.transmission}</li>
          <li className="mr-[173px]">✓ {carDetails.subCategory}</li>
          <li className="mr-[173px]">✓ {carDetails.year}</li>
        </ul>

        {/* Toggle Button */}
        <div
          onClick={toggleDetails}
          className="mt-5 text-end text-sm text-[#FED700] font-medium cursor-pointer select-none"
        >
          {showDetails ? "Hide Details" : "Show Details"}{" "}
          {showDetails ? (
            <FaChevronUp className="inline-block ml-1" />
          ) : (
            <FaChevronDown className="inline-block ml-1" />
          )}
        </div>

        {/* Toggle-able Info Section */}
        {showDetails && (
          <div className="mt-4 space-y-4 text-sm text-gray-100">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-[#FED700] text-[20px] mt-1" />
              <div>
                <span>{new Date(carData?.updatedAt).toDateString()}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#FED700] text-[20px] mt-1" />
              <div className="flex flex-col">
                <span className="font-semibold text-[#FED700]">
                  Pick-Up Location:
                </span>
                <span className="mr-[20px]">
                  {carDetails.location || "Not specified"}
                </span>
              </div>
            </div>
            <div className="flex gap-18">
              <div className="flex items-start gap-3">
                <FaGasPump className="text-[#FED700] text-[20px] mt-1" />
                <div className="flex flex-col">
                  <span className="font-semibold text-[#FED700]">
                    Fuel Policy
                  </span>
                  <span>{carDetails.feul || "N/A"}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCarSide className="text-[#FED700] text-[20px] mt-1" />
                <div className="flex flex-col">
                  <span className="font-semibold text-[#FED700]">
                    Body Type
                  </span>
                  <span>{carDetails.bodyType || "N/A"}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-18">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-[#FED700] text-[20px] mt-1" />
                <div className="flex flex-col">
                  <span className="font-semibold text-[#FED700]">
                    Condition
                  </span>
                  <span>{carDetails.condition || "N/A"}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaTachometerAlt className="text-[#FED700] text-[20px] mt-1" />
                <div className="flex flex-col">
                  <span className="font-semibold text-[#FED700]">Mileage</span>
                  <span>{carDetails.kilometer || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarInfo;
