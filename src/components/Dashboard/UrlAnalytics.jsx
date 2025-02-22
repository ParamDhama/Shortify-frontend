  import { useEffect, useState } from "react";
  import apiClient from "../../api/apiClient";
  import endpoints from "../../api/endpoints";
  import { jwtDecode } from "jwt-decode";

  function UrlAnalytics() {
    const [data, setData] = useState({ clicks: [] }); // ✅ Initialize `clicks` as an empty array

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

          const res = await apiClient.get(endpoints.click.GET_CLICKS);
          setData(res.data || { clicks: [] }); // ✅ Ensuring `clicks` is always an array
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };

      fetchData();
    }, []); // ✅ Removed `type, refresh`

    return (
      <div>
        <h2>URL Analytics</h2>
        <p>Total Clicks: {data?.totalClicks ?? 0}</p>

        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>URL ID</th>
              <th>IP Address</th>
              <th>Location</th>
              <th>Device</th>
              <th>Browser</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {data?.clicks?.length > 0 ? (
              data.clicks.map((click, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{click.urlId}</td>
                  <td>{click.ipAddress}</td>
                  <td>{click.location}</td>
                  <td>{click.device}</td>
                  <td>{click.browser}</td>
                  <td>{new Date(click.createdAt).toLocaleString()}</td>
                  <td>{new Date(click.updatedAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  export default UrlAnalytics;
