import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { fetchData, deleteData } from "../services/apiService"; // Adjust path
import { useDispatch } from "react-redux";
import { setFavoritedCars } from "../features/authSlice";
import utils from "../utils/utils";
const FavoriteCard = ({ item, onRemove }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFavoriteToggle = () => {
    if (onRemove) onRemove(item);
  };

  const vehicle = item?.attributes?.vehicle?.data?.attributes;

  return (
    <div className="rounded-xl relative border-2 border-[#293041] p-2 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300">
      <img
        src={utils.BASE_URL_MEDIA + item.vehicle.picture.picture[0]}
        alt="Vehicle"
        className="w-full h-60 object-cover transition-all duration-300"
      />

      <div className="p-4">
        <h2 className="text-lg font-normal text-gray-400">
          {item.vehicle.name}
        </h2>
        {/* <p className="text-sm text-gray-500 mb-3">{item.vehicle.description}</p> */}
        <div className="flex justify-between items-center">
          <span className="text-yellow-400 text-lg font-medium">
            ${item.vehicle.price}
          </span>
          <button
            className="px-2 py-1.5 cursor-pointer rounded-md border-1 border-[#1E1E1E] bg-[#FFD700] font-medium text-black hover:bg-yellow-500 transition-colors duration-300"
            onClick={handleFavoriteToggle}
            title="Remove from favorites"
          >
            Remove from Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default function FavoritePage() {
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const getFavorites = async () => {
      try {
        const response = await fetchData(
          `favorites?filters[user][id]=${user.id}&populate=vehicle`,
          { headers: { "Content-Type": "application/json" } }
        );

        setFavoriteCars(response.data);
        dispatch(setFavoritedCars(response.data));
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch favorites:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getFavorites();
  }, [user]);

  const handleRemoveFavorite = async (item) => {
    try {
      await deleteData(`favorites/${item.documentId}`);
      const updatedFavorites = favoriteCars.filter((fav) => fav.id !== item.id);
      setFavoriteCars(updatedFavorites);
      dispatch(setFavoritedCars(updatedFavorites));
    } catch (error) {
      console.error("Failed to remove favorite:", error.message);
    }
  };

  return (
    <section className="bg-[#151F28]">
      <div className="min-h-screen max-w-[1200px] mx-auto p-6">
        <h1 className="text-[#FED700] text-2xl font-semibold text-left mb-6 max-w-[1200px] mx-6 sm:mx-10 mt-20">
          Our Favorites
        </h1>

        {loading ? (
          <p className="text-gray-300 mx-6">Loading favorites...</p>
        ) : favoriteCars.length === 0 ? (
          <p className="text-gray-300 mx-6">No favorite cars found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteCars.map((car) => (
              <FavoriteCard
                key={car.id}
                item={car}
                onRemove={handleRemoveFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
