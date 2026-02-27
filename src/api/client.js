import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create a centralized axios instance
const api = axios.create({
  // Point this to your backend server URL
  baseURL: API_URL,
  // CRITICAL: This allows cookies (accessToken) to be sent/received
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
