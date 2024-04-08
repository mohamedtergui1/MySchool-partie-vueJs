import { defineStore } from "pinia";
import instance from "@/axios-config.js";
import router from "@/router";
import { useToast } from "vue-toastification";
export const userAuthStore = defineStore("userAuthStore", {
  id: "userAuthStore",
  state: () => ({
    userCredential: {
      email: "",
      password: "",
    },
    user: JSON.parse(localStorage.getItem("user")) || null,
    role: localStorage.getItem("role") || "",
    token: localStorage.getItem("token") || "",
    loading: false,
    errors: null,
  }),

  actions: {
    async login() {
      this.loading = true;
      try {
        const response = await instance.post("/login", this.userCredential);
        this.userCredential.password = "";
        this.userCredential.email = "";
        const { token, role } = response.data.data.authorization;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        this.token = token;
        this.role = role;
        this.user = response.data.data.user;
        this.errors = null

          useToast().success("user login with success", {
            timeout: 2000,
          });
        switch (this.role) {
          case 1:
            router.push("/dashboard");
            break;
          case 2:
            router.push("/teacher");
            break;
          case 3:
            router.push("/student");
            break;
          default:
            router.push("/");
        }
      } catch (error) {
        this.userCredential.password = "";
        console.log(error);
        if (error.response.status === 422) {
         
          this.errors = error.response.data.errors;
        } else if (error.response.status === 401) {
          this.errors = {
            error: "your credentials not match our records try again",
          };
        }
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      this.loading = true;
      try {
        const response = await instance.post("/logout");
        if (response) {
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          localStorage.removeItem("token");
          this.user = null;
          this.token = null;
          this.role = null;
        }
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        this.user = null;
        this.token = null;
        this.role = null;
        throw error;
      } finally {
        this.loading = false;
         useToast().success("user logout with success", {
           timeout: 2000,
         });
        router.push("/login");
      }
    },
  },
});
