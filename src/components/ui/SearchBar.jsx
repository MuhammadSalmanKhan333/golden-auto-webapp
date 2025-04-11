// import { useState } from "react";
// import React from "react";
// const CarSearch = () => {
//   const [activeTab, setActiveTab] = useState("rent");

//   return (
//     <div className="bg-[#151F28] rounded-xl shadow-md lg:mt-10 max-w-[1200px] mt-16 mx-6 sm:mx-10 xl:mt-5 xl:mx-auto">
//       {/* Search Fields */}
//       <div className="flex flex-wrap bg-[#1E1E1E] border border-gray-600 rounded-b-xl text-white gap-5">
//         <div className="flex flex-1 flex-wrap p-2 lg:p-3 xl:gap-4">
//           <input
//             type="text"
//             placeholder="Number of seat"
//             className="flex-1 bg-[#344C63] border border-gray-600 m-2 rounded-lg focus:outline focus:outline-gray-400 placeholder-gray-400 px-4 py-1 sm:py-2"
//           />
//           <input
//             type="text"
//             placeholder="Price"
//             className="flex-1 bg-[#344C63] border border-gray-600 m-2 rounded-lg focus:outline focus:outline-gray-400 placeholder-gray-400 px-4 py-1 sm:py-2"
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             className="flex-1 bg-[#344C63] border border-gray-600 m-2 rounded-lg focus:outline focus:outline-gray-400 placeholder-gray-400 px-4 py-1 sm:py-2"
//           />
//         </div>
//         <div className="flex border-gray-500 border-l-1 justify-center items-center px-2">
//           <button className="bg-[#FFD700] m-2 rounded-lg !text-black font-medium hover:bg-yellow-500 hover:cursor-pointer px-6 py-2">
//             Search
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarSearch;

import React from "react";
import { Link } from "react-router-dom";

const CarSearch = () => {
  return (
    <div className="bg-[#151F28] rounded-xl shadow-md lg:mt-10 max-w-[1200px] mt-16 mx-6 sm:mx-10 xl:mt-5 xl:mx-auto">
      {/* Search Fields */}
      <div className="flex flex-col lg:flex-row bg-[#1E1E1E] border border-gray-600 rounded-xl text-white gap-8 lg:gap-5 p-4 items-start lg:items-end">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 w-full">
          <div>
            <label className="text-[#FED700] font-bold text-lg">Name</label>
            <input
              type="text"
              placeholder="Enter Car Name"
              className="w-full bg-[#344C63] border border-gray-600 mt-1 rounded focus:outline focus:outline-gray-400 placeholder-gray-400 px-4 py-4"
            />
          </div>
          <div>
            <label className="text-[#FED700] font-bold text-lg">Price</label>
            <input
              type="text"
              placeholder="Price"
              className="w-full bg-[#344C63] border border-gray-600 mt-1 rounded focus:outline focus:outline-gray-400 placeholder-gray-400 px-4 py-4"
            />
          </div>
          <div>
            <label className="text-[#FED700] font-bold text-lg">Location</label>
            <input
              type="text"
              placeholder="Location"
              className="w-full bg-[#344C63] border border-gray-600 mt-1 rounded focus:outline focus:outline-gray-400 placeholder-gray-400 px-4 py-4"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-items-start lg:justify-center items-end max-lg:w-full lg:border-l-1 lg:border-gray-300 lg:px-4">
          <Link
            to="/listing"
            className="bg-[#FFD700] text-xl  rounded-lg cursor-pointer text-black font-semibold hover:bg-yellow-500 px-10 lg:px-6 py-4 "
          >
            Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarSearch;

{
  /* <div className="flex outline-b-1 outline-gray-500">
        <button
          className={`px-6 py-1 text-lg font-normal rounded-t-xl hover:cursor-pointer ${
            activeTab === "rent"
              ? "bg-[#FFD700] text-black"
              : "bg-[#2C2C2C] !text-gray-300"
          } border border-gray-600`}
          onClick={() => setActiveTab("rent")}
        >
          Rent car
        </button>
        <button
          className={`px-6 py-1 text-lg font-normal rounded-t-xl hover:cursor-pointer ${
            activeTab === "buy"
              ? "bg-[#FFD700] text-black"
              : "bg-[#2C2C2C] !text-gray-300"
          } border border-gray-600`}
          onClick={() => setActiveTab("buy")}
        >
          Buy car
        </button>
      </div> */
}
