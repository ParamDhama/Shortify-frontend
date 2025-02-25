import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaSignOutAlt, FaPalette, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";

const Setting = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [expanded, setExpanded] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Apply selected theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle dropdown
  const toggleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      await apiClient.post(endpoints.auth.CHANGE_PASS, {
        oldPassword:currentPassword,
        newPassword,
      });

      setMessage("✅ Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("❌ Failed to change password.");
    }
  };

  // Toggle password visibility
  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="h-full  p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>

      {/* Theme Selection Dropdown */}
      <div className="border-b">
        <button
          onClick={() => toggleExpand("theme")}
          className="w-full flex justify-between items-center p-4 text-lg font-medium text-gray-800 hover:bg-gray-100"
        >
          <span className="flex items-center gap-2">
            <FaPalette />
            Change Theme
          </span>
          {expanded === "theme" ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {expanded === "theme" && (
          <div className="p-4">
            <button
              className={`px-4 py-2 mr-2 rounded-md ${theme === "light" ? "bg-gray-200" : "bg-gray-100"}`}
              onClick={() => setTheme("light")}
            >
              Light Mode
            </button>
            <button
              className={`px-4 py-2 rounded-md ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-500 text-white"}`}
              onClick={() => setTheme("dark")}
            >
              Dark Mode
            </button>
          </div>
        )}
      </div>

      {/* Change Password Dropdown */}
      <div className="border-b">
        <button
          onClick={() => toggleExpand("password")}
          className="w-full flex justify-between items-center p-4 text-lg font-medium text-gray-800 hover:bg-gray-100"
        >
          <span className="flex items-center gap-2">
            <FaLock />
            Change Password
          </span>
          {expanded === "password" ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {expanded === "password" && (
          <div className="p-4">
            <form onSubmit={handlePasswordChange} className="space-y-4">
              {/* Current Password */}
              <div className="relative">
                <input
                  type={showPassword.current ? "text" : "password"}
                  placeholder="Current Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                  onClick={() => toggleShowPassword("current")}
                >
                  {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* New Password */}
              <div className="relative">
                <input
                  type={showPassword.new ? "text" : "password"}
                  placeholder="New Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                  onClick={() => toggleShowPassword("new")}
                >
                  {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm New Password */}
              <div className="relative">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                  onClick={() => toggleShowPassword("confirm")}
                >
                  {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
              >
                Change Password
              </button>
            </form>
            {message && <p className="mt-2 text-sm">{message}</p>}
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div>
        <button
          className="w-full flex justify-between items-center p-4 text-lg font-medium text-red-600 hover:bg-gray-100"
          onClick={handleLogout}
        >
          <span className="flex items-center gap-2">
            <FaSignOutAlt />
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Setting;
