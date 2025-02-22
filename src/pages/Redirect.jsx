import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";

function Redirect() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true); // ✅ Set initial value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get(endpoints.url.REDIRECT(slug));
        if (res.data?.originalUrl) {
          window.location.href = res.data.originalUrl; // ✅ Redirect to original URL
        } else {
          console.error("No URL found for slug:", slug);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching redirect:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // ✅ Added dependency

  return (
    <div>
      {loading ? <p>Redirecting...</p> : <p>URL not found for slug: {slug}</p>}
    </div>
  );
}

export default Redirect;
