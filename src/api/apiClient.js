import axios from "axios";

const apiClient = axios.create({
  baseURL: "backendURL", // Replace with your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;