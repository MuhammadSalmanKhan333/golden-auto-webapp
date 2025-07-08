import React, { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { FaChevronDown } from "react-icons/fa";
import { stateCityMap } from "../data/AddressStep"; // Importing the stateCityMap from the data file

const AddressStep = ({
  addressData,
  setAddressData,
  addressErrors,
  setAddressErrors,
}) => {
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const location = place.formatted_address;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setAddressData((prev) => ({
        ...prev,
        location,
        lat,
        lng,
      }));

      // Optionally clear error
      setAddressErrors((prev) => ({
        ...prev,
        location: "",
      }));
    }
  };

  const handleChange = (field, value) => {
    setAddressData((prevData) => ({
      ...prevData,
      [field]: value,
      ...(field === "state" && { city: "" }),
    }));

    setAddressErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  console.log(
    addressData.location + " " + addressData.lat + " " + addressData.lng
  );
  return (
    <div className="bg-[#1e212b] rounded-lg p-6 text-white shadow-md w-full mx-auto">
      <h2 className="text-xl font-semibold text-[#FED700] mb-5">
        Vehicle Address
      </h2>

      {/* Location Autocomplete */}
      <div className="mb-4">
        <label className="block mb-2 text-md text-[#FED700] font-semibold">
          Location
        </label>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            value={addressData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Search for your location..."
            className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#FED700]"
          />
        </Autocomplete>
        {addressErrors.location && (
          <p className="text-red-400 mt-2 pl-2 text-sm">
            {addressErrors.location}
          </p>
        )}
      </div>

      {/* OR Separator */}
      <div className="flex items-center justify-center my-6">
        <div className="border-t border-gray-500 w-full"></div>
        <span className="px-4 text-sm text-gray-300">OR</span>
        <div className="border-t border-gray-500 w-full"></div>
      </div>

      {/* State, Street Address, City */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* State */}
        <div className="">
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            State
          </label>
          <div className="relative">
            <select
              value={addressData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white focus:outline-none focus:ring focus:ring-[#FED700] appearance-none cursor-pointer"
            >
              <option value="">Select a state</option>
              {Object.keys(stateCityMap).map((state) => (
                <option key={state} value={state}>
                  {state.replace(/([A-Z])/g, " $1").trim()}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-200 text-md pointer-events-none">
              <FaChevronDown />
            </div>
          </div>
          {addressErrors.state && (
            <p className="text-red-400 mt-2 pl-2 text-sm">
              {addressErrors.state}
            </p>
          )}
        </div>

        {/* Street Address */}
        <div>
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            Street Address
          </label>
          <input
            type="text"
            value={addressData.streetAddress}
            onChange={(e) => handleChange("streetAddress", e.target.value)}
            placeholder="123 Main Street"
            className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#FED700]"
          />
          {addressErrors.streetAddress && (
            <p className="text-red-400 mt-2 pl-2 text-sm">
              {addressErrors.streetAddress}
            </p>
          )}
        </div>

        {/* City */}
        <div className="relative">
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            City
          </label>
          <div className="relative">
            <select
              value={addressData.city}
              disabled={!addressData.state}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white focus:outline-none focus:ring focus:ring-[#FED700] appearance-none cursor-pointer"
            >
              <option value="">Select a city</option>
              {stateCityMap[addressData.state]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-200 text-md pointer-events-none">
              <FaChevronDown />
            </div>
          </div>
          {addressErrors.city && (
            <p className="text-red-400 mt-2 pl-2 text-sm">
              {addressErrors.city}
            </p>
          )}
        </div>
      </div>
      {addressData.city && addressData.streetAddress && (
        <div className="text-green-500 mt-6 text-sm">
          <p>
            Selected: {addressData.location},&ensp; {addressData.state},&ensp;{" "}
            {addressData.city},&ensp; {addressData.streetAddress}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressStep;
