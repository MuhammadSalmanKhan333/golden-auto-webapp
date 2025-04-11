import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import CarOne from "../assets/images/productImages/PImage.png";
import CarTwo from "../assets/images/productImages/Pimage1.png";
const listings = [
  {
    id: 1,
    title: "Toyota Corolla 2020",
    price: "$15,000",
    image: CarOne,
  },
  {
    id: 2,
    title: "Honda Civic 2021",
    price: "$17,500",
    image: CarTwo,
  },
];

export default function SellingListings() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-200">
          <FaPlus />
          Add Listing
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">
                {listing.title}
              </h2>
              <p className="text-gray-600">{listing.price}</p>
              <div className="flex mt-4 space-x-4">
                <button className="flex items-center text-yellow-600 hover:text-yellow-700">
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button className="flex items-center text-red-600 hover:text-red-700">
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
