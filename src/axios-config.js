import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost/api",
  timeout: 10000,
});

// Interceptor to attach the Bearer token to every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
