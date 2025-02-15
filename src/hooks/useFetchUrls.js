import { useEffect, useState } from "react";
import axios from "axios";

const useFetchUrls = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/url/user/urls")
      .then((res) => {
        setUrls(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { urls, loading };
};

export default useFetchUrls;
