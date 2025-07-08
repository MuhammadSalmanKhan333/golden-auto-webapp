import React, { useState, useEffect } from "react";
import Stepper from "../../components/ui/Stepper";
import CategoryStep from "../../components/CategoryStep";
import { FaArrowLeft } from "react-icons/fa";
import AddressStep from "../../components/AddressStep";
import VehicleInfoStep from "../../components/VehicleInfoStep";
import PaymentMethodStep from "../../components/PaymentMethodStep";
import AgreementStep from "../../components/AgreementStep";
import { fetchData, postData, putData } from "../../services/apiService"; // Adjust the import path as necessary
import { generateVehiclePayload } from "./PostAdHelper";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import utils from "../../utils/utils";
import { uploadFile } from "../../services/uploadFile";
import { FiLoader } from "react-icons/fi";

const steps = [
  "Basic Info",
  "Address Details",
  "Vehicle Info",
  "Payment",
  "Agreement",
];

const PostAds = ({ editMode = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { id } = useParams();
  const [documentId, setDocumentId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({
    category: null,
    subCategory: null,
    manufacturer: null,
    model: null,
    name: "",
    price: "",
    description: "",
  });
  const [showError, setShowError] = useState(false);

  const updateCategoryData = (field, value) => {
    setCategoryData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [addressData, setAddressData] = useState({
    location: "",
    lat: null,
    lng: null,
    state: "",
    streetAddress: "",
    city: "",
  });

  const [addressErrors, setAddressErrors] = useState({
    location: "",
    state: "",
    streetAddress: "",
    city: "",
  });

  const [vehicleErrors, setVehicleErrors] = useState({});
  const [vehicleData, setVehicleData] = useState({
    vin: "",
    year: "",
    fuelType: "",
    transmission: "",
    mileage: "",
    interiorColor: "",
    exteriorColor: "",
    condition: "",
    titleStatus: "",
    bodyType: "",
    media: [],
  });

  const [agreementData, setAgreementData] = useState({
    sellerName: "",
    email: "",
    date: "",
    signature: null,
  });

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length;

  useEffect(() => {
    if (
      categoryData.category &&
      categoryData.subCategory &&
      categoryData.manufacturer &&
      categoryData.model &&
      categoryData.name &&
      categoryData.price &&
      categoryData.description
    ) {
      setShowError(false);
    }
  }, [
    categoryData.category,
    categoryData.subCategory,
    categoryData.manufacturer,
    categoryData.model,
    categoryData.name,
    categoryData.price,
    categoryData.description,
  ]);

  const validateVehicleStep = () => {
    const fieldMessages = {
      vin: "VIN field is required",
      year: "Please select a year",
      fuelType: "Please select a fuel type",
      transmission: "Please select a transmission type",
      mileage: "Mileage is required",
      interiorColor: "Please select an interior color",
      exteriorColor: "Please select an exterior color",
      condition: "Please select the vehicle condition",
      titleStatus: "Please select the title status",
      bodyType: "Please select a body type",
    };

    const newErrors = {};
    let isValid = true;

    Object.keys(fieldMessages).forEach((field) => {
      if (!vehicleData[field]) {
        newErrors[field] = fieldMessages[field];
        isValid = false;
      }
    });

    if (!vehicleData.media || vehicleData.media.length < 3) {
      newErrors.media = "Please upload at least 3 photos or videos.";
      isValid = false;
    }
    setVehicleErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    setShowError(false);
    setAddressErrors({ location: "", state: "", streetAddress: "", city: "" }); // Clear old errors

    if (currentStep === 1) {
      const {
        category,
        subCategory,
        manufacturer,
        model,
        name,
        price,
        description,
      } = categoryData;
      if (
        !category ||
        !subCategory ||
        !manufacturer ||
        !model ||
        !name ||
        !price ||
        !description
      ) {
        setShowError(true);
        return;
      }
    }

    if (currentStep === 2) {
      const errors = {};
      if (!addressData.location) errors.location = "Please enter your location";
      if (!addressData.state)
        errors.state = "Please select a state from the dropdown";
      if (!addressData.streetAddress)
        errors.streetAddress = "Please enter your street address";
      if (!addressData.city)
        errors.city = "Please select a city from the dropdown.";

      if (Object.keys(errors).length > 0) {
        setAddressErrors(errors);
        return; // Stop moving to next step
      }
    }

    if (currentStep === 3) {
      const isValid = validateVehicleStep();
      if (!isValid) return; // Stop moving to next step
    }

    setCurrentStep((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchAdData = async () => {
      if (editMode && id) {
        console.log("🚀 ~ fetchAdData ~ editMode:", editMode, id);
        try {
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
          const result = response?.data[0] || [];
          console.log("🚀 ~ fetchAdData ~ result:", result);
          setDocumentId(result.documentId);

          setCategoryData({
            category: {
              id: result.category.category.id,
              name: result.category.category.name,
            },
            subCategory: {
              id: result.category.sub_category.id,
              name: result.category.sub_category.name,
            },
            manufacturer: {
              id: result.brand.brand.id,
              name: result.brand.brand.name,
            },
            model: {
              id: result.brand.model.id,
              name: result.brand.model.name,
            },
            name: result.name || "",
            price: result.price || "",
            description: result.description || "",
          });

          setAddressData({
            location: result.location.Address,
            lat: result.location.Latitude,
            lng: result.location.Longitude,
            state: "", // not present
            streetAddress: "", // not present
            city: "", // not present
          });

          setVehicleData({
            vin: result.vin,
            year: result.year,
            fuelType: result.feul_type,
            transmission: result.transmission,
            mileage: result.kilometer,
            interiorColor: result.information.interior_color,
            exteriorColor: result.information.exterior_color,
            condition: result.condition,
            titleStatus: "", // ← this key doesn't exist in the response; handle as optional
            bodyType: result.body_type,
            media: result.picture.picture.map((url, index) => ({
              url: `${utils.BASE_URL_MEDIA}${url}`,
              name: `media-${index}`,
              type: url.includes(".mp4") ? "video" : "image",
            })),
          });

          setAgreementData({
            sellerName: result.agreement.seller,
            email: result.posted_by.email,
            date: new Date(result.createdAt).toISOString().split("T")[0],
            signature: `${utils.BASE_URL_MEDIA}${result.agreement.contract}`,
          });
        } catch (err) {
          console.error("Failed to fetch ad:", err);
        }
      }
    };

    fetchAdData();
  }, [editMode, id]);

  // console.log(documentId);

  const onFinish = async () => {
    setIsSubmitting(true);
    const { sellerName, signature } = agreementData;

    // ✅ Validate agreement section
    if (!sellerName || !signature) {
      toast.error("Please complete the agreement section");
      return;
    }

    const uploadedMediaUrls = [];

    // ✅ Upload media (images/videos)
    if (vehicleData.media?.length > 0) {
      for (const media of vehicleData.media) {
        try {
          const response = await fetch(media.url);
          const blob = await response.blob();
          const file = new File([blob], media.name, {
            type: media.type === "image" ? "image/jpeg" : "video/mp4",
          });

          const url = await uploadFile(file);
          uploadedMediaUrls.push(url);
        } catch (error) {
          toast.error(
            "One or more media files failed to upload. Please try again."
          );
          return;
        }
      }
    }

    // ✅ Upload signature
    let signatureUrl = signature;

    if (signature.startsWith("data:image/")) {
      try {
        const blob = await (await fetch(signature)).blob();
        const file = new File([blob], `signature-${Date.now()}.png`, {
          type: "image/png",
        });

        signatureUrl = await uploadFile(file);
        console.log("🚀 ~ onFinish ~ signatureUrl:", signatureUrl);
      } catch (error) {
        toast.error("Signature upload failed. Please try again.");
        return;
      }
    }

    // ✅ Construct payload using latest signature URL
    const payload = generateVehiclePayload(
      vehicleData,
      addressData,
      { ...agreementData, signature: signatureUrl },
      uploadedMediaUrls,
      signatureUrl,
      categoryData
    );

    console.log("🚀 Final Payload:", payload);

    // ✅ Submit payload
    try {
      let result;
      if (editMode && documentId) {
        result = await putData(`vehicles/${documentId}`, payload);
        toast.success("Vehicle updated successfully!");
      } else {
        result = await postData("vehicles", payload);
        toast.success("Vehicle listed successfully!");
      }
      console.log("🚗 Submission Success:", result);
      navigate("/my-listings");
    } catch (error) {
      console.error("Vehicle submission failed:", error);
      toast.error("Vehicle submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#151F28] min-h-screen border border-gray-800">
      <div className="max-w-6xl mx-auto p-6 bg-gray-700 rounded-xl shadow-md my-12">
        <p className="text-sm text-gray-100 mb-2">
          Home &gt; <span className="text-[#FED700]">Post Ad</span>
        </p>
        <h1 className="text-3xl text-[#FED700] font-bold mb-6">Post Ad</h1>
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onBack={() => setCurrentStep((prev) => prev - 1)}
          onNext={() => setCurrentStep((prev) => prev + 1)}
          onFinish={() => alert("Finished")}
        />
        {/* Step Components */}
        {currentStep === 1 && (
          <CategoryStep
            categoryData={categoryData}
            setCategoryData={setCategoryData}
            updateCategoryData={updateCategoryData}
          />
        )}
        {currentStep === 2 && (
          <AddressStep
            addressData={addressData}
            setAddressData={setAddressData}
            addressErrors={addressErrors}
            setAddressErrors={setAddressErrors}
          />
        )}
        {currentStep === 3 && (
          <VehicleInfoStep
            vehicleData={vehicleData}
            setVehicleData={setVehicleData}
            manufacturer={categoryData.manufacturer.name}
            model={categoryData.model.name}
            errors={vehicleErrors}
            setErrors={setVehicleErrors}
          />
        )}

        {currentStep === 4 && <PaymentMethodStep />}
        {currentStep === 5 && (
          <AgreementStep
            agreementData={agreementData}
            setAgreementData={setAgreementData}
          />
        )}
        {/* Add other steps here as they are developed */}
        {showError && (
          <div className="mt-4 ml-3 text-red-400 font-medium">
            {currentStep === 1 &&
              "Please fill all the required fields in Category step"}
          </div>
        )}
        <div className="flex justify-between mt-8">
          {/* Back Button - Hidden on first step */}
          {!isFirstStep ? (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-6 py-2 bg-[#1c2331] hover:bg-[#1b1f2a] text-[#FED700] shadow-md font-semibold  rounded-lg transition cursor-pointer"
            >
              <FaArrowLeft className="inline-block mr-2" />
              Back
            </button>
          ) : (
            <div></div>
          )}

          {/* Continue / Finish Button */}
          {!isLastStep ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-[#FED700] cursor-pointer text-[#151F28] font-semibold hover:bg-yellow-400 rounded-lg shadow-md transition"
            >
              Continue
            </button>
          ) : (
            <button
              disabled={isSubmitting}
              onClick={onFinish}
              className="px-6 py-2 bg-green-600 cursor-pointer text-white font-semibold hover:bg-green-700 shadow-md rounded-lg transition"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <FiLoader className="animate-spin" size={18} />
                  Submitting...
                </span>
              ) : (
                "Finish ✔"
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostAds;
