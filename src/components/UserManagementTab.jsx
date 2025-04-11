import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const sections = [
  {
    id: "profile",
    title: "Profile",
    descriptions: "Name, Surname, Email address",
    content: (
      <div className="space-y-2">
        <input
          type="text"
          className="py-[9px] px-[17px] bg-[#fff] rounded-[5px] w-full"
          placeholder="First Name"
        />
        <br />
        <input
          type="text"
          className="py-[9px] px-[17px] bg-[#fff] rounded-[5px] w-full"
          placeholder="Last Name"
        />
        <br />
        <input
          type="email"
          className="py-[9px] px-[17px] bg-[#fff] rounded-[5px] w-full"
          placeholder="Email"
        />
        <br />
        <button className="bg-[#151F28] max-w-fit py-2 mt-[29px] mb-[34px] px-4 text-[#fff] rounded-md w-full">
          Connect Calendar
        </button>
      </div>
    ),
  },
  {
    id: "password",
    title: "Password",
    descriptions: "Your email address is dmataraci@gmail.com",
    content: (
      <p className="text-gray-600 text-sm">
        Your email address is dmataraci@gmail.com
      </p>
    ),
  },
  {
    id: "notifications",
    title: "Notifications",
    descriptions: "RateIt will send you notifications",
    content: (
      <p className="text-gray-600 text-sm">
        RateIt will send you notifications
      </p>
    ),
  },
  {
    id: "timezone",
    title: "Time zone",
    descriptions: "Your timezone is currently set to: Pacific Time (US)",
    content: (
      <p className="text-gray-600 text-sm">
        Your timezone is currently set to: Pacific Time (US)
      </p>
    ),
  },
  {
    id: "deactiveaccount",
    title: "Deactivate Account",
    descriptions: "Deactivate your account",
    content: (
      <p className="text-gray-600 text-sm">
        Are you sure you want to deactivate your account?
      </p>
    ),
    hasButton: true,
  },
];

const UserManagementTab = () => {
  const [openSection, setOpenSection] = useState("profile");

  return (
    <div className="max-h-[400px] overflow-y-auto pr-2">
      {sections.map((section) => {
        const isOpen = openSection === section.id;
        return (
          <div
            key={section.id}
            className="border-b-[1.5px] border-b-[#000022] pb-2 mb-2"
          >
            <div className="flex justify-between items-center w-full pt-2 pb-6">
              <div className="flex flex-col">
                <span className="text-start text-2xl font-bold text-[#000022]">
                  {section.title}
                </span>
                <span className="font-normal text-lg text-[#00002280]">
                  {section.descriptions}
                </span>
              </div>

              {/* Show Deactivate Button only for "Deactivate Account" */}
              {section.hasButton ? (
                <button className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded-[5px]">
                  Deactivate
                </button>
              ) : (
                // Show chevrons for other sections
                <button
                  onClick={() => setOpenSection(isOpen ? "" : section.id)}
                  className="focus:outline-none"
                >
                  {isOpen ? (
                    <FaChevronUp className="text-[#F5F6FA] bg-[#000022] rounded-full p-1 text-xl" />
                  ) : (
                    <FaChevronDown className="text-[#F5F6FA] bg-[#AAB2C8] rounded-full p-1 text-xl" />
                  )}
                </button>
              )}
            </div>

            {/* Show content only if it's open */}
            {section.hasButton || (
              <motion.div
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <div>{section.content}</div>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserManagementTab;
