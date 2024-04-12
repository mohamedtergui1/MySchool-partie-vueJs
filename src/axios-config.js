import axios from "axios";

// Access Vite environment variables through import.meta.env
const baseUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: `${baseUrl}/api`, // Ensure that VITE_API_URL ends with a trailing slash
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
