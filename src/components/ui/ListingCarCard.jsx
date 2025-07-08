import { FaStar, FaGasPump, FaUsers, FaCogs, FaCarSide } from "react-icons/fa";
import React from "react";
import utils from "../../utils/utils";

const ListingCarCard = ({ car }) => {
  // Image handling
  const imagePath = car.picture?.picture?.[0]?.trim();
  const image = imagePath
    ? `${utils.BASE_URL_MEDIA}${imagePath}`
    : "/default-car-image.jpg";

  // Name handling
  const nameParts = car.name.split("|").map((part) => part.trim());
  const [mainName = "Car", ...subNameParts] = nameParts;

  // Data transformation
  const carData = {
    image,
    mainName,
    subName:
      subNameParts.join(" | ") ||
      `${car.body_type || ""} ${car.year || ""}`.trim(),
    year: car.year || "Year not specified",
    price: car.price ? `$${car.price.toLocaleString()}` : "Price not available",
    fuelType: car.feul_type || "Fuel type not specified",
    seats: car.information?.features?.seat || "4",
    transmission: car.transmission || "Transmission not specified",
    bodyType: car.body_type || "Body type not specified",
    kilometer: car.kilometer ? `${car.kilometer} km` : "Mileage not available",
    condition: car.condition || "Condition not specified",
    shortLocation:
      car.location?.Address?.split(",")[0] || "Location not available",
    isNew: car.condition === "New",
    hasWarranty: car.warrenty || false,
  };
  return (
    <div className="rounded-xl border-2 border-[#293041] p-2 cursor-pointer hover:shadow-xl transition-all duration-300 h-full">
      <div className="bg-[#1c2331] p-2 rounded-xl text-white shadow-lg mx-auto h-full flex flex-col">
        {/* Car Image - Fixed height container with hover zoom */}
        <div className="h-40 w-full mb-4 overflow-hidden rounded-lg">
          <img
            src={carData.image}
            alt={carData.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Car Details */}
        <div className="w-full">
          <div className="text-gray-200">
            <p className="mr-1 text-sm"> {carData.mainName}</p>
            {carData.year}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-normal text-gray-400 truncate mr-3">
              {carData.shortLocation}
            </p>
            <p className="text-yellow-400 text-lg font-medium">
              {carData.price}
            </p>
          </div>
        </div>

        <div className="border-b border-gray-600 my-3"></div>

        {/* Features Section */}
        <div className="flex flex-wrap items-center justify-between text-gray-300 text-xs gap-1 pt-2">
          <div className="flex items-center gap-1">
            <FaGasPump className="text-yellow-400" />
            <span>{carData.fuelType}</span>
          </div>
       
          <div className="flex items-center gap-1">
            <FaCogs className="text-yellow-400" />
            <span>{carData.transmission || ""}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCarSide className="text-yellow-400" />
            <span>{carData.bodyType}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCarCard;

// import {
//   FaGasPump,
//   FaUsers,
//   FaCogs,
//   FaCarSide,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import utils from "../../utils/utils";

// const ListingCarCard = ({ car }) => {
//   // Image handling
//   const imagePath = car.picture?.picture?.[0]?.trim();
//   const image = imagePath
//     ? `${utils.BASE_URL_MEDIA}${imagePath}`
//     : "/default-car-image.jpg";

//   // Name handling
//   const nameParts = car.name.split("|").map((part) => part.trim());
//   const [mainName = "Car", ...subNameParts] = nameParts;

//   // Data transformation
//   const carData = {
//     image,
//     mainName,
//     subName:
//       subNameParts.join(" | ") ||
//       `${car.body_type || ""} ${car.year || ""}`.trim(),
//     year: car.year || "Year not specified",
//     price: car.price ? `$${car.price.toLocaleString()}` : "Price not available",
//     fuelType: car.feul_type || "Fuel type not specified",
//     seats: car.information?.features?.seat || "4",
//     transmission: car.transmission || "Transmission not specified",
//     bodyType: car.body_type || "Body type not specified",
//     kilometer: car.kilometer ? `${car.kilometer} km` : "Mileage not available",
//     condition: car.condition || "Condition not specified",
//     shortLocation:
//       car.location?.Address?.split(",")[0] || "Location not available",
//     isNew: car.condition === "New",
//     hasWarranty: car.warrenty || false,
//   };

//   return (
//     <div className="relative rounded-xl border-2 border-[#293041] p-2 cursor-pointer hover:shadow-xl transition-all duration-300 h-full group">
//       {/* Condition Badge */}
//       {carData.condition && (
//         <span
//           className={`absolute top-3 right-3 z-10 text-xs px-2 py-1 rounded-full ${
//             carData.isNew ? "bg-green-600" : "bg-blue-600"
//           } text-white`}
//         >
//           {carData.condition}
//         </span>
//       )}

//       <div className="bg-[#1c2331] p-2 rounded-xl text-white shadow-lg mx-auto h-full flex flex-col">
//         {/* Image with loading state */}
//         <div className="h-40 w-full mb-4 overflow-hidden rounded-lg relative">
//           <img
//             src={carData.image}
//             alt={`${carData.mainName} ${carData.subName}`}
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//             loading="lazy"
//           />
//           {carData.hasWarranty && (
//             <div className="absolute bottom-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded flex items-center">
//               <FaShieldAlt className="mr-1" /> Warranty
//             </div>
//           )}
//         </div>

//         {/* Main Content */}
//         <div className="flex flex-col flex-grow">
//           {/* Title Section */}
//           <div className="mb-2">
//             <h3 className="font-medium text-gray-100 line-clamp-1">
//               {carData.mainName}
//             </h3>
//             <p className="text-xs text-gray-400 line-clamp-1">
//               {carData.subName}
//             </p>
//           </div>

//           {/* Price and Location */}
//           <div className="flex items-center justify-between mt-auto">
//             <div className="flex items-center text-xs text-gray-400">
//               <FaMapMarkerAlt className="mr-1 text-yellow-400" />
//               <span className="line-clamp-1">{carData.shortLocation}</span>
//             </div>
//             <p className="text-yellow-400 font-medium">{carData.price}</p>
//           </div>

//           {/* Divider */}
//           <div className="border-b border-gray-600 my-3"></div>

//           {/* Specifications */}
//           <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
//             <div className="flex items-center gap-1">
//               <FaGasPump className="text-yellow-400 flex-shrink-0" />
//               <span className="line-clamp-1">{carData.fuelType}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <FaUsers className="text-yellow-400 flex-shrink-0" />
//               <span>{carData.seats} Seats</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <FaCogs className="text-yellow-400 flex-shrink-0" />
//               <span className="line-clamp-1">{carData.transmission}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <FaCarSide className="text-yellow-400 flex-shrink-0" />
//               <span className="line-clamp-1">{carData.bodyType}</span>
//             </div>
//           </div>

//           {/* Additional Info */}
//           <div className="mt-2 text-xs text-gray-500">
//             <p>
//               {carData.kilometer} • {carData.year}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListingCarCard;
