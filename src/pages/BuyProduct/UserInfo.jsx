import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const UserInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
  });

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: `${user.fname || ""} ${user.lname || ""}`.trim(),
        email: user.email || "",
        phone: user.contact || "",
        address: user.location || "",
        state: "",
        city: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-[950px] max-w-full mx-auto bg-gray-700 rounded-xl shadow-md border border-gray-600">
      {/* Header */}
      <div className="bg-[#FED700] p-5 rounded-t-xl">
        <h2 className="text-2xl font-bold text-gray-900">Enter Your Details</h2>
      </div>

      {/* Form */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Row 1 */}
        <div>
          <label className="block text-sm font-semibold text-[#FED700] mb-2 pl-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 bg-[#1F2937] text-white border border-gray-600 rounded-lg focus:ring-1 focus:ring-[#FED700] focus:outline-none"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#FED700] mb-2 pl-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-[#1F2937] text-white border border-gray-600 rounded-lg focus:ring-1 focus:ring-[#FED700] focus:outline-none"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#FED700] mb-2 pl-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full p-3 bg-[#1F2937] text-white border border-gray-600 rounded-lg focus:ring-1 focus:ring-[#FED700] focus:outline-none"
            placeholder="Enter phone Number"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
        </div>

        {/* Row 2 */}
        <div>
          <label className="block text-sm font-semibold text-[#FED700] mb-2 pl-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 bg-[#1F2937] text-white border border-gray-600 rounded-lg focus:ring-1 focus:ring-[#FED700] focus:outline-none"
            placeholder="123 Main St, Apt 4B"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#FED700] mb-2 pl-1">
            State
          </label>
          <div className="relative">
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-3 bg-[#1F2937] text-white border border-gray-600 rounded-lg focus:ring-1 focus:ring-[#FED700] focus:outline-none appearance-none"
            >
              <option value="" disabled hidden>
                Select State
              </option>
              <option>California</option>
              <option>New York</option>
              <option>Texas</option>
              <option>Florida</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#FED700] mb-2 pl-1">
            City
          </label>
          <div className="relative">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 bg-[#1F2937] text-white border border-gray-600 rounded-lg focus:ring-1 focus:ring-[#FED700] focus:outline-none appearance-none"
            >
              <option value="" disabled hidden>
                Select City
              </option>
              <option>Los Angeles</option>
              <option>New York</option>
              <option>Houston</option>
              <option>Miami</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
