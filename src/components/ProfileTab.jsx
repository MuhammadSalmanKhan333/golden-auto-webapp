import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaCamera } from "react-icons/fa";
import ProfileImage from "../assets/images/profileImage.jpg";
import axios from "axios";
import utils from "../utils/utils";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector
import { setProfilecompletion } from "../features/authSlice";
import { toast } from "react-toastify";
import { postData, putData } from "../services/apiService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Profile = () => {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState();
  const [userName, setUserName] = useState("");
  const [userFname, setUserFname] = useState("");
  const [userLname, setUserLname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAccountType, setUserAccountType] = useState("");
  const [userContact, setUserContact] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [ntnNo, setNtnNo] = useState("");
  const fileInputRef = useRef(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get user ID from authSlice
  const authUser = useSelector((state) => state.auth.user);
  const loggedInUserId = authUser?.id;

  const handleImageUpload = useCallback(async (e) => {
    const file = e.target.files?.[0];
    setProfileImage(null);
    setUploadedImageUrl(null);

    if (file.size > 20 * 1024 * 1024) {
      toast.error("Image size must be under 20MB.");
      return;
    }

    if (file && file.type.startsWith("image/")) {
      // Display preview locally
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      console.log(file);

      try {
        const formData = new FormData();
        formData.append("files", file);

        const uploadResult = await postData("upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const resultUrl = Array.isArray(uploadResult)
          ? uploadResult[0]?.url
          : uploadResult?.url;
        // Save the URL for later use (e.g., in profile update)
        setUploadedImageUrl(resultUrl);
        console.log("Image uploaded:", resultUrl);
      } catch (error) {
        toast.error("Error uploading image:", error);
        setProfileImage(ProfileImage);
      }
    }
  }, []);
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const fetchUserDetails = async () => {
    if (loggedInUserId) {
      try {
        setLoading(true);
        const response = await axios.get(
          `${utils.BASE_URL}users/${loggedInUserId}`,
          {
            headers: {
              Authorization: `Bearer ${utils.token}`,
            },
          }
        );
        const userData = response.data;

        setProfileImage(userData.picture || ProfileImage);
        setUploadedImageUrl(userData.picture || null);
        setUserName(userData.username || "");
        setUserFname(userData.fname || "");
        setUserLname(userData.lname || "");
        setUserEmail(userData.email || "");
        setUserAccountType(userData.account_type || "");
        setUserContact(userData.contact || "");
        setRegistrationNo(userData.registration_no || "");
        setNtnNo(userData.ntn_no || "");

        // Calculate profile completeness
        let profileCompletion = 0;

        if (userData.picture) profileCompletion += 20;
        if (userData.contact) profileCompletion += 20;
        if (userData.email) profileCompletion += 20;
        if (userData.username) profileCompletion += 20;
        if (userData.fname) profileCompletion += 10;
        if (userData.lname) profileCompletion += 10;

        dispatch(setProfilecompletion(profileCompletion)); // <- You can use this state in your UI
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        toast.error("Failed to fetch user details. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      console.warn("User ID not found in auth state.");
      toast.error("User not logged in.");
    }
  };

  console.log("🚀 ~ uploadedImageUrl", uploadedImageUrl);
  const handleSaveChanges = useCallback(async () => {
    if (!loggedInUserId) {
      toast.error("User not logged in.");
      return;
    }

    const payload = {
      email: userEmail,
      username: userName,
      fname: userFname,
      lname: userLname,
      picture: uploadedImageUrl, // Use the uploaded URL
      contact: userContact,
      ...(userAccountType === "business" && {
        registration_no: registrationNo,
        ntn_no: ntnNo,
      }),
    };

    try {
      const response = await putData(`users/${loggedInUserId}`, payload);
      toast.success("Profile updated successfully!");
      await fetchUserDetails(); // Refetch latest data

      if (response && response.id && response.email) {
        localStorage.setItem("user", JSON.stringify(response));
        // dispatch(setUser(response)); // optional: sync Redux
      } else {
        console.warn("Unexpected update response", response);
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
      fetchUserDetails(); // Revert UI on error
    }
  }, [
    loggedInUserId,
    userEmail,
    userName,
    userFname,
    userLname,
    uploadedImageUrl,
    userContact,
    userAccountType,
    registrationNo,
    ntnNo,
  ]);
  useEffect(() => {
    fetchUserDetails();
  }, [loggedInUserId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mb-3">
      {/* Profile Picture */}
      <div className="flex flex-col items-center relative mb-8">
        {loading ? (
          <Skeleton circle={true} height={128} width={128} />
        ) : (
          <div className="relative w-32 h-32">
            <img
              src={
                profileImage?.startsWith("http") // Full image URL
                  ? profileImage
                  : profileImage?.startsWith("/uploads/") // Path from server
                  ? `${utils.BASE_URL_MEDIA}${profileImage}` // Add base URL
                  : profileImage || ProfileImage // Base64 OR fallback
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cover shadow-md border-4 border-yellow-400"
              onError={() => {
                if (profileImage !== ProfileImage) {
                  setProfileImage(ProfileImage); // Only set if not already set
                }
              }} // Fallback in case of image loading error
            />
            <button
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow hover:bg-gray-100 transition"
              title="Upload Profile Image"
            >
              <FaCamera className="text-gray-700 text-lg" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        )}
        <h2 className="text-xl font-bold text-[#FED700] mt-4">
          Profile Picture
        </h2>
      </div>

      {/* Form Fields */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Name
          </label>
          {loading ? (
            <Skeleton height={40} />
          ) : (
            <input
              type="text"
              placeholder="Enter name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            First Name
          </label>
          {loading ? (
            <Skeleton height={40} />
          ) : (
            <input
              type="text"
              placeholder="Enter first name"
              value={userFname}
              onChange={(e) => setUserFname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Last Name
          </label>
          {loading ? (
            <Skeleton height={40} />
          ) : (
            <input
              type="text"
              placeholder="Enter last name"
              value={userLname}
              onChange={(e) => setUserLname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Email
          </label>
          {loading ? (
            <Skeleton height={40} />
          ) : (
            <input
              type="email"
              placeholder="Enter email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              readOnly // Assuming email is not directly editable here
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Contact Number
          </label>
          {loading ? (
            <Skeleton height={40} />
          ) : (
            <input
              type="tel"
              placeholder="Enter contact number"
              value={userContact}
              onChange={(e) => setUserContact(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          )}
        </div>
        {userAccountType === "business" && (
          <>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Registration Number
              </label>
              {loading ? (
                <Skeleton height={40} />
              ) : (
                <input
                  type="text"
                  placeholder="Enter registration number"
                  value={registrationNo}
                  onChange={(e) => setRegistrationNo(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                NTN Number
              </label>
              {loading ? (
                <Skeleton height={40} />
              ) : (
                <input
                  type="text"
                  placeholder="Enter NTN number"
                  value={ntnNo}
                  onChange={(e) => setNtnNo(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              )}
            </div>
          </>
        )}
      </form>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSaveChanges}
          className="bg-[#FFD700] text-black font-semibold px-6 py-2 rounded-md hover:bg-yellow-400 transition cursor-pointer shadow-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
