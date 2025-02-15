import { useState } from "react";
import axios from "axios";

const useShortenUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const shortenUrl = async (originalUrl) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/url/shorten", { originalUrl });
      setLoading(false);
      return res.data.shortUrl;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return { shortenUrl, loading, error };
};

export default useShortenUrl;
