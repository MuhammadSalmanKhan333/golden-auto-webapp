import { useEffect, useState } from "react";
import { FaChartBar, FaListAlt, FaUserTie } from "react-icons/fa";
import { fetchData } from "../services/apiService";

export default function BusinessDashboard() {
  const [user, setUser] = useState('');
  const [totalOrders, setTotalOrders] = useState(0);
 
  const [sum,setSum] = useState([])
  const [totalVehicles,setTotalVehicles] = useState(0)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch total orders based on user ID
  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.id) {
        try {
          const res = await fetchData(
            `purchases?populate=*&filters[seller][id]=${user.id}`
          );
          setTotalOrders(res?.data?.length || 0);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };
    const fetchVehiclles = async () => {
      if (user?.id) {
        try {
         const res = await fetchData(
  `vehicles?populate=*&filters[posted_by][id]=${user.id}&pagination[limit]=100`
);

          setTotalVehicles(res?.data?.length || 0);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };
const fetchEarnings = async () => {
  if (user?.id) {
    try {
      const res = await fetchData(
        `purchases?filters[seller][id]=${user.id}&pagination[limit]=100`
      );
      const total = res.data.reduce((sum, item) => {
        return sum + (item.amount || 0);
      }, 0);
      setSum(total);
      console.log("Total earnings:", total);

    } catch (error) {
      console.error("Failed to fetch earnings:", error);
    }
  }
};

    fetchOrders();
    fetchVehiclles();
    fetchEarnings();
  }, [user]);
   
  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <FaListAlt size={30} className="text-blue-500" />,
    },
    {
      title: "Total Vehicle",
      value: totalVehicles,
      icon: <FaChartBar size={30} className="text-green-500" />,
    },
    {
      title: "Total Earning",
      value: `$${sum}`,
      icon: <FaUserTie size={30} className="text-purple-500" />,
    },
  ];

  return (
    <section className="bg-[#151F28]">
      <div className="px-6 pt-8 max-w-[1200px] mx-auto min-h-screen">
        <h1 className="text-3xl font-bold mb-7 text-[#FED700]">
          Business Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-700 p-6 rounded-lg shadow-md flex items-center"
            >
              <div className="mr-4">{card.icon}</div>
              <div>
                <h2 className="text-lg font-semibold text-gray-300">
                  {card.title}
                </h2>
                <p className="text-xl font-bold text-[#FED700]">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
