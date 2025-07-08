import React from "react";
import { FaCreditCard, FaChevronDown } from "react-icons/fa";

const PaymentForm = () => {
  return (
    <div className="w-[950px] max-w-[950px] max-h-fit mx-auto bg-gray-700 rounded-lg shadow-md border border-gray-600 mt-6 mb-3">
      {/* Header */}
      <div className="bg-[#FED700] p-4 rounded-t-lg">
        <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
      </div>

      <div className="p-6">
        {/* New Card Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between p-5 bg-[#1F2937] border border-gray-600 rounded-lg cursor-pointer hover:border-[#FED700] transition-colors">
            <div className="flex items-center">
              <FaCreditCard className="text-[#FED700] text-xl mr-3" />
              <span className="font-medium text-gray-100">New Card</span>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#FED700] hidden"></div>
            </div>
          </div>
        </div>

        {/* Card Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#FED700] mb-2 pl-1">
              Card holder's Name
            </label>
            <input
              type="text"
              className="w-full p-3 bg-[#1F2937] text-gray-100 border border-gray-600 rounded-lg focus:ring-1 focus:ring-[#FED700] focus:outline-none"
              placeholder="Name on card"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#FED700] mb-2 pl-1">
              Card Number
            </label>
            <input
              type="text"
              className="w-full p-3 bg-[#1F2937] text-gray-100 border border-gray-600 rounded-lg focus:ring-1 focus:ring-[#FED700] focus:outline-none"
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#FED700] mb-2 pl-1">
                Expiry Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 bg-[#1F2937] text-gray-100 border border-gray-600 rounded-lg focus:ring-1 focus:ring-[#FED700] focus:outline-none"
                  placeholder="MM/YY"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#FED700] mb-2 pl-1">
                CVC
              </label>
              <input
                type="text"
                className="w-full p-3 bg-[#1F2937] text-gray-100 border border-gray-600 rounded-lg focus:ring-1 focus:ring-[#FED700] focus:outline-none"
                placeholder="123"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
