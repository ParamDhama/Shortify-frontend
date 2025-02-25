import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import UrlCard from "./UrlCard";

function UrlList() {
  const [data, setData] = useState({ urls: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [itemDelete, setItemDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

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
        setData(res.data || { urls: [] });
      } catch (error) {
        setError("⚠️ Failed to fetch URLs. Please try again.");
        console.error("Error fetching URLs:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [itemDelete]);

  const handleDeleteUrl = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this URL?")) return;

    try {
      await apiClient.delete(endpoints.url.DELETE_URL(slug));
      setItemDelete(!itemDelete);
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4">
      <h2 className="text-xl font-bold mb-4">Your Shortened URLs</h2>

      {/* Show Loading Indicator */}
      {loading && <p className="text-center text-gray-500">🔄 Loading URLs...</p>}

      {/* Show Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Show No URLs Message */}
      {!loading && data?.urls?.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-500"
        >
          ⚠️ No URLs found. Start shortening your links now!
        </motion.p>
      )}

      {/* Display URL Cards */}
      <div className="">
        {data?.urls?.map((url, index) => (
          <UrlCard key={index} url={url} index={index} handleDeleteUrl={handleDeleteUrl} />
        ))}
      </div>
    </div>
  );
}

export default UrlList;
