import { useState } from "react";
import AdminDashboard from "../components/Admin/AdminDashboard";
import UserManagement from "../components/Admin/UserManagement";
import UrlManagement from "../components/Admin/UrlManagement";

function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard"); // Default view

  return (
    <div>
      <h1>Admin Panel</h1>

      {/* Navigation Bar */}
      <nav>
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveTab("users")}>User Management</button>
        <button onClick={() => setActiveTab("urls")}>URL Management</button>
      </nav>

      {/* Conditional Rendering Based on Active Tab */}
      <div>
        {activeTab === "dashboard" && <AdminDashboard />}
        {activeTab === "users" && <UserManagement />}
        {activeTab === "urls" && <UrlManagement />}
      </div>
    </div>
  );
}

export default AdminPage;
