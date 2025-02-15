import { useState, useEffect } from "react";
import axios from "axios";

const useClickAnalytics = (urlId) => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/clicks/${urlId}`)
      .then((res) => {
        setAnalytics(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [urlId]);

  return { analytics, loading };
};

export default useClickAnalytics;
