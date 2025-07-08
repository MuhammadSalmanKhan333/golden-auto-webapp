// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Switch } from "@headlessui/react";

// const SecurityTab = () => {
//   const [showPassword, setShowPassword] = useState({
//     current: false,
//     new: false,
//     confirm: false,
//   });

//   const [twoFAEnabled, setTwoFAEnabled] = useState(false);

//   return (
//     <div className="space-y-8">
//       {/* Change Password */}
//       <div>
//         <h3 className="text-xl font-bold mb-1">Change Password</h3>
//         <p className="text-gray-500 text-sm mb-4">
//           Changing your password will log you out of all your active sessions
//         </p>

//         <div className="bg-white p-4 rounded-md shadow space-y-4">
//           {[
//             { label: "Current Password", key: "current" },
//             { label: "New Password", key: "new" },
//             { label: "Confirm Password", key: "confirm" },
//           ].map(({ label, key }) => (
//             <div className="relative" key={key}>
//               <input
//                 type={showPassword[key] ? "text" : "password"}
//                 placeholder={label}
//                 className="w-full border rounded px-4 py-3 pr-12 text-sm"
//               />
//               <span
//                 className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//                 onClick={() =>
//                   setShowPassword((prev) => ({
//                     ...prev,
//                     [key]: !prev[key],
//                   }))
//                 }
//               >
//                 {showPassword[key] ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//           ))}

//           <div className="flex gap-4 justify-end mt-2">
//             <button className="border border-gray-300 px-5 py-2 rounded text-sm">
//               Discard
//             </button>
//             <button className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-semibold">
//               Save New Password
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Two-Factor Authentication */}
//       <div className="flex justify-between items-center bg-white p-4 rounded-md shadow">
//         <div>
//           <h4 className="font-semibold">Two - Factor Authentication</h4>
//         </div>
//         <Switch
//           checked={twoFAEnabled}
//           onChange={setTwoFAEnabled}
//           className={`${
//             twoFAEnabled ? "bg-blue-600" : "bg-gray-300"
//           } relative inline-flex h-[28px] w-[52px] shrink-0 cursor-pointer rounded-full transition-colors`}
//         >
//           <span
//             aria-hidden="true"
//             className={`${
//               twoFAEnabled ? "translate-x-6" : "translate-x-1"
//             } pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg transition`}
//           />
//         </Switch>
//       </div>

//       {/* Delete Account */}
//       <div className="bg-white p-4 rounded-md shadow space-y-3">
//         <h4 className="font-bold text-md text-red-600">Delete My Account</h4>
//         <p className="text-sm text-gray-500">
//           You can delete your account and all associated jobs here
//         </p>
//         <button className="bg-red-600 text-white py-2 px-6 rounded text-sm font-medium">
//           Delete Account
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SecurityTab;

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import { postData,deleteData } from "../services/apiService";
import { useDispatch,useSelector } from "react-redux";
const SecurityTab = () => {

    const authUser = useSelector((state) => state.auth.user);
  const loggedInUserId = authUser?.id;
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const toggleVisibility = (key) => {
    setShowPassword((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (form.newPassword !== form.confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await postData("auth/change-password", {
      data:
        {
             currentPassword: form.currentPassword,
        password: form.newPassword,
        passwordConfirmation:form.confirmPassword,
        }
      
      }, {
            headers: { "Content-Type": "application/json" },
          });

      if (response.success) {
        setMessage("Password changed successfully!");
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMessage(response.message || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Error changing password.");
    } finally {
      setLoading(false);
    }
  };


const handleDeleteAccount = async () => {
  const confirm = window.confirm("Are you sure you want to delete your account?");
  if (!confirm) return;

  try {
    setLoading(true);
    const response = await deleteData(`users/${loggedInUserId}`,{
            headers: { "Content-Type": "application/json" },
          });

console.log(loggedInUserId)
    if (response.success) {
      alert("Account deleted successfully.");
      // Optionally log out user or redirect
      window.location.href = "/login";
    } else {
      setMessage(response.message || "Failed to delete account.");
    }
  } catch (error) {
    setMessage(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-6 max-h-[530px] overflow-y-auto scrollbar-hide">
      {/* Change Password */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h4 className="text-xl font-bold text-[#FED700] mb-2">Change Password</h4>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            { label: "Current Password", key: "current", formKey: "currentPassword" },
            { label: "New Password", key: "new", formKey: "newPassword" },
            { label: "Confirm New Password", key: "confirm", formKey: "confirmPassword" },
          ].map(({ label, key, formKey }) => (
            <div key={key} className="relative">
              <label className="block text-sm font-semibold text-gray-700">
                {label}
              </label>
              <input
                type={showPassword[key] ? "text" : "password"}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md pr-10"
                placeholder={`Enter ${label.toLowerCase()}`}
                value={form[formKey]}
                onChange={(e) => handleChange(formKey, e.target.value)}
              />
              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={() => toggleVisibility(key)}
              >
                {showPassword[key] ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          ))}

          {message && (
            <p className="text-sm text-red-500 font-medium">{message}</p>
          )}

          <div className="flex gap-4 justify-end mt-6">
            <button
              type="button"
              onClick={() =>
                setForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
              }
              className="border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-800 cursor-pointer shadow transition duration-200 hover:bg-gray-100"
            >
              Discard
            </button>
            <button
        
              type="submit"
              disabled={loading}
              className="bg-[#FED700] font-semibold px-5 py-2 rounded-md text-sm cursor-pointer shadow transition duration-200 hover:bg-yellow-400 text-gray-800"
            >
              {loading ? "Saving..." : "Save New Password"}
            </button>
          </div>
        </form>
      </div>

      {/* Delete Account */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h4 className="text-md font-bold text-red-600 mb-2">Delete My Account</h4>
        <p className="text-sm text-gray-600 mb-4">
          You can delete your account and all associated jobs here
        </p>
        <div className="flex gap-4 justify-end">
          <button className="px-5 py-2 border border-gray-300 text-sm rounded-md cursor-pointer shadow transition duration-200 hover:bg-gray-100">
            Cancel
          </button>
        <button
  onClick={handleDeleteAccount}
  disabled={loading}
  className="px-5 py-2 bg-red-600 text-white text-sm rounded-md font-semibold cursor-pointer shadow transition duration-200 hover:bg-red-700"
>
  {loading ? "Deleting..." : "Delete Account"}
</button>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
