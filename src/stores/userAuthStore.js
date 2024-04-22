import { defineStore } from "pinia";
import instance from "@/axios-config.js";
import router from "@/router";

export const userAuthStore = defineStore("userAuthStore", {
  id: "userAuthStore",
  state: () => ({
    userCredential: {
      email: "",
      password: "",
    },
    user: JSON.parse(localStorage.getItem("user")) || null,
    role: parseInt(localStorage.getItem("role")) || null ,
    token: localStorage.getItem("token") || null,
    loading: false,
    errors: null,
  }),

  actions: {
    async login() {
      this.loading = true;
      try {
        const response = await instance.post("/login", this.userCredential);
        console.log(response);
        this.userCredential.password = "";
        this.userCredential.email = "";
        const { token, role } = response.authorization;

        this.token = token;
        this.role = role;
        this.user = response.user;
        await localStorage.setItem("token", token);
        await localStorage.setItem("role", role);
        await localStorage.setItem("user", JSON.stringify(response.user));
        this.errors = null;

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
        console.log(error);
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

        router.push("/login");
      }
    },
    async forgotPassword() {
      this.loading = true;
      try {
        const response = await instance.post(
          "/forgot-password",
          this.userCredential
        );
      } catch (error) {
        this.message = "Error sending reset link.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async resetPassword() {
      this.loading = true;

      try {
        const response = await instance.post(
          "/reset-password",
          Object.assign({}, this.userCredential, {
            token: this.token,
          })
        );
        this.userCredential.password = "";
        this.token = "";

        router.push("/login");
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
