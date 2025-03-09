import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 10000,
  withCredentials: true, // Send cookies cross-origin
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from cookies
    const token = getCookie("nwl-token");
    const adminToken = getCookie("nwl-admin-token");

    if (adminToken) {
      config.headers["Authorization"] = `Bearer ${adminToken}`;
    } else if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;