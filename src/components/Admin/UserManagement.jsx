import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";

function UrlManagement() {
  const [urls, setUrls] = useState([]);
  const [userId, setUserId] = useState(""); // Store the user ID for filtering URLs
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserUrls(userId);
    }
  }, [userId]);

  // 🔹 Fetch URLs for a specific user
  const fetchUserUrls = async (id) => {
    try {
      setLoading(true);
      const res = await apiClient.get(endpoints.admin.GET_USER(id));
      setUrls(res.data || []);
    } catch (error) {
      console.error("Error fetching user URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Restore a soft-deleted URL
  const restoreUrl = async (urlId) => {
    try {
      await apiClient.put(endpoints.admin.PUT_RESTORE_URL, { urlId });
      alert("URL restored successfully!");
      fetchUserUrls(userId); // Refresh list after restoring
    } catch (error) {
      console.error("Error restoring URL:", error);
    }
  };

  // 🔹 Delete a URL permanently
  const deleteUrl = async (urlId) => {
    try {
      await apiClient.delete(endpoints.admin.DELETE_URL, { data: { urlId } });
      alert("URL deleted successfully!");
      fetchUserUrls(userId); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  return (
    <div>
      <h2>URL Management</h2>

      {/* Input for Admin to Enter User ID */}
      <div>
        <label>Enter User ID: </label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID..."
        />
        <button onClick={() => fetchUserUrls(userId)}>Fetch URLs</button>
      </div>

      {/* Loading Indicator */}
      {loading && <p>Loading URLs...</p>}

      {/* Table for Displaying URLs */}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.length > 0 ? (
            urls.map((url) => (
              <tr key={url.id}>
                <td>{url.id}</td>
                <td>
                  <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                    {url.shortUrl}
                  </a>
                </td>
                <td>{url.originalUrl}</td>
                <td>
                  <button onClick={() => restoreUrl(url.id)}>Restore</button>
                  <button onClick={() => deleteUrl(url.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No URLs available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UrlManagement;
