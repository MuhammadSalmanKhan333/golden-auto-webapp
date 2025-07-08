import { FaGasPump, FaCogs, FaCarSide, FaPlus } from "react-icons/fa";

import { useEffect, useState } from "react";
import { deleteData, fetchData } from "../services/apiService";
import utils from "../utils/utils";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function SellingListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log("🚀 ~ SellingListings ~ userData:", userData);

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

  return (
    <section className="bg-[#151F28] min-h-screen">
      <div className="max-w-[1300px] mx-auto p-6">
        {/* User Profile Section */}
        <div className="bg-[#1c2331] p-6 rounded-2xl text-white shadow-lg mb-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <img
            src={`${utils.BASE_URL_MEDIA}${userData?.picture}`} // Replace this with dynamic image URL
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-yellow-400"
          />
          <div>
            <h2 className="text-2xl font-bold text-[#FED700] my-1">
              {userData?.fname} {userData?.lname}
            </h2>
            <p className="text-gray-300 mb-1">{userData?.email}</p>
            <p className="text-[#FED700]">
              <span className="text-gray-300">Member since:</span>{" "}
              {new Date(userData?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-300 mt-2">
              <span className="text-[#FED700] font-semibold">
                {listings.length}
              </span>{" "}
              ads posted
            </p>
          </div>
        </div>

        {/* Listings Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl ml-2 font-bold text-[#FED700]">
            My Listings
          </h1>
          <Link
            to="/post-ads"
            className="flex items-center cursor-pointer gap-2 bg-[#FED700] font-medium shadow-md px-4 py-2 rounded hover:bg-yellow-400 transition-all duration-200"
          >
            <FaPlus />
            Add Listing
          </Link>
        </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="rounded-xl border-2 border-[#293041] p-2 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 lg:max-w-[400px]"
              >
                <div className="bg-[#1c2331] p-2 rounded-xl text-white shadow-lg mx-auto">
                  <img
                    src={`${utils.BASE_URL_MEDIA}${listing.picture?.picture?.[0]}`}
                    alt={listing.name}
                    className="w-full h-[180px] mx-auto rounded-lg mb-6"
                  />

                  <div className="w-full">
                    <p className="text-gray-400">
                      {listing.category?.category?.name || "Not specified"}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-normal">
                        {listing.name || "level ha "}
                      </p>
                      <p className="text-yellow-400 text-lg font-medium">
                        ${listing.price}
                      </p>
                    </div>
                  </div>

                  <div className="border-b border-gray-600 my-3"></div>

                  <div className="flex flex-wrap max-[500px]:gap-6 min-[500px]:gap-5 justify-between text-gray-300 text-sm w-full">
                    <div className="flex items-center gap-1">
                      <FaGasPump className="text-yellow-400" />
                      <span className="text-xs">{listing.feul_type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCogs className="text-yellow-400" />
                      <span className="text-xs">
                        {listing.transmission || ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCarSide className="text-yellow-400" />
                      <span className="text-xs">{listing.body_type}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
