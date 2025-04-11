import { FaChartBar, FaListAlt, FaUserTie } from "react-icons/fa";

const cards = [
  {
    title: "Total Listings",
    value: "24",
    icon: <FaListAlt size={30} className="text-blue-500" />,
  },
  {
    title: "Active Listings",
    value: "18",
    icon: <FaChartBar size={30} className="text-green-500" />,
  },
  {
    title: "Account Type",
    value: "Business",
    icon: <FaUserTie size={30} className="text-purple-500" />,
  },
];

export default function BusinessDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Business Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex items-center"
          >
            <div className="mr-4">{card.icon}</div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                {card.title}
              </h2>
              <p className="text-xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
