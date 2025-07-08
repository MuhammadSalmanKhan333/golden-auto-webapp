import { useState, useEffect } from "react";
import { FaEye, FaStar } from "react-icons/fa";
import carOne from "../assets/images/productImages/PImage.png";
import carTwo from "../assets/images/productImages/Pimage1.png";
import { useSelector } from "react-redux";
import { fetchData } from "../services/apiService";
import utils from "../utils/utils";

export default function Orders() {
  const [listings, setListings] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // "confirmed", "rejected", or null
  const [deliveryDate, setDeliveryDate] = useState(null);

  const authUser = useSelector((state) => state.auth.user);
  const loggedInUserId = authUser?.id;
  useEffect(() => {
    const loadOrders = async () => {
      if (!loggedInUserId) return;
      console.log(loggedInUserId);
      try {
        const response = await fetchData(
          `purchases?filters[buyer][id]=${1}&populate=*`
        );
        setListings(response?.data || []);
        console.log("Fetched Orders:", response?.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleAction = (type) => {
    const date = new Date().toISOString().split("T")[0]; // e.g. "2025-08-21"
    setDeliveryDate(date);
    setStatus(type);
  };

  console.log("Selected Order:", listings);
  return (
    <section className="bg-[#151F28] min-h-screen">
      <div className="max-w-[1200px] mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-[#FED700]">My Orders</h1>
        </div>
        <button className="w-[10%] m-5 bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded-lg font-semibold transition cursor-pointer">
          Seller
        </button>
        <button className="w-[10%] m-5 bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded-lg font-semibold transition cursor-pointer">
          Buyer
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="rounded-xl border border-[#293041] bg-[#1c2331] p-4 cursor-pointer hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              <div className="text-white">
                {/* Image */}
                <img
                  src={`${
                    utils.BASE_URL_MEDIA + listing.vehicle?.picture?.picture
                  }`}
                  alt={listing?.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />

                {/* Car Info */}
                <div className="mb-2">
                  <p className="text-gray-400">{listing.vehicle?.name}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">{listing?.subname}aa</p>
                    <p className="text-yellow-400 font-semibold">
                      ${listing.vehicle?.price}
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-600 my-3" />

                <button
                  onClick={() => setSelectedOrder(listing)}
                  className="flex items-center gap-2 text-yellow-400 cursor-pointer hover:text-yellow-300 transition"
                >
                  <FaEye /> See Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Popup */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 px-4">
            <div className="bg-[#1c2331] rounded-xl p-6 w-full max-w-lg text-white relative shadow-2xl">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-6 text-white text-4xl hover:text-red-500 transition"
              >
                &times;
              </button>

              <img
                src={`${
                  utils.BASE_URL_MEDIA + selectedOrder.vehicle?.picture?.picture
                }`}
                alt={selectedOrder?.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-yellow-400 mb-3">
                {selectedOrder.vehicle?.name}
              </h2>
              <h2 className="text-2xl font-bold text-yellow-400 mb-3">
                {selectedOrder?.subname}
              </h2>

              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-semibold text-gray-400">Price:</span> $
                  {selectedOrder.vehicle?.price}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">Fuel:</span>{" "}
                  {selectedOrder.vehicle?.feul_type}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">Seats:</span>{" "}
                  {selectedOrder.vehicle?.information?.features?.seat}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">
                    Transmission:
                  </span>{" "}
                  {selectedOrder.vehicle?.transmission}
                  {selectedOrder?.transmission}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">Type:</span>{" "}
                  {selectedOrder?.type}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">Status:</span>{" "}
                  <span
                    className={`font-bold ${
                      status === "confirmed"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {selectedOrder?.order_status}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-400">
                    Order Date:
                  </span>{" "}
                  {selectedOrder?.createdAt?.split("T")[0]}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">
                    Delivery Date:
                  </span>{" "}
                  {deliveryDate === null ? "pending" : deliveryDate}
                </p>
              </div>

              <div className="mt-5 w-full">
                {status === null ? (
                  <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-4 gap-3 items-center w-full">
                    <button
                      onClick={() => handleAction("confirmed")}
                      className="w-full sm:w-[40%] bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded-lg font-semibold transition"
                    >
                      Confirm Order
                    </button>
                    <button
                      onClick={() => handleAction("rejected")}
                      className="w-full sm:w-[40%] bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg font-semibold transition"
                    >
                      Reject Order
                    </button>
                  </div>
                ) : (
                  <p className="text-lg font-medium mt-4 text-center">
                    {status === "confirmed"
                      ? `✅ Delivered on: ${deliveryDate}`
                      : `❌ Rejected on: ${deliveryDate}`}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
