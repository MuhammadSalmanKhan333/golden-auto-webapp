import React, { useState } from "react";
import {
  FaUser,
  FaList,
  FaLock,
  FaHeart,
  FaShieldAlt,
  FaClock,
  FaShoppingBag,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import UserManagementTab from "../../components/UserManagementTab";
import CircularProgressBar from "../../components/CircularProgressBar";
import SecurityTab from "../../components/SecurityTab";
import ProfileTab from "../../components/ProfileTab";
import { useSelector } from "react-redux";
// import { HiDocumentDownload } from "react-icons/hi";
const tabs = [
  { id: "my-profile", label: "My Profile", icon: <FaUser /> },
  { id: "my-listing", label: "My Listing", icon: <FaList /> },
  { id: "security", label: "Security", icon: <FaLock /> },
  // { id: "favorites", label: "Favorites", icon: <FaHeart /> },
  {
    id: "buyers-protection",
    label: "Buyers Protection Program",
    icon: <FaShieldAlt />,
  },
  // {
  //   id: "account-management",
  //   label: "Account Management",
  //   icon: <FaUsersCog />,
  // },
  {
    id: "scheduled-appointments",
    label: "Scheduled Appointments",
    icon: <FaClock />,
  },
  // { id: "my-orders", label: "My Orders", icon: <FaShoppingBag /> },
];

const contentData = {
  "my-profile": <ProfileTab  />,
  "my-listing": (
    <p className="text-gray-700 text-sm">View and edit your listings.</p>
  ),
  security: <SecurityTab />,
  favorites: (
    <p className="text-gray-700 text-sm">Your favorite items and sellers.</p>
  ),
  "buyers-protection": (
    <p className="text-gray-700 text-sm">Details about protection policies.</p>
  ),
  // "account-management": <UserManagementTab />,
  "scheduled-appointments": (
    <p className="text-gray-700 text-sm">View your scheduled appointments.</p>
  ),
  "my-orders": (
    <p className="text-gray-700 text-sm">Track your orders and history.</p>
  ),
};

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("security");
    const profileCompletion = useSelector(
    (state) => state.auth.profileCompletion
  );
  console.log(profileCompletion)
  return (
    <section className="bg-[#151F28] min-h-screen pt-6">
      <div className="px-5 sm:px-10 xl:px-12">
        <div className=" min-h-screen  flex max-w-[1200px] mx-auto mt-6">
          <div className="w-full">
            <h2 className="text-4xl font-semibold text-[#FED700] mb-4">
              Settings
            </h2>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full px-4 md:px-0">
              {/* Left Column - Slightly Smaller */}
              <div className="w-full md:w-[40%]">
                <div className="bg-[#FED700] text-white p-6 rounded-lg flex-row lg:flex-row flex md:flex-col  gap-6 text-center">
                  <div className="flex justify-center items-center">
                    <CircularProgressBar progress={profileCompletion} />
                  </div>
                  <div className="flex flex-col gap-3 lg:justify-between">
                    <div>
                      <p className="text-xl font-bold text-[#000]">
                        Profile Information
                      </p>
                      {/* <p className="text-sm text-[#000]">
                        Lorem ipsum dolor sit amet
                      </p> */}
                    </div>
                    <button   onClick={() => setActiveTab('my-profile')}
                    className="bg-white text-[#2596be] cursor-pointer font-semibold py-3 px-4 rounded-md">
                      Complete your profile
                    </button>
                  </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-6 space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`w-full flex items-center cursor-pointer border border-cyan-700 gap-5 justify-between p-3 rounded-md transition-all shadow-xl ${
                        activeTab === tab.id
                          ? "bg-[#FED700] text-[#000]"
                          : "text-white hover:bg-[#FED700] hover:text-[#000] opacity-80"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <div className="flex gap-5 items-center">
                        <span className="text-xl">{tab.icon}</span>
                        <span className="font-semibold">{tab.label}</span>
                      </div>
                      <FaChevronRight />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column - Slightly Larger */}
              <motion.div
                key={activeTab}
                className="w-full md:w-[60%] bg-[#F5F6FA] rounded-lg p-6 shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-extrabold text-gray-800 mb-4">
                  {tabs.find((tab) => tab.id === activeTab).label}
                </h3>
                {contentData[activeTab]}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
