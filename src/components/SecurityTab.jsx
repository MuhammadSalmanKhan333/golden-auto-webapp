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

const SecurityTab = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const toggleVisibility = (key) => {
    setShowPassword((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6 max-h-[530px] overflow-y-auto">
      {/* Change Password */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h4 className="text-xl font-bold text-[#FED700] mb-2">
          Change Password
        </h4>
        {/* <p className="text-sm text-gray-500 mb-4">
          Changing your password will log you out of all your active sessions
        </p> */}
        <form className="space-y-4">
          {[
            { label: "Current Password", key: "current" },
            { label: "New Password", key: "new" },
            { label: "Confirm New Password", key: "confirm" },
          ].map(({ label, key }) => (
            <div key={key} className="relative">
              <label className="block text-sm font-semibold text-gray-700">
                {label}
              </label>
              <input
                type={showPassword[key] ? "text" : "password"}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md pr-10"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={() => toggleVisibility(key)}
              >
                {showPassword[key] ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          ))}

          <div className="flex gap-4 justify-end mt-6">
            <button
              type="button"
              className="border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-800 cursor-pointer shadow transition duration-200 hover:bg-gray-100"
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-[#FED700] font-semibold px-5 py-2 rounded-md text-sm cursor-pointer shadow transition duration-200 hover:bg-yellow-400 text-gray-800"
            >
              Save New Password
            </button>
          </div>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white p-5 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h4 className="text-md font-semibold text-gray-800">
            Two – Factor Authentication
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={twoFAEnabled}
            onChange={setTwoFAEnabled}
            className={`${
              twoFAEnabled ? "bg-blue-600" : "bg-gray-300"
            } relative inline-flex items-center h-[28px] w-[52px] shrink-0 cursor-pointer rounded-full transition-colors`}
          >
            <span
              aria-hidden="true"
              className={`${
                twoFAEnabled ? "translate-x-6" : "translate-x-1"
              } pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg transition`}
            />
          </Switch>
          <span className="text-sm text-gray-500 font-medium">
            {twoFAEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h4 className="text-md font-bold text-red-600 mb-2">
          Delete My Account
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          You can delete your account and all associated jobs here
        </p>
        <div className="flex gap-4 justify-end">
          <button className="px-5 py-2 border border-gray-300 text-sm rounded-md cursor-pointer shadow transition duration-200 hover:bg-gray-100">
            Cancel
          </button>
          <button className="px-5 py-2 bg-red-600 text-white text-sm rounded-md font-semibold cursor-pointer shadow transition duration-200 hover:bg-red-700">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
