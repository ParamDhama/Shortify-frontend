import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";
import { jwtDecode } from "jwt-decode";

function UrlList() {
  const [data, setData] = useState({ urls: [] }); // ✅ Initialize `urls` as an empty array
  const [itemDelete, setItemDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodeToken = jwtDecode(token);
          const expiryDate = new Date(decodeToken.exp * 1000);
          const currentDate = new Date();

          if (expiryDate > currentDate) {
            apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
          } else {
            localStorage.removeItem("token");
          }
        }

        const res = await apiClient.get(endpoints.url.GET_URLS);
        setData(res.data || { clicks: [] }); // ✅ Ensuring `clicks` is always an array
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [itemDelete]); // ✅ Removed `type, refresh`

  const handleDeleteUrl = async (slug) => {
    try {
      await apiClient.delete(endpoints.url.DELETE_URL(slug));
      setItemDelete(!itemDelete);
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  return (
    <div>
      <h2>URL List</h2>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Original URL</th>
            <th>Slug</th>
            <th>Clicks</th>
            <th>Created At</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* ✅ Ensure `data.urls` exists before using `.map()` */}
          {data?.urls?.length > 0 ? (
            data.urls.map((url, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{url.originalUrl}</td>
                <td>{url.slug}</td>
                <td>{url.clicks}</td>
                <td>{new Date(url.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDeleteUrl(url.slug)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No URLs available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UrlList;
