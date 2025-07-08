import React from "react";
import utils from "../utils/utils";
const DocumentPreview = ({ formData, onBack }) => {
  return (
    <div className="bg-[#1e212b] rounded-lg p-6 text-white shadow-md w-full mx-auto">
      <h1 className="text-2xl font-bold text-[#FED700] mb-6 text-center">
        Digital Advertisement Posting Agreement
      </h1>

      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-[#FED700] mb-4 border-b border-[#FED700] pb-2">
          Car Details
        </h2>
        <p className="text-white mb-6">
          This agreement is for the sale of the vehicle:{" "}
          <span className="font-bold">Honda Accord Coupe</span>
        </p>

        <h2 className="text-xl font-semibold text-[#FED700] mb-4 border-b border-[#FED700] pb-2">
          Digital Advertisement Posting Agreement
        </h2>

        <div className="space-y-4 text-white">
          <div>
            <h3 className="text-lg font-medium text-[#FED700] mb-2">
              1. Introduction
            </h3>
            <p className="ml-4">
              This agreement ("Agreement") is made between the user
              ("Advertiser") and [Your Company Name] ("Platform"), governing the
              terms and conditions for posting advertisements on the Platform.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-[#FED700] mb-2">
              2. Advertisement Content
            </h3>
            <ul className="ml-8 list-disc space-y-1">
              <li>
                The Advertiser agrees to post legal and appropriate
                advertisements in compliance with local laws.
              </li>
              <li>
                The Advertiser must not post content that is offensive,
                misleading, or violates intellectual property rights.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-[#FED700] mb-2">
              3. Platform Rights
            </h3>
            <ul className="ml-8 list-disc space-y-1">
              <li>
                The Platform reserves the right to remove any advertisement that
                violates its policies.
              </li>
              <li>
                The Platform is not responsible for any claims or disputes
                arising from the advertisement.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-[#FED700] mb-2">
              4. Payment & Fees
            </h3>
            <ul className="ml-8 list-disc space-y-1">
              <li>
                The Advertiser agrees to pay applicable fees for posting ads, if
                any.
              </li>
              <li>No refunds will be provided once an ad is published.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-[#FED700] mb-2">
              5. Digital Signature
            </h3>
            <p className="ml-4">
              By signing digitally below, the Advertiser agrees to all terms and
              conditions stated in this Agreement.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <p className="text-[#FED700] font-medium">
                Seller Name:{" "}
                <span className="text-gray-300">{formData.sellerName}</span>
              </p>
              <p className="text-[#FED700] font-medium">
                Email: <span className="text-gray-300">{formData.email}</span>
              </p>
              <p className="text-[#FED700] font-medium">
                Date: <span className="text-gray-300">{formData.date}</span>
              </p>
            </div>
            <div className="mt-4">
              <p className="text-[#FED700] font-medium mb-2">
                Seller Signature:
              </p>
              <div className="border border-gray-600 p-2 rounded-md bg-white h-24">
                {formData?.signature && (
                  <img
                    src={
                      formData.signature.startsWith("data:image/")
                        ? formData.signature
                        : `${utils.BASE_URL_MEDIA}${formData.signature}`
                    }
                    alt="Signature"
                    className="h-full object-contain mx-auto"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[#FED700] font-medium">Buyer Name: ______</p>
              <p className="text-[#FED700] font-medium">Email: ______</p>
              <p className="text-[#FED700] font-medium">Date: ______</p>
            </div>
            <div className="mt-4">
              <p className="text-[#FED700] font-medium mb-2">
                Buyer Signature:
              </p>
              <div className="border border-gray-600 p-2 rounded-md bg-white h-24">
                {/* Empty space for buyer signature */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none transition"
        >
          Back to Agreement
        </button>
        {/* <button className="px-6 py-2 bg-[#FED700] text-black font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none transition">
          Confirm and Submit
        </button> */}
      </div>
    </div>
  );
};

export default DocumentPreview;
