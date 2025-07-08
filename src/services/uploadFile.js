// utils/uploadFile.js

import { toast } from "react-toastify";
import { postData } from "./apiService"; // adjust to your project structure

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("files", file);

  try {
    const response = await postData("upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const url = Array.isArray(response) ? response[0]?.url : response?.url;

    if (!url) throw new Error("Upload failed: No URL returned");

    return url;
  } catch (error) {
    console.error("uploadFile error:", error);
    toast.error("Something went wrong while uploading"); // Let the caller handle this
  }
};
