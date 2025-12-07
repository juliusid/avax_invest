import axios from "axios";

// Create a centralized axios instance
const api = axios.create({
  // Point this to your backend server URL
  baseURL: "http://localhost:5000/api",
  // CRITICAL: This allows cookies (accessToken) to be sent/received
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
