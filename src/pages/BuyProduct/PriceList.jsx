import React, { useEffect } from "react";

const PriceList = ({ carData, loading, error, onTotalAmountChange }) => {
  // Calculate prices
  const carPrice = carData?.price || 0;
  const discount = carData?.discount || 0;
  const taxRate = 0.1; // 10% tax - adjust as needed
  const taxAmount = (carPrice - discount) * taxRate;
  const totalPrice = carPrice - discount + taxAmount;

  // Notify parent when total changes
  useEffect(() => {
    if (onTotalAmountChange) {
      onTotalAmountChange(totalPrice);
    }
  }, [totalPrice, onTotalAmountChange]);

  if (loading) {
    return (
      <div className="min-w-[500px] mx-auto bg-gray-700 rounded-lg shadow-md overflow-hidden border">
        <div className="bg-[#FED700] p-4 rounded-t-lg">
          <h2 className="text-xl font-bold pl-1">Price Summary</h2>
        </div>
        <div className="p-4 text-center py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-600 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-600 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-600 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-w-[500px] mx-auto bg-gray-700 rounded-lg shadow-md overflow-hidden border">
        <div className="bg-[#FED700] p-4 rounded-t-lg">
          <h2 className="text-xl font-bold pl-1">Price Summary</h2>
        </div>
        <div className="p-4 text-center py-8 text-red-400">
          <p>Failed to load price information</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!carData) {
    return (
      <div className="min-w-[500px] mx-auto bg-gray-700 rounded-lg shadow-md overflow-hidden border">
        <div className="bg-[#FED700] p-4 rounded-t-lg">
          <h2 className="text-xl font-bold pl-1">Price Summary</h2>
        </div>
        <div className="p-4 text-center py-8 text-gray-400">
          No vehicle data available
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-[500px] mx-auto bg-gray-700 rounded-lg shadow-md overflow-hidden border">
      <div className="bg-[#FED700] p-4 rounded-t-lg">
        <h2 className="text-xl font-bold pl-1">Price Summary</h2>
      </div>

      <div className="p-4">
        {/* Price Items */}
        <div className="space-y-5">
          {/* Car Price */}
          <div className="flex justify-between items-start pb-4">
            <h3 className="font-semibold text-[#FED700]">Car Price</h3>
            <span className="font-medium text-gray-100">
              $ {carPrice.toLocaleString()}
            </span>
          </div>

          {/* Discount */}
          <div className="flex justify-between items-start pb-4">
            <h3 className="font-semibold text-[#FED700]">Discount / Deal</h3>
            <span className="font-medium text-green-400">
              - $ {discount.toLocaleString()}
            </span>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-start pb-4 border-b border-gray-600">
            <h3 className="font-semibold text-[#FED700]">Subtotal</h3>
            <span className="font-medium text-gray-100">
              $ {(carPrice - discount).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Tax and Total */}
        <div className="mt-4 space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold text-[#FED700]">
              Tax ({taxRate * 100}%)
            </span>
            <span className="font-medium text-gray-100">
              $ {taxAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between pt-4 border-t border-gray-600">
            <span className="font-bold text-lg text-[#FED700]">Total</span>
            <span className="font-bold text-lg text-gray-100">
              $ {totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceList;
