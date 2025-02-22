import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";
import { jwtDecode } from "jwt-decode";

function UserManagement() {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await apiClient.get(endpoints.admin.GET_USERS);
  //       setUsers(res.data || []);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

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
  
        const res = await apiClient.get(endpoints.admin.GET_USERS);
        
        if (res.data?.users) {
          setUsers(res.data.users); // ✅ Ensure only the `users` array is set
        } else {
          setUsers([]); // If no users found, set an empty array
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]); // Handle error by ensuring `users` stays an array
      }
    };
  
    fetchData();
  }, []);
  
  // Change User Role
  const changeUserRole = async (userId, newRole) => {
    try {
      await apiClient.put(endpoints.admin.PUT_ROLE, { userId, role: newRole });
      alert("User role updated");
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  // Ban/Unban User
  const toggleBanUser = async (userId) => {
    try {
      await apiClient.put(endpoints.admin.PUT_BAN(userId));
      alert("User status updated");
    } catch (error) {
      console.error("Error updating ban status:", error);
    }
  };

  // Delete User
  const deleteUser = async (userId) => {
    try {
      await apiClient.delete(endpoints.admin.DELETE_USER(userId));
      alert("User deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => changeUserRole(user.id, "admin")}>Make Admin</button>
                  <button onClick={() => toggleBanUser(user.id)}>
                    {user.isBanned ? "Unban" : "Ban"}
                  </button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
