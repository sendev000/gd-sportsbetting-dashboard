import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = `${import.meta.env.VITE_WEB_SERVER_URL}/api`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Automatically attach token if available
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken"); // Get token from storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
