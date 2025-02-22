import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";
import { jwtDecode } from "jwt-decode";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [deletedUrls, setDeletedUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const expiryDate = new Date(decodedToken.exp * 1000);
          if (expiryDate > new Date()) {
            apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
          } else {
            localStorage.removeItem("token");
          }
        }

        // Fetch Users
        const usersRes = await apiClient.get(endpoints.admin.GET_USERS);
        setUsers(usersRes.data || []);

        // Fetch Clicks
        const clicksRes = await apiClient.get(endpoints.admin.GET_CLICKS);
        setClicks(clicksRes.data.totalClicks || 0);

        // Fetch Deleted URLs
        const deletedRes = await apiClient.get(endpoints.admin.GET_SOFT_DELETES);
        setDeletedUrls(deletedRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Total Users: {users.length}</p>
      <p>Total Clicks: {clicks}</p>
      <p>Soft Deleted URLs: {deletedUrls.length}</p>
    </div>
  );
}

export default AdminDashboard;
