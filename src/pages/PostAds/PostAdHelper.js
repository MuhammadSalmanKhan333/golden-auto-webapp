// Helper function to generate vehicle payload
export const generateVehiclePayload = (
  vehicleData, // From component state
  addressData, // From component state
  agreementData, // From component state
  uploadedMediaUrls, // Collected in onFinish
  relativeUrl, // Signature URL from upload
  categoryData // { category, subCategory }
) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const postedBy = userData?.id;

  return {
    data: {
      name: categoryData.name || "Not Provided",
      description: categoryData.description || " ",
      price: categoryData.price || " ",
      category: {
        category: categoryData.category.id || "",
        sub_category: categoryData.subCategory.id || "",
      },
      brand: {
        brand: categoryData.manufacturer.id || "",
        model: categoryData.model.id || "",
      },
      posted_by: postedBy,
      location: {
        Latitude: addressData.lat || "",
        Longitude: addressData.lng || "",
        Address: addressData.location || "",
      },
      information: {
        interior_color: vehicleData.interiorColor || "",
        exterior_color: vehicleData.exteriorColor || "",
        seat: vehicleData.seats || 4,
      },
      year: vehicleData.year || " ",
      kilometer: vehicleData.mileage || " ",
      condition: vehicleData.condition || " ",
      body_type: vehicleData.bodyType || " ",
      feul_type: vehicleData.fuelType || " ",
      availability: "Available",
      transmission: vehicleData.transmission || " ",
      picture: {
        picture: uploadedMediaUrls, // ✅ Injected from onFinish
      },
      agreement: {
        contract: relativeUrl || "", // Signature URL
        seller: agreementData.sellerName,
      },
    },
  };
};
