/* eslint-disable react/prop-types */
import { FaChartBar } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";

function DashboardCard({ totalClicks, totalLinks }) {
  const stats = [
    { icon: <FaChartBar />, label: "Total Clicks", value: totalClicks },
    { icon: <IoLinkSharp />, label: "Total Links", value: totalLinks },
  ];
  return (
    <div className="md:flex  items-center bg-white md:px-3 md:rounded-lg shadow-md">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center space-x-2 p-3 ">
          <span className="bg-primary rounded-full text-white md:text-lg text-sm md:p-3 p-1">{stat.icon}</span>
          <div className="md:px-3 max-md:flex space-x-2">
            <p className="text-sm text-gray-600">{stat.label}:</p>
            <p className="text-sm font-bold text-gray-800">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCard;

