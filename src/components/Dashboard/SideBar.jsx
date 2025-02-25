import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaLink,  FaCog, FaBars, FaTimes } from "react-icons/fa";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Dashboard", path: "/user/dashboard", icon: <FaTachometerAlt /> },
    { name: "Manage Links", path: "/user/dashboard/links", icon: <FaLink /> },
    { name: "Settings", path: "/user/dashboard/settings", icon: <FaCog /> },
    
  ];

  


  return (
    <div className="md:bg-white md:w-64 max-md:fixed max-md:shadow z-50">
      {/* Mobile Sidebar Toggle Button */}
      <div className="h-14 flex items-center z-50 justify-between max-md:w-screen bg-white px-4 mb-2">
        {/* Logo */}
        <h2 className="text-xl font-bold ">Short<span className="text-green-600">Ify</span></h2>
      <button
        className="md:hidden fixed top-4 right-4  text-gray-900 p-2 rounded-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes className="text-sm" /> : <FaBars className="text-sm" />}
      </button>
      </div>

      {/* Sidebar Container */}
      <div
        className={`fixed md:relative top-0 left-0 z-0 md:h-full bg-white max-md:shadow text-gray-900 max-md:w-screen p-3 transition-all duration-400 ${
          isOpen ? "translate-y-14" : "-translate-y-full md:translate-y-0"
        }`}
      >
        <div>
        {/* Sidebar Menu */}
        <ul className="space-y-2 ">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 font-bold rounded-lg transition ${
                  location.pathname === item.path ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
