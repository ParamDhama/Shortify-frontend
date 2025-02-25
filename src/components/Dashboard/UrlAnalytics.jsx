/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

function UrlAnalytics({ id }) {
  const [data, setData] = useState({ clicks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        const res = await apiClient.get(endpoints.click.GET_CLICKS(id));
        setData(res.data || { clicks: [] });
      } catch (error) {
        setError("⚠️ Failed to fetch analytics data. Please try again.");
        console.error("Error fetching analytics:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  // ✅ Corrected Clicks Over Time (Grouping by Date)
  const clicksByDate = data?.clicks?.reduce((acc, click) => {
    const date = new Date(click.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const lineChartData = {
    labels: Object.keys(clicksByDate || {}),
    datasets: [
      {
        label: "Clicks Over Time",
        data: Object.values(clicksByDate || {}),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // ✅ Device Usage
  const deviceStats = data?.clicks?.reduce((acc, click) => {
    acc[click.device] = (acc[click.device] || 0) + 1;
    return acc;
  }, {});

  const pieChartDataDevices = {
    labels: Object.keys(deviceStats || {}),
    datasets: [
      {
        data: Object.values(deviceStats || {}),
        backgroundColor: ["#f87171", "#facc15", "#34d399", "#60a5fa", "#a78bfa"],
      },
    ],
  };

  // ✅ Browser Usage
  const browserStats = data?.clicks?.reduce((acc, click) => {
    acc[click.browser] = (acc[click.browser] || 0) + 1;
    return acc;
  }, {});

  const pieChartDataBrowsers = {
    labels: Object.keys(browserStats || {}),
    datasets: [
      {
        data: Object.values(browserStats || {}),
        backgroundColor: ["#f87171", "#facc15", "#34d399", "#60a5fa", "#a78bfa"],
      },
    ],
  };

  // ✅ Location Analysis
  const locationStats = data?.clicks?.reduce((acc, click) => {
    acc[click.location] = (acc[click.location] || 0) + 1;
    return acc;
  }, {});

  const pieChartDataLocation = {
    labels: Object.keys(locationStats || {}),
    datasets: [
      {
        data: Object.values(locationStats || {}),
        backgroundColor: ["#f87171", "#facc15", "#34d399", "#60a5fa", "#a78bfa"],
      },
    ],
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">📊 URL Analytics</h2>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">🔄 Loading analytics...</p>}

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Analytics Content */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 w-full max-h-[70vh] overflow-auto"
        >
          {/* Total Clicks */}
          <p className="text-lg font-semibold text-center">
            🎯 Total Clicks: <span className="text-blue-600">{data?.totalClicks ?? 0}</span>
          </p>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {/* Clicks Over Time (Line Chart) */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-center font-semibold">📈 Clicks Over Time</h3>
              <Line data={lineChartData} />
            </div>

            {/* Device Usage (Pie Chart) */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-center font-semibold">📱 Device Usage</h3>
              <Pie data={pieChartDataDevices} />
            </div>

            {/* Browser Usage (Pie Chart) */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-center font-semibold">🌐 Browser Usage</h3>
              <Pie data={pieChartDataBrowsers} />
            </div>

            {/* Location Analysis (Pie Chart) */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-center font-semibold">📍 Clicks by Location</h3>
              <Pie data={pieChartDataLocation} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default UrlAnalytics;
