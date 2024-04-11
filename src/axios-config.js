import axios from "axios";
console.log(import.meta.env);


const baseUrl = import.meta.env.APP_API_URL;

console.log(baseUrl);
const instance = axios.create({
  baseURL: baseUrl+"/api",
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
