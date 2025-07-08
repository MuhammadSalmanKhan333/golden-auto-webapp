import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { postData, deleteData } from "../../services/apiService";
import { useSelector, useDispatch } from "react-redux";
import { setFavoritedCars } from "../../features/authSlice"; // Make sure this exists
import toast, { Toaster } from "react-hot-toast";

const FavouriteButton = ({ vehicleId, userId, user }) => {
  const dispatch = useDispatch();
  const favoritedCars = useSelector((state) => state.auth.favoritedCars);

  const [isFavourite, setIsFavourite] = useState(false);
  const [documentId, setDocumentId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Initialize favourite status based on Redux store
  useEffect(() => {
    const fav = favoritedCars?.find((car) => car.vehicle === vehicleId);
    if (fav) {
      setIsFavourite(true);
      setDocumentId(fav.id); // assuming each car has a unique ID in favorites
    } else {
      setIsFavourite(false);
      setDocumentId(null);
    }
  }, [favoritedCars, vehicleId]);

  const toggleFavourite = async () => {
    if (!user || !userId) {
      toast("Please log in to add to favorites.", {
        icon: "⚠️",
      });
      return;
    }
    if (loading) return;
    setLoading(true);

    try {
      if (!isFavourite) {
        const response = await postData(
          "favorites",
          {
            data: {
              vehicle: vehicleId,
              user: userId,
            },
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response?.data) {
          const newFavorite = {
            id: response.data.documentId, // Make sure your API returns this
            vehicle: vehicleId,
            user: userId,
          };

          // ✅ Update global state
          dispatch(setFavoritedCars([...favoritedCars, newFavorite]));

          setDocumentId(response.data.documentId);
          setIsFavourite(true);
        }
      } else {
        if (!documentId) {
          throw new Error("Missing favourite document ID for deletion");
        }

        await deleteData(`favorites/${documentId}`);

        // ✅ Remove from global state
        const updatedFavorites = favoritedCars.filter(
          (car) => car.id !== documentId
        );
        dispatch(setFavoritedCars(updatedFavorites));

        setIsFavourite(false);
        setDocumentId(null);
      }
    } catch (error) {
      console.error("Error updating favourite:", error);
      alert("Something went wrong while updating favourite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={toggleFavourite}
      className="bg-[#FED700] flex items-center justify-between px-4 py-3 cursor-pointer rounded-lg space-x-2"
    >
      <Toaster />
      <span className="font-semibold text-gray-800">Add to Favourite</span>
      {isFavourite ? <FaHeart /> : <FaRegHeart />}
    </div>
  );
};

export default FavouriteButton;
