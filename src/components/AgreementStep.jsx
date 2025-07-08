import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import DocumentPreview from "./DocumentPreview";

const AdAgreementForm = ({ agreementData, setAgreementData }) => {
  const [isSigned, setIsSigned] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [signatureError, setSignatureError] = useState("");
  const sigCanvas = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgreementData({ ...agreementData, [name]: value });
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setIsSigned(false);
    setSignatureError("");
    setAgreementData({ ...agreementData, signature: null });
  };

  const validateSignature = () => {
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      setSignatureError("Please provide your signature before proceeding");
      return false;
    }
    setSignatureError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateSignature()) return;
    setShowPreview(true);
  };

  console.log("🚀 ~ AdAgreementForm ~ agreementData:", agreementData);
  const handleBack = () => {
    setShowPreview(false);
  };

  if (showPreview) {
    return <DocumentPreview formData={agreementData} onBack={handleBack} />;
  }

  return (
    <div className="bg-[#1e212b] rounded-lg p-6 text-white shadow-md w-full mx-auto">
      <h1 className="text-2xl font-bold text-[#FED700] mb-6">Ad Agreement</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="sellerName"
              className="block text-md pl-1 font-medium text-[#FED700] mb-1"
            >
              Seller Name
            </label>
            <input
              type="text"
              id="sellerName"
              name="sellerName"
              placeholder="Enter your name"
              value={agreementData.sellerName}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#FED700]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-md pl-1 font-medium text-[#FED700] mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={agreementData.email}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#FED700]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-md pl-1 font-medium text-[#FED700] mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={agreementData.date}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-[#1F2937] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#FED700]"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-lg font-medium text-[#FED700] mb-2">
            Signature
          </label>
          <div className="border border-gray-600 bg-[#1F2937] rounded-md p-4 max-w-max">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 480,
                height: 200,
                className:
                  "signature-canvas bg-white border border-[#FED700] rounded",
              }}
              onEnd={() => {
                setIsSigned(true);
                setSignatureError("");

                // ✅ Save signature as soon as it’s written
                const canvas = sigCanvas.current.getCanvas();
                const base64Image = canvas.toDataURL("image/png");

                setAgreementData((prev) => ({
                  ...prev,
                  signature: base64Image,
                }));
              }}
            />

            {signatureError && (
              <p className="text-red-500 text-sm mt-2">{signatureError}</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={clearSignature}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition"
              >
                Clear Signature
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="px-6 py-2 bg-[#FED700] text-black font-semibold cursor-pointer rounded-lg hover:bg-yellow-500 focus:outline-none transition"
          >
            View Agreement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdAgreementForm;
