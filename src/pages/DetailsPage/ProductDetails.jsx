import React, { useEffect, useState } from "react";
import mainImage from "../../assets/images/productImages/PImage.png";
import warrantyImage from "../../assets/images/icons/Warranty.png";
import priceImage from "../../assets/images/icons/Price.png";
import modelImage from "../../assets/images/icons/model.png";
import conditionImage from "../../assets/images/icons/condition.png";
import profileImage from "../../assets/images/profileImage.jpg";
import { Link } from "react-router-dom";
import bodyStyleImage from "../../assets/images/icons/bodyStyle.png";
import yearImage from "../../assets/images/icons/Release-year.png";
import Slider from "react-slick";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import utils from "../../utils/utils";
import { fetchData } from "../../services/apiService";
import FavouriteButton from "../../components/ui/AddToFav";
import {
  FiShoppingCart,
  FiMessageCircle,
  FiMapPin,
  FiLoader,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams(); // from URL
  const [car, setCar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [users, setUser] = useState("");

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      setError(""); // Clear previous error if any

      const response = await fetchData("vehicles", {
        params: {
          "filters[id]": id,
          "populate[0]": "posted_by",
          "populate[1]": "category.category",
          "populate[2]": "category.sub_category",
          "populate[3]": "brand.brand",
          "populate[4]": "brand.model",
        },
      });

      setCar(response.data[0] || null);
      console.log(response.data[0]);
    } catch (err) {
      console.error("Api Error:", err);
      setError("Failed to load car details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const carData = {
    image: car.picture?.picture?.[0]
      ? utils.BASE_URL_MEDIA + car.picture.picture[0]
      : mainImage,

    images: car.picture?.picture
      ? car.picture.picture.map((img) => utils.BASE_URL_MEDIA + img)
      : [mainImage],

    seller: {
      name: car.posted_by?.username || "Not provided",
      image: car.posted_by?.picture
        ? utils.BASE_URL_MEDIA + car.posted_by?.picture
        : profileImage,
      contact: car.posted_by?.contact || "Not provided",
      accountType: car.posted_by?.account_type || "Not specified",
      createdAt: car.posted_by?.createdAt || "Not provided",
    },
    location: car.location?.Address,
    name: car.name?.split("|")[0]?.trim(),
    year: car.year,
    price: car.price,
    feul: car.feul_type,
    kilometer: car.kilometer,
    transmission: car.transmission,
    bodyType: car.body_type,
    condition: car.condition,
    // 🆕 Show 'Yes' if true, 'No' if false
    warrenty: car.warrenty ? "Yes" : "No",
    // 🆕 Brand name + icon
    brand: {
      name: car.brand?.brand?.name || "Unknown",
      icon: car.brand?.brand?.icon
        ? utils.BASE_URL_MEDIA + car.brand.brand.icon
        : null,
    },
    model: {
      name: car.brand?.model?.name || "Unknown",
    },
    description: car.description,
    color: {
      interior: car.information?.interior_color || "N/A",
      exterior:
        car.information?.exterior_color ||
        car.information?.features?.color ||
        "N/A",
    },
    subCategory: car.category?.sub_category?.name || "Unknown",
    // Other vehicle info (optional - only if exists)
    seat: car.information?.seat || car.information?.features?.seat,
    door: car.information?.features?.door,
    engine: car.information?.features?.engine,
  };

  const vehicle = 44;
  const seller = 85;
  const buyer = 81;
  const chatOpen = true;

  const userCreatedAt = new Date(carData.seller.createdAt);
  const now = new Date();

  let years = now.getFullYear() - userCreatedAt.getFullYear();
  let months = now.getMonth() - userCreatedAt.getMonth();
  let days = now.getDate() - userCreatedAt.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  let joinedSince = "";
  if (years > 0) {
    joinedSince = `${years} years ago`;
  } else if (months > 0) {
    joinedSince = `${months} months ago`;
  } else {
    joinedSince = `${days} days ago`;
  }

  const carDetails = [
    {
      icon: bodyStyleImage,
      label: "Car Name",
      value: carData.name || "Not provided",
    },
    {
      icon: bodyStyleImage,
      label: "Sub Category Name",
      value: carData.subCategory || "Not provided",
    },
    {
      icon: carData.brand.icon,
      label: "Brand",
      value: carData.brand.name || "Not provided",
    },
    {
      icon: modelImage,
      label: "Model",
      value: carData.model.name || "Not provided",
    },
    {
      icon: yearImage,
      label: "Year",
      value: carData.year || "Not provided",
    },
    {
      icon: priceImage,
      label: "Price",
      value: carData.price || "Not provided",
    },
    {
      icon: conditionImage,
      label: "Condition",
      value: carData.condition || "Not provided",
    },
    {
      icon: warrantyImage,
      label: "Warranty",
      value: carData.warrenty || "Not provided",
    },
  ];

  const popularFeatures = [
    {
      label: "Exterior Color",
      value: carData.color.exterior || "Not provided",
    },
    {
      label: "Interior Color",
      value: carData.color.interior || "Not provided",
    },
    { label: "Body Type", value: carData.bodyType || "Not specified" },
    { label: "Seats", value: carData.seat || "Not specified" },
    { label: "Fuel Type", value: carData.feul || "Not Specified" },
    { label: "Transmission", value: carData.transmission || "Not Specified" },
    { label: "Milegage", value: carData.kilometer || "Mileage not provided" },
    { label: "Engine", value: carData.engine || "Engine info missing" },
    { label: "Doors", value: carData.door || "Doors info missing" },
  ];

  const imageCount = carData.images.length;
  const slidesToShow = 3; // Number of images to show in the slider
  const settings = {
    dots: false,
    infinite: imageCount > slidesToShow ? true : false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    swipe: imageCount > slidesToShow,
    draggable: imageCount > slidesToShow,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, imageCount),
          swipe: imageCount > 2,
          draggable: imageCount > 2,
          infinite: imageCount > 2,
        },
      },
    ],
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#151F28]">
        <div className="flex flex-col items-center">
          <FiLoader className="animate-spin text-[#FED700] text-4xl mb-4" />
          <p className="text-[#FED700] text-lg font-medium">
            Loading car details...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#151F28] space-y-4">
        <p className="text-red-500 text-lg font-medium">
          Something went wrong: {error}
        </p>
        <button
          onClick={fetchCarDetails} // you need to define this function
          className="px-6 py-2 bg-[#FED700] hover:bg-yellow-500 text-black font-semibold rounded-md transition"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="bg-[#151F28] min-h-screen pt-4 md:pt-8 ">
      <div className="flex flex-col rounded-xl gap-10 max-w-screen px-12 lg:px-10 xl:px-28 mt-12 mx-auto lg:flex-row max-[500px]:px-6">
        {/* Left Section - Main Image and Slider */}
        <div className="w-full lg:w-[55%] xl:w-[65%]">
          <img
            src={selectedImage || carData.image}
            alt={carData.name}
            className=" h-full sm:h-[450px] rounded-xl shadow-xl w-full object-contain sm:object-cover "
          />
          {/* Image Slider */}
          <div className="w-[95%] mt-5 mx-auto">
            <Slider {...settings} className="mt-4 slick-slider">
              {carData.images.map((img, index) => (
                <div key={index} className="px-1">
                  <img
                    src={img}
                    alt={`Car ${index + 1}`}
                    className={`border-2 h-16 rounded-xl w-full cursor-pointer object-cover ${
                      selectedImage === img
                        ? "border-red-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Right Section - Car Details */}
        <div className="sm:w-full lg:max-w-[400px] bg-gray-700 rounded-xl shadow-md p-4 space-y-6">
          {/* Profile Header */}
          <div className="flex gap-6">
            <img
              src={carData.seller.image}
              alt={carData.seller.name}
              className="size-20 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-[#FED700] text-xl capitalize">
                {carData.seller.name}
              </h2>
              <p className="text-sm text-[#FED700] font-medium">
                Member since:
                <span className="text-gray-100 pl-1">{joinedSince}</span>
              </p>
              <p className="text-sm text-[#FED700] font-medium">
                Account type:{" "}
                <span className="text-gray-100 pl-3">
                  {carData.seller.accountType}
                </span>
              </p>
              <p className="text-sm  text-[#FED700] font-medium mt-1 hover:text-yellow-200 transition cursor-pointer">
                <Link to="">View Profile</Link>
              </p>

              <div className="flex items-start gap-2 text-gray-200 my-3">
                <div className="bg-green-100 p-1 rounded-full flex items-center justify-center">
                  <FiMapPin className="text-green-600 size-4" />
                </div>
                <span className="text-justify pr-5 text-sm font-medium">
                  {carData.location}
                </span>
              </div>
              <Link
                to="/my-ads"
                className="text-red-500 font-semibold underline hover:text-red-600"
              >
                See all ads
              </Link>
            </div>
          </div>

          <FavouriteButton userId={users?.id} vehicleId={id} user={user} />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to={!user ? "/login" : "/buy-vehicle/" + id}
              state={{ carData: car }}
              className="flex items-center justify-center gap-2 w-full sm:w-1/2 px-4 py-3 bg-[#FED700]  text-lg font-semibold rounded-md hover:bg-yellow-500 transition cursor-pointer"
            >
              <FiShoppingCart /> Buy Now
            </Link>
            <Link
              to={!user ? "/login" : "/messages"}
              state={{
                vehicle: Number(id),
                seller: car?.posted_by?.id,
                buyer: user?.id,
                chatOpen: true,
              }}
              className="flex items-center justify-center gap-2 w-full sm:w-1/2 px-4 py-3 bg-[#FED700] text-lg font-semibold rounded-md hover:bg-yellow-500 transition cursor-pointer"
            >
              <FiMessageCircle /> Chat
            </Link>
          </div>
        </div>
      </div>

      {/* overviews section */}
      <div className="max-[500px]:!mx-6 max-lg:mx-12 max-w-4xl lg:ml-10 xl:ml-28 mt-6 py-10">
        {/* Basic Overview Section */}
        <h2 className="text-[#FED700] text-xl font-semibold mb-6">
          Basic Overview
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
          {carDetails.map((item, index) => (
            <div key={index} className="flex gap-4 items-center">
              <img src={item.icon} alt={item.label} className="size-7" />
              <div>
                <p className="text-gray-500 text-xs">{item.label}</p>
                <p className="text-white font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Description Section */}
        <div className="border-gray-300 border-y mt-8 py-8">
          <h3 className="text-[#FED700] text-lg font-semibold mb-6">
            Description
          </h3>
          <p className="text-gray-100 text-sm leading-relaxed">
            {carData.description || "Description not available"}
          </p>
          <button className="text-red-500 font-medium hover:cursor-pointer hover:underline mt-2">
            See More
          </button>
        </div>

        {/* Popular Features Section */}
        <div className="py-8">
          <h3 className="text-[#FED700] text-xl font-semibold mb-6">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {popularFeatures.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 justify-between border-b border-gray-600 py-2"
              >
                <span className="text-gray-400 font-medium">{item.label}</span>
                <span className="text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
