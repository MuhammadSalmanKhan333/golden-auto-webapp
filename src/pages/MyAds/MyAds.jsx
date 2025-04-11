import { useState } from "react";
import { MdOutlineLocationOn, MdSearch } from "react-icons/md";
import { FaRegHeart, FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import { FiEdit, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import car1 from "../../assets/images/car1.png";

const tabOptions = [
  "View All",
  "Active Ads",
  "Inactive Ads",
  "Pending Ads",
  "Moderated Ads",
];

export default function MyAds() {
  const [selectedTab, setSelectedTab] = useState("View All");
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Simulated ads data for demonstration
  const myAds = [
    {
      id: 1,
      title: "Toyota Corolla 2020",
      location: "Lahore, Pakistan",
      price: "3,200,000",
      image: car1,
      status: "Active Ads",
      date: "Today 10:30 AM",
      featured: true,
      views: 124,
    },
    {
      id: 2,
      title: "Honda Civic 2019",
      location: "Karachi, Pakistan",
      price: "3,000,000",
      image: car1,
      status: "Inactive Ads",
      date: "Yesterday 4:15 PM",
      featured: false,
      views: 89,
    },
    {
      id: 3,
      title: "Suzuki Cultus 2021",
      location: "Islamabad, Pakistan",
      price: "2,500,000",
      image: car1,
      status: "Pending Ads",
      date: "2 days ago",
      featured: true,
      views: 45,
    },
  ];

  const filteredAds =
    selectedTab === "View All"
      ? myAds.filter(ad => 
          ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ad.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : myAds.filter((ad) => 
          ad.status === selectedTab && (
            ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ad.location.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );

  return (
    <>
      <div className="bg-gray-100 min-h-screen pt-6 pb-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Manage and view your Ads</h2>

          {/* Search Field */}
          <div className="mb-6 relative">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by ad title or location..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FED700] focus:border-transparent transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Modern Tabs */}
          <div className="relative mb-8">
            <div className="flex space-x-1 border-b border-gray-200">
              {tabOptions.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-3 text-sm font-medium relative transition-all duration-200
                    ${
                      selectedTab === tab
                        ? "text-[#FED700]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab}
                  {selectedTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FED700] rounded-t"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Ads List */}
          {filteredAds?.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredAds.map((ad) => (
                <div key={ad.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Image */}
                      <div className="relative w-full sm:w-48 h-40 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={ad.image} 
                          alt={ad.title} 
                          className="w-full h-full object-cover"
                        />
                        {ad.featured && (
                          <div className="absolute top-2 left-2 bg-[#FED700] text-white text-xs px-2 py-1 rounded">
                            Featured
                          </div>
                        )}
                        <button 
                          onClick={() => toggleFavorite(ad.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        >
                          {favorites.includes(ad.id) ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaRegHeart />
                          )}
                        </button>
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{ad.title}</h3>
                            <div className="flex items-center text-gray-500 text-sm mt-1">
                              <MdOutlineLocationOn className="mr-1" />
                              {ad.location}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-800">Rs {ad.price}</div>
                            <div className="text-xs text-gray-500 mt-1">{ad.date}</div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2 justify-between items-center">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">{ad.views}</span> views
                          </div>
                          
                          <div className="flex gap-2">
                            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
                              <FiEye className="text-base" />
                              {ad.status === "Inactive Ads" ? "Activate" : "View"}
                            </button>
                            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600">
                              <FiEdit className="text-base" />
                              Edit
                            </button>
                            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600">
                              <FiTrash2 className="text-base" />
                              Delete
                            </button>
                            {ad.status === "Active Ads" && (
                              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-orange-500">
                                <FaStar className="text-base" />
                                Promote
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="mt-3">
                          <span className={`inline-block px-2 py-1 text-xs rounded 
                            ${
                              ad.status === "Active Ads" ? "bg-green-100 text-green-800" :
                              ad.status === "Inactive Ads" ? "bg-gray-100 text-gray-800" :
                              ad.status === "Pending Ads" ? "bg-yellow-100 text-yellow-800" :
                              "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {ad.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              No ads found {searchQuery ? `matching "${searchQuery}"` : `under "${selectedTab}"`}
            </div>
          )}

          {/* Optional: Package promo */}
          <div className="mt-10 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-md">
            <p className="text-sm text-gray-800">
              <strong>Heavy discount on Packages:</strong> Boost your ad visibility with special packages.{" "}
              <a href="#" className="text-blue-600 underline">
                View Packages
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}