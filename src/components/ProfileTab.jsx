import React, { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import ProfileImage from "../assets/images/profileImage.jpg";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(ProfileImage);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      {/* Profile Picture */}
      <div className="flex flex-col items-center relative mb-8">
        <div className="relative w-32 h-32">
          <img
            src={
              profileImage ||
              "https://via.placeholder.com/150x150.png?text=Profile"
            }
            alt="Profile"
            className="w-full h-full rounded-full object-cover shadow-md border-4 border-yellow-400"
          />
          <button
            onClick={triggerFileInput}
            className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow hover:bg-gray-100 transition"
            title="Upload Profile Image"
          >
            <FaCamera className="text-gray-700 text-lg" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <h2 className="text-xl font-bold text-[#FED700] mt-4">
          Profile Picture
        </h2>
      </div>

      {/* Form Fields */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            placeholder="Enter contact number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Registration Number
          </label>
          <input
            type="text"
            placeholder="Enter registration number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            NTN Number
          </label>
          <input
            type="text"
            placeholder="Enter NTN number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </form>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <button className="bg-[#FFD700] text-black font-semibold px-6 py-2 rounded-md hover:bg-yellow-400 transition cursor-pointer shadow-md">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
