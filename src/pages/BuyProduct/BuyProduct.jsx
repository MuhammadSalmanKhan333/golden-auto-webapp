import React, { useEffect, useState } from "react";
import CarInfo from "./CarInfo";
import UserInfo from "./UserInfo";
import PriceList from "./PriceList";
import PaymentForm from "./PaymentForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchData, postData } from "../../services/apiService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const BuyProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [carData, setCarData] = useState(location.state?.carData || null);
  const [loading, setLoading] = useState(!location.state?.carData);
  const [error, setError] = useState("");
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate(); // For redirection after purchase

  // Fetch car details if not passed via state
  useEffect(() => {
    if (!carData) {
      const fetchCarDetails = async () => {
        try {
          setLoading(true);
          setError("");
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
          setCarData(response.data[0] || null);
        } catch (err) {
          const errorMsg =
            "Failed to load car details. Please try again later.";
          setError(errorMsg);
          toast.error(errorMsg);
          console.error("API Error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchCarDetails();
    }
  }, [id, carData]);

  const handlePurchase = async () => {
    if (!user) {
      const errorMsg = "Please login to complete purchase";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!carData || !totalAmount) {
      const errorMsg = "Missing required purchase data";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    try {
      setPurchaseLoading(true);
      setError("");

      const payload = {
        data: {
          transaction_id: "", // Can be generated if needed
          vehicle: carData.id,
          buyer: user.id,
          seller: carData.posted_by?.id || null,
          amount: totalAmount,
          payment_status: "pending",
          payment_method: "bank_transfer",
          order_status: "pending",
          delivery_date: null,
        },
      };

      console.log("Purchase Payload:", payload);
      const response = await postData("purchases", payload);
      console.log("Purchase successful:", response);
      navigate(`/orderdetails`, {
        state: {
          carData: carData,
          purchaseData: response.data,
          totalAmount: totalAmount,
        },
      });
      toast.success("Purchase completed successfully!");
    } catch (err) {
      const errorMsg =
        err.message || "Failed to complete purchase. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Purchase Error:", err);
    } finally {
      setPurchaseLoading(false);
    }
  };

  return (
    <div className="bg-[#151F28] py-10 px-12">
      {/* Error display */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex gap-10">
        <div className="flex flex-col gap-6">
          <UserInfo />
          <PaymentForm />
        </div>
        <div className="flex flex-col gap-6">
          <CarInfo carData={carData} loading={loading} error={error} />
          <PriceList carData={carData} onTotalAmountChange={setTotalAmount} />
        </div>
      </div>

      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handlePurchase}
          disabled={purchaseLoading || !totalAmount || loading}
          className={`bg-[#FED700] text-gray-900 font-bold py-3 px-8 rounded-lg
            hover:bg-[#151F28] hover:text-[#FED700] hover:ring-2 hover:ring-[#FED700] cursor-pointer
            transition-all duration-300 ${
              purchaseLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
        >
          {purchaseLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Confirm Payment"
          )}
        </button>
      </div>
    </div>
  );
};

export default BuyProduct;
