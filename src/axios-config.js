import axios from "axios";
import { useToast } from "vue-toastification";

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

// Interceptor to handle response errors
instance.interceptors.response.use(
  (response) => {
    console.log(response)
    if (response.data.message) {
         useToast().success(response.data.message, {
           timeout: 2000,
         });
    }
    return response.data.data;
  },
  (error) => {
    console.log(error)
    if (error.response) {
      console.log(error);
      if (error.response.status === 401 && localStorage.getItem("token")) {
        localStorage.clear();
        window.location.href = "http://localhost:5174/login";
        if (localStorage.getItem("token")) {

        } else {
        }
      } else if (error.response.status === 403) {
        console.log("you don t have permition to open this route");
      }
    } else if (error.request) {
      console.log("Request error:", error.request);
    } else {
      console.log("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
