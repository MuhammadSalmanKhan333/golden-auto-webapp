import React, { useState } from "react";

export default function Billing() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const invoices = [
    {
      id: 1,
      name: "James Donovan",
      date: "Dec 10, 2019",
      time: "09:48",
      amount: 259.0,
      status: "Approved",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      name: "Mick Peter",
      date: "Dec 29, 2019",
      time: "10:53",
      amount: 200.0,
      status: "Pending",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      name: "Mila Shawn",
      date: "Jan 09, 2020",
      time: "09:10",
      amount: 200.0,
      status: "Postponed",
avatar: "https://i.pravatar.cc/40?img=2"
    },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-[#121f28] ">
      <div className="max-w-7xl mx-auto p-4 space-y-8 ">
        {/* Top Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          {/* Selected Card */}
<div className="relative bg-[#1b2936] p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2  text-[#ffd200] ">
                <span className="bg-[#fdd300] p-2 rounded-full">📇</span> Selected Card
              </h2>

              {/* Dropdown */}
              <div className="relative">
                <button onClick={toggleDropdown} className="text-2xl px-2 text-white">⋮</button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-[#121f28] border rounded border-[#6d7778] shadow w-40 z-10">
                    <ul className="text-sm text-white">
                      <li className="px-4 py-2 hover:bg-[#1b2936] cursor-pointer ">Add New Card</li>
                      <li className="px-4 py-2 hover:bg-[#1b2936] cursor-pointer">Change Card</li>
                      <li className="px-4 py-2 hover:bg-[#1b2936] cursor-pointer text-red-500">Delete Card</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 text-white">
              Lorem ipsum dolor sit amet, 
              consectetur sed diam nonumy eirmod tempor.
              consectetur sed diam nonumy eirmod tempor.
            </p>

            <div className="bg-gradient-to-br from-green-900 to-blue-900 text-white p-4 margin-letf-3 rounded-xl w-full max-w-xs">
              <div className="mb-4 text-sm">credit card</div>
              <div className="text-2xl tracking-widest">**** **** **** 3456</div>
              <div className="mt-2 flex justify-between text-sm">
                <span>0123</span>
                <span>22/01</span>
              </div>
              <div className="mt-4">Name surname</div>
              <div className="text-right text-xs">VISA</div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="p-4 rounded-lg shadow bg-[#1b2936] p-x-2" >
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-[#ffd200]">
              <span className="bg-[#fdd300] p-2 rounded-full">🧾</span> Billing Info
            </h2>
            <form className="space-y-4 spaca-x-2">
              <input
                type="text"
                placeholder="Full Name"
                // defaultValue="John Doe"
                className="w-full border rounded border-[#6d7778] p-2 bg-[#121f28] text-white"
              />
              <input
                type="text"
                placeholder="Address"
                // defaultValue="497 Evergreen Rd."
                className="w-full border rounded border-[#6d7778] p-2 bg-[#121f28] text-white"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="City"
                //   defaultValue="Roseville"
                  className="w-full border rounded border-[#6d7778] p-2 bg-[#121f28] text-white"
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                //   defaultValue="95673"
                  className="w-full border rounded border-[#6d7778] p-2 bg-[#121f28] text-white"
                />
              </div>
              <select className="w-full border rounded border-[#6d7778] p-2 bg-[#121f28] text-white">
                <option>United States</option>
                <option>Canada</option>
                <option>Pakistan</option>
              </select>
            </form>
          </div>
        </div>

        {/* Invoices Section */}
        <div className="bg-white shadow-md rounded-lg">
          {/* <div className="flex justify-between items-center px-4 py-2 border-b">
            <h3 className="text-xl font-semibold">Invoices</h3>
            <button className="text-sm text-gray-600 flex items-center gap-1">
              Filter <span>⚙️</span>
            </button>
          </div> */}

          <div className="overflow-x-auto">
            <table className="w-full text-left bg-[#1b2936] text-white">
              <thead className="bg-[#1b2936] text-white">
                <tr>
                  <th className="p-3 ">#</th>
                  <th className="p-3">Send to</th>
                  <th className="p-3">Issue Date</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-t border-[#6d7778]">
                    <td className="p-3 ">{invoice.id}</td>
                    <td className="p-3 flex items-center ">
                      <img
                        src={invoice.avatar}
                        alt={invoice.name}
                        className="w-8 h-8 rounded-full "
                      />
                      {invoice.name}
                    </td>
                    <td className="p-3 ">
                      {invoice.date}{" "}
                      <span className="text-xs ">at {invoice.time}</span>
                    </td>
                    <td className="p-3 font-semibold ">${invoice.amount.toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium  ${
                          invoice.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "Pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                        DOWNLOAD
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
