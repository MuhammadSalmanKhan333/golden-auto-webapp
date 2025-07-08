import React, { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiCalendar, FiX } from "react-icons/fi";
import { AiOutlineZoomIn } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import frontImage from "../assets/images/listingImages/frontview.jpg";
import backImage from "../assets/images/listingImages/backview.jpg";
import leftImage from "../assets/images/listingImages/left.png";
import { toast } from "react-toastify";

const VehicleInfoStep = ({
  vehicleData,
  setVehicleData,
  manufacturer,
  model,
  errors,
  setErrors,
}) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const fileInputRef = useRef();
  const handlePreview = (file) => setSelectedMedia(file);
  const closePreview = () => setSelectedMedia(null);

  const handleChange = (field, value) => {
    setVehicleData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const createChangeHandler = (field) => (e) => {
    handleChange(field, e.target.value);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const existingFiles = vehicleData.media || [];

    // Check file limit
    if (existingFiles.length + files.length > 7) {
      toast.error("You can upload a maximum of 7 files.");
      return;
    }

    // Validate and prepare files
    const validFiles = files.filter((file) => {
      // Check file type
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (!isImage && !isVideo) {
        toast.error(`${file.name} is not an image or video file`);
        return false;
      }

      // Check file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });

    // Create file objects for state
    const uploadedFiles = validFiles.map((file) => ({
      name: file.name,
      type: file.type.startsWith("image") ? "image" : "video",
      size: file.size,
      file,
      url: URL.createObjectURL(file),
      id: Date.now() + Math.random().toString(36).substr(2, 9), // Unique ID
    }));

    console.log(uploadedFiles);
    setVehicleData((prev) => ({
      ...prev,
      media: [...existingFiles, ...uploadedFiles],
    }));

    if (existingFiles.length + validFiles.length >= 3 && errors.media) {
      setErrors((prev) => ({ ...prev, media: null }));
    }
  };

  const handleRemoveFile = (id) => {
    setVehicleData((prev) => {
      // Find the file to remove
      const fileToRemove = prev.media.find((f) => f.id === id);
      // Clean up memory
      if (fileToRemove?.url) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      // Return updated state without the removed file
      return {
        ...prev,
        media: prev.media.filter((file) => file.id !== id),
      };
    });
  };

  const defaultImages = [frontImage, backImage, leftImage];
  const mediaFiles = vehicleData.media || [];
  console.log(mediaFiles);

  return (
    <div className="bg-[#1e212b] rounded-lg p-6 text-white shadow-md w-full mx-auto">
      {/* Image/Video Preview Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/60  flex justify-center items-center p-4"
          onClick={closePreview}
        >
          <div
            className="relative max-w-4xl w-full max-h-[80vh] bg-[#2c2f38] p-4 rounded-lg overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === "video" ? (
              <video
                src={selectedMedia.url}
                controls
                className="w-full h-auto max-h-[70vh] object-contain rounded"
              />
            ) : (
              <img
                src={selectedMedia.url || selectedMedia}
                alt="Preview"
                className="w-full h-auto max-h-[70vh] object-contain rounded"
              />
            )}
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 p-2 bg-[#FED700] text-[#151F28] font-bold rounded-full hover:bg-yellow-400 transition"
            >
              <FiX className="w-5 h-5 hover:cursor-pointer" />
            </button>
          </div>
        </div>
      )}

      {/* Upload Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#FED700]">
          Upload Photos / Videos
        </h2>
        <span className="text-sm text-gray-300">
          {vehicleData.media?.length || 0}/7 files
        </span>
      </div>

      {/* Media Strip */}
      <div className="overflow-x-auto mb-5 scrollbar-hide">
        <div className="flex gap-4 min-w-fit">
          {(mediaFiles.length > 0 ? mediaFiles : defaultImages).map(
            (file, index) => {
              const url =
                typeof file === "string" || file?.url?.startsWith("/")
                  ? file
                  : file.url;

              const type =
                typeof file === "object" && file.type === "video"
                  ? "video"
                  : "image";

              return (
                <div
                  key={index}
                  className="relative w-[32%] h-40 rounded-lg shadow-md overflow-hidden shrink-0 cursor-pointer"
                  onClick={() => handlePreview({ url, type })}
                >
                  {type === "image" ? (
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover hover:scale-110 hover:transition-transform duration-600"
                    />
                  ) : (
                    <video
                      src={url}
                      className="w-full h-full object-cover"
                      muted
                    />
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(file.id);
                    }}
                    className="absolute top-2 right-2 bg-[#FED700] text-black font-medium rounded-full w-6 h-6 flex items-center justify-center hover:bg-yellow-400 transition"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 right-3 bg-gray-600/60 rounded hover:bg-gray-600/70 transition">
                    <AiOutlineZoomIn className="text-4xl text-[aqua]" />
                  </div>
                </div>
              );
            }
          )}
        </div>
        {errors.media && (
          <p className="text-red-400 text-sm mt-2">{errors.media}</p>
        )}
      </div>

      {/* Upload Box */}
      <div
        className="border-2 border-dashed border-[#FED700] rounded-lg p-6 cursor-pointer bg-gray-600 hover:bg-[#3b4053] transition mb-8 shadow-2xl"
        onClick={() => fileInputRef.current.click()}
      >
        <p className="text-center text-gray-300">
          Click or drag files here to upload (Max: 7 files, 10MB each)
        </p>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hidden"
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-300 mb-5">
        Vehicle Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Vehicle Identification Number */}
        <div>
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            Vehicle Identification Number
          </label>
          <input
            type="text"
            value={vehicleData.vin}
            onChange={createChangeHandler("vin")}
            placeholder="Enter VIN"
            className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#FED700]"
          />
          {errors.vin && (
            <p className="mt-2 pl-2 text-sm text-red-400">{errors.vin}</p>
          )}
        </div>

        {/* Make */}
        <div className="relative">
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            Make
          </label>
          <input
            type="text"
            value={manufacturer}
            disabled
            className="w-full px-4 py-3 border border-gray-600 bg-[#1F2937] text-white rounded-lg"
          />
        </div>

        {/* Model */}
        <div className="relative">
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            Model
          </label>
          <input
            type="text"
            value={model}
            disabled
            className="w-full px-4 py-3 border border-gray-600 bg-[#1F2937] text-white rounded-lg"
          />
        </div>

        {/* Year of Manufacture */}
        <div>
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            Year of Manufacture
          </label>
          <div className="relative w-full">
            <DatePicker
              selected={vehicleData.year ? new Date(vehicleData.year, 0) : null}
              onChange={(date) => handleChange("year", date.getFullYear())}
              showYearPicker
              dateFormat="yyyy"
              className={`w-full px-4 py-3 border border-gray-600 bg-[#1F2937] text-white rounded-lg focus:ring focus:ring-[#FED700] focus:outline-none`}
              placeholderText="Select Year"
            />
            <FiCalendar className="absolute right-3 top-[50%] transform -translate-y-1/2 text-yellow-400 pointer-events-none" />
          </div>
          {errors.year && (
            <p className="mt-2 pl-2 text-sm text-red-400">{errors.year}</p>
          )}
        </div>
        {/* Fuel Type */}
        <div className="">
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            Fuel Type
          </label>
          <div className="relative">
            <select
              value={vehicleData.fuelType}
              onChange={createChangeHandler("fuelType")}
              className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white focus:outline-none focus:ring focus:ring-[#FED700] appearance-none"
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Gas">Gas</option>
            </select>
            <FaChevronDown className="absolute right-3 top-[50%] transform -translate-y-[50%] text-gray-200 pointer-events-none" />
          </div>
          {errors.fuelType && (
            <p className="mt-2 pl-2 text-sm text-red-400">{errors.fuelType}</p>
          )}
        </div>

        {/* Transmission */}
        <div className="">
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            Transmission
          </label>
          <div className="relative">
            <select
              value={vehicleData.transmission}
              onChange={createChangeHandler("transmission")}
              className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white focus:outline-none focus:ring focus:ring-[#FED700] appearance-none"
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
            <FaChevronDown className="absolute right-3 top-[50%] transform -translate-y-[50%] text-gray-200 pointer-events-none" />
          </div>
          {errors.transmission && (
            <p className="mt-2 pl-2 text-sm text-red-400">
              {errors.transmission}
            </p>
          )}
        </div>

        {/* Mileage */}
        <div>
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            Mileage
          </label>
          <input
            type="number"
            value={vehicleData.mileage}
            onChange={createChangeHandler("mileage")}
            placeholder="e.g. 40000"
            className={`w-full p-3 rounded-lg bg-[#1F2937] hide-spinner border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#FED700]`}
          />
          {errors.mileage && (
            <p className="mt-2 pl-2 text-sm text-red-400">{errors.mileage}</p>
          )}
        </div>

        {/* Interior Color */}
        <div className="">
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            Interior Color
          </label>
          <div className="relative">
            <select
              value={vehicleData.interiorColor}
              onChange={createChangeHandler("interiorColor")}
              className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white focus:outline-none focus:ring focus:ring-[#FED700] appearance-none"
            >
              <option value="">Select Color</option>
              <option value="Black">Black</option>
              <option value="Beige">Beige</option>
              <option value="Gray">Gray</option>
              <option value="Brown">Brown</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="White">White</option>
              <option value="Silver">Silver</option>
            </select>
            <FaChevronDown className="absolute right-3 top-[50%] transform -translate-y-[50%] text-gray-200 pointer-events-none" />
          </div>
          {errors.interiorColor && (
            <p className="mt-2 pl-2 text-sm text-red-400">
              {errors.interiorColor}
            </p>
          )}
        </div>

        {/* Exterior Color */}
        <div className="">
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            Exterior Color
          </label>
          <div className="relative">
            <select
              value={vehicleData.exteriorColor}
              onChange={createChangeHandler("exteriorColor")}
              className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white focus:outline-none focus:ring focus:ring-[#FED700] appearance-none"
            >
              <option value="">Select Color</option>
              <option value="White">White</option>
              <option value="Black">Black</option>
              <option value="Gray">Gray</option>
              <option value="Yellow">Yellow</option>
              <option value="Silver">Silver</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
            </select>
            <FaChevronDown className="absolute right-3 top-[50%] transform -translate-y-[50%] text-gray-200 pointer-events-none" />
          </div>
          {errors.exteriorColor && (
            <p className="mt-2 pl-2 text-sm text-red-400">
              {errors.exteriorColor}
            </p>
          )}
        </div>

        {/* Condition */}
        <div className="">
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            Condition
          </label>
          <div className="relative">
            <select
              value={vehicleData.condition}
              onChange={createChangeHandler("condition")}
              className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white focus:outline-none focus:ring focus:ring-[#FED700] appearance-none"
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
            <FaChevronDown className="absolute right-3 top-[50%] transform -translate-y-[50%] text-gray-200 pointer-events-none" />
          </div>
          {errors.condition && (
            <p className="mt-2 pl-2 text-sm text-red-400">{errors.condition}</p>
          )}
        </div>

        {/* Title Status */}
        <div className="">
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            Title Status
          </label>
          <div className="relative">
            <select
              value={vehicleData.titleStatus}
              onChange={createChangeHandler("titleStatus")}
              className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white focus:outline-none focus:ring focus:ring-[#FED700] appearance-none"
            >
              <option value="">Select Title Status</option>
              <option value="Clean">Clean Title</option>
              <option value="Salvage">Salvage Title</option>
              <option value="Rebuilt">Rebuilt Title</option>
              <option value="Lien">Lien Title</option>
            </select>
            <FaChevronDown className="absolute right-3 top-[50%] transform -translate-y-[50%] text-gray-200 pointer-events-none" />
          </div>
          {errors.titleStatus && (
            <p className="mt-2 pl-2 text-sm text-red-400">
              {errors.titleStatus}
            </p>
          )}
        </div>

        {/* Body Type */}
        <div className="">
          <label className="block mb-2 text-md text-[#FED700] font-semibold">
            Body Type
          </label>
          <div className="relative">
            <select
              value={vehicleData.bodyType}
              onChange={createChangeHandler("bodyType")}
              className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white focus:outline-none focus:ring focus:ring-[#FED700] appearance-none"
            >
              <option value="">Select Body Type</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Wagon">Wagon</option>
              <option value="Hatchback">Hatchback</option>
            </select>
            <FaChevronDown className="absolute right-3 top-[50%] transform -translate-y-[50%] text-gray-200 pointer-events-none" />
          </div>
          {errors.bodyType && (
            <p className="mt-2 pl-2 text-sm text-red-400">{errors.bodyType}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoStep;
