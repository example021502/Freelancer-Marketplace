import axios from "axios";

// http://localhost:8080

const api = axios.create({ baseURL: "http://192.168.7.183:8080/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
