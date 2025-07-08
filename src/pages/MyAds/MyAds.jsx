import { useEffect, useState } from "react";
import { MdOutlineLocationOn, MdSearch } from "react-icons/md";
import { FaRegHeart, FaHeart, FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import car1 from "../../assets/images/car1.png";
import { deleteData, fetchData, putData } from "../../services/apiService";
import utils from "../../utils/utils";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

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

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const postedBy_id = userData?.id;

  const fetchListings = async () => {
    try {
      setLoading(true);
      console.log("🚀 ~ fetchListings ~ postedBy_id:", postedBy_id);
      const response = await fetchData(
        `vehicles?populate=category.category&filters[posted_by][id]=${postedBy_id}`
      );
      console.log("🚀 ~ fetchListings ~ response:", response);
      setListings(response?.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postedBy_id) {
      fetchListings();
    } else {
      setError("User not found. Please log in.");
      alert("User not found. Please log in.");
      setLoading(false);
    }
  }, [postedBy_id]);

  const handleDelete = async (documentId) => {
    console.log("🚀 ~ handleDelete ~ documentId:", documentId);
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirm) return;
    try {
      await deleteData(`vehicles/${documentId}`);
      // Remove deleted item from state
      setListings((prev) =>
        prev.filter((item) => item.documentId !== documentId)
      );
      toast.success("Listing deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete the listing. Please try again.");
    }
  };

  console.log("🚀 ~ MyAds ~ listings:", listings);
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleAvailability = async (availability, documentId) => {
    const newStatus =
      availability?.toLowerCase() === "pending" ? "Available" : "Pending";
    console.log("🚀 ~ handleAvailability ~ newStatus:", newStatus, documentId);

    const confirm = window.confirm(
      `Are you sure you want to change Vehicle Status to "${newStatus}"?`
    );
    if (!confirm) return;

    try {
      await putData(`/vehicles/${documentId}`, {
        data: {
          availability: newStatus,
        },
      });
      setListings((prevListings) =>
        prevListings.map((item) =>
          item.documentId === documentId
            ? { ...item, availability: newStatus }
            : item
        )
      );
      toast.success(`Vehicle Status updated to ${newStatus}!`);
    } catch (error) {
      console.error("Failed to update availability", error);
    }
  };

  return (
    <>
      <div className="bg-[#151F28] min-h-screen pt-6 pb-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[28px] font-bold text-[#FED700]">
              My Listings
            </h2>
            <Link
              to="/post-ads"
              className="flex items-center cursor-pointer gap-2 bg-[#FED700] font-medium shadow-md px-4 py-2 rounded hover:bg-yellow-400 transition-all duration-200"
            >
              <FaPlus />
              Add Listing
            </Link>
          </div>

          {/* Search Field */}
          <div className="mb-6 relative">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="text-gray-800" size={24} />
              </div>
              <input
                type="text"
                placeholder="Search by ad title or location..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FED700] focus:border-transparent transition-all duration-200"
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
            <div className="flex space-x-2 border-b border-gray-200">
              {tabOptions.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 mb-2 text-sm font-medium relative transition-all duration-200 
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
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FED700]"></div>
              <span className="ml-2 text-[#FED700]">Loading...</span>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : listings.length === 0 ? (
            <div className="text-gray-400 text-center">No listings found.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-[#1c2331] rounded-xl shadow-sm overflow-hidden border-2 border-[#293041] hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Image */}
                      <div className="relative w-full sm:w-48 h-40 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={`${utils.BASE_URL_MEDIA}${listing.picture?.picture?.[0]}`}
                          alt={listing.name}
                          className="w-full h-full mx-auto rounded-lg object-cover"
                        />
                        <button
                          onClick={() => toggleFavorite(listing.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        >
                          {favorites.includes(listing.id) ? (
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
                            <h3 className="text-lg font-semibold text-[#FED700] ">
                              {listing.name || "No title available"}
                            </h3>
                            <div className="flex items-center text-gray-300 text-sm mt-1">
                              <MdOutlineLocationOn className="mr-1" />
                              {listing.location.Address ||
                                "No location available"}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-[#FED700]">
                              Rs {listing.price || "0"}
                            </div>
                            <div className="text-sm text-gray-300 mt-1">
                              {new Date(listing.publishedAt).toDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 justify-between items-center">
                          <div className="text-sm text-gray-400">
                            <span className="font-medium">50</span> views
                          </div>

                          <div className="flex gap-3">
                            <button
                              className="flex items-center cursor-pointer gap-1 text-sm text-blue-400 hover:text-blue-500"
                              onClick={() => navigate(`/details/${listing.id}`)}
                            >
                              <FiEye className="text-base" />
                              View
                            </button>
                            <button
                              className="flex items-center cursor-pointer gap-1 text-sm text-green-400 hover:text-green-600"
                              onClick={() => navigate(`/edit-ad/${listing.id}`)}
                            >
                              <FiEdit className="text-base" />
                              Edit
                            </button>
                            <button
                              className="flex items-center cursor-pointer  gap-1 text-sm text-red-500 hover:text-red-600"
                              onClick={() => handleDelete(listing.documentId)}
                            >
                              <FiTrash2 className="text-base" />
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="mt-3">
                          <button
                            className="inline-block px-2 py-1 text-sm rounded bg-[#FED700] hover:bg-yellow-400 cursor-pointer text-black font-medium"
                            onClick={() =>
                              handleAvailability(
                                listing.availability,
                                listing.documentId
                              )
                            }
                          >
                            {listing?.availability?.toLowerCase() === "pending"
                              ? "Activate"
                              : listing?.availability?.toLowerCase() ===
                                "available"
                              ? "Deactivate"
                              : listing.availability}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Optional: Package promo */}
          <div className="mt-10 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-md">
            <p className="text-sm text-gray-800">
              <strong>Heavy discount on Packages:</strong> Boost your ad
              visibility with special packages.{" "}
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
