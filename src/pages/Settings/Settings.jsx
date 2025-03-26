import React, { useState } from "react";
import { FaUser, FaFileInvoice, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import UserManagementTab from "../../components/UserManagementTab";
import CircularProgressBar from "../../components/CircularProgressBar";
import { FaChevronRight } from "react-icons/fa";
import { HiDocumentDownload } from "react-icons/hi";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
const tabs = [
  { id: "subscriptions", label: "Subscriptions", icon: <FaLock /> },
  { id: "invoice", label: "Invoice", icon: <HiDocumentDownload /> },
  {
    id: "user-management",
    label: "User Management",
    icon: <FaUser />,
  },
];

const contentData = {
  subscriptions: (
    <p className="text-gray-700 text-sm">Manage your subscriptions here.</p>
  ),
  invoice: (
    <p className="text-gray-700 text-sm">View and download your invoices.</p>
  ),
  "user-management": <UserManagementTab />,
};

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("user-management");
  return (
    <section className="bg-[#151F28] min-h-screen pt-20">
      <Navbar />
      <div className="px-5 sm:px-10 xl:px-20">
        <div className=" min-h-screen  flex max-w-[1200px] mx-auto p-6 mt-4">
          <div className="w-full">
            <h2 className="text-4xl font-semibold text-[#FED700] mb-4">
              Settings
            </h2>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full px-4 md:px-0">
              {/* Left Column - Slightly Smaller */}
              <div className="w-full md:w-[40%]">
                <div className="bg-[#FED700] text-white p-6 rounded-lg flex-row lg:flex-row flex md:flex-col  gap-6 text-center">
                  <div className="flex justify-center items-center">
                    <CircularProgressBar progress={85} />
                  </div>
                  <div className="flex flex-col gap-3 lg:justify-between">
                    <div>
                      <p className="text-xl font-bold text-[#000]">
                        Profile Information
                      </p>
                      <p className="text-sm text-[#000]">
                        Lorem ipsum dolor sit amet
                      </p>
                    </div>
                    <button className="bg-white text-[#2596be] cursor-pointer font-semibold py-3 px-4 rounded-md">
                      Complete your profile
                    </button>
                  </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-6 space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`w-full flex items-center justify-between p-3 rounded-md transition-all ${
                        activeTab === tab.id
                          ? "bg-[#FED700] text-[#000]"
                          : "text-white hover:bg-[#FED700] hover:text-[#000] opacity-80"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <div className="flex gap-6 items-center">
                        <span>{tab.icon}</span>
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
                className="w-full md:w-[55%] bg-[#F5F6FA] rounded-lg p-6 shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-extrabold text-[#000022] mb-4">
                  {tabs.find((tab) => tab.id === activeTab).label}
                </h3>
                {contentData[activeTab]}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default SettingsPage;
