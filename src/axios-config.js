import axios from "axios";
import { useToast } from "vue-toastification";
import { progressStore } from "@/stores/progressStore";
import { errorsStore } from "@/stores/errorsStore"; 
const baseUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: `${baseUrl}/api`,
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  progressStore().progress = true;
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    progressStore().progress = false;

    console.log(response);
    if (response.data.message) {
      useToast().success(response.data.message, {
        timeout: 2000,
      });
    }
    return response.data.data;
  },
  (error) => {
    progressStore().progress = false;
    console.log(error);
    if (error.response) {
      console.log(error);
      if (error.response.status === 401 && localStorage.getItem("token")) {
        localStorage.clear();
        window.location.href = "http://localhost:5174/login";
        if (localStorage.getItem("token")) {
        } else {
        }
      } else if (error.response.status === 403) {
        useToast().warning("you don t have permition to open this route", {
          timeout: 2000,
        });
      } else if (error.response.status === 422) {
        errorsStore().status = true
        errorsStore().errors = error.response.data;
        console.log(error.response.data);
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
