import React from "react";
import visaLogo from "../assets/images/Visalogo.png";
import paypalLogo from "../assets/images/paypal-logo.svg";
import mastercardLogo from "../assets/images/Mastercard.png";

const paymentOptions = [
  { id: 1, label: "PayPal", logo: paypalLogo },
  { id: 2, label: "Visa", logo: visaLogo },
  { id: 3, label: "Mastercard", logo: mastercardLogo },
];

const PaymentMethodStep = () => {
  return (
    <div className="bg-[#1e212b] rounded-lg p-6 text-white shadow-md w-full mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        {/* LEFT: Payment Method */}
        <div className="flex-1 flex flex-col gap-8 px-2 py-4">
          <div className="flex flex-col gap-10 h-full">
            <h2 className="text-xl font-semibold text-[#FED700]">Payment</h2>
            <div>
              <h3 className="text-lg font-medium mb-3 text-[#FED700]">
                My Payment Method
              </h3>
              {paymentOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex mb-3 items-center justify-between p-3 text-gray-300 border rounded-lg cursor-pointer transition border-gray-600 hover:border-[#FED700]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={option.logo}
                      alt={option.label}
                      className="w-12 h-8 bg-gray-400 rounded p-1"
                    />
                    <span className="font-medium">{option.label}</span>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="accent-[#FED700]"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-green-500 hover:bg-green-600 text-white tra font-semibold px-6 py-3 cursor-pointer rounded-lg shadow-md w-full">
              Get Pay
            </button>
          </div>
        </div>

        {/* new section */}
        {/* RIGHT: Add New Card */}
        <div className="flex-1 bg-[#2b2e39] px-4 py-5 lg:py-4 rounded-lg shadow-md flex flex-col justify-between min-h-[580px]">
          <div className="flex flex-col gap-7">
            <h3 className="text-xl text-[#FED700] font-medium mb-4">
              Add New Card
            </h3>

            <div className="">
              <label className="block text-lg text-[#FED700] mb-3 font-medium">
                Select Payment Method
              </label>
              <div className="flex flex-wrap gap-4">
                {paymentOptions.map((option) => (
                  <div
                    key={option.id}
                    className="border rounded-lg p-3 cursor-pointer border-gray-600 hover:border-[#FED700] bg-[#1e212b] transition duration-300 hover:bg-[#7c84ab]"
                  >
                    <img
                      src={option.logo}
                      alt={option.label}
                      className="w-16 h-6"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-md mb-1 text-[#FED700]">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3 rounded-lg focus:outline-1 focus:outline-[#FED700] shadow-2xl bg-[#1e212b] text-gray-300 border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-md mb-1 text-[#FED700]">
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-3 rounded-lg focus:outline-1 focus:outline-[#FED700] bg-[#1e212b] text-gray-300 border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-md mb-1 text-[#FED700]">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YYYY"
                  className="w-full p-3 rounded-lg focus:outline-1 focus:outline-[#FED700] bg-[#1e212b] text-gray-300 border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-md mb-1 text-[#FED700]">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full p-3 rounded-lg focus:outline-1 focus:outline-[#FED700] bg-[#1e212b] text-gray-300 border border-gray-600"
                />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 pl-2">
              <input
                type="checkbox"
                className="accent-yellow-400 size-5 cursor-pointer"
              />
              <span className="text-md">Save this card for future use</span>
            </label>
          </div>

          {/* Button perfectly aligned to left side button */}
          <button className="bg-[#FED700] text-[#151F28] font-semibold px-6 py-3 cursor-pointer rounded-lg hover:bg-yellow-400 transition shadow-md w-full mt-4">
            Add New Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodStep;
