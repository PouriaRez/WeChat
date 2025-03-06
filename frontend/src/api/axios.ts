import axios from "axios";

const API_URL = import.meta.env.SERVER_URL || "http://localhost:3000";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const errMessage = error.response.data.error;

      if (error.response.status === 401) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }

      console.error("Error: ", errMessage);

      return Promise.reject(error);
    }
  }
);

export default API;
