import axios from "axios";

export const baseURL = "https://www.fitness-record.com/api";

export const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("[Request Failed]:", error);
  }
);
