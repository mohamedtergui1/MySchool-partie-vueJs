import { defineStore } from "pinia";
import instance from "@/axios-config.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    message: null,
    role: localStorage.getItem("role") || "",
    token: localStorage.getItem("token") || "",
  }),
  getters: {
    getUser() {
      return this.user;
    },
    getMessage() {
      return this.message;
    },
    getRole() {
      return this.role;
    },
    getToken() {
      return this.token;
    },
  },
  actions: {
    async login(data) {
      try {
        const response = await instance.post("/login", data);

        return response.data;
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
    },
    async logout() {
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
      }
    },
    async refresh() {
      const response = await this.handleErrors(instance.post("/auth/refresh"));
      if (response) {
        console.log(response.data);
        const { access_token } = response.data;
        localStorage.setItem("token", access_token);
      }
    },
    async resetPassword(data) {
      await instance
        .post("/password/reset-password", data)
        .then((response) => {
          this.message = response.data.message;
          console.log(response);
        })
        .catch((err) => {
          if (err.response.status == 404) {
            router.push("/404");
          }
          if (err.response.status == 403) {
            router.push("/403");
          }
          console.log(err);
        });
    },
    async reset(data) {
      return await instance
        .post("/password/reset", data)
        .then((response) => {
          console.log(response);
          return response.status;
        })
        .catch((err) => {
          if (err.response.status == 404) {
            router.push("/404");
          }
          if (err.response.status == 403) {
            router.push("/403");
          }
          console.log(err);
        });
    },
  },
});
