import { defineStore } from "pinia";
import instance from "@/axios-config.js";
import router from "@/router"; // Import the router instance

export const studentsStore = defineStore("studentsStore", {
  state: () => ({
    students: [],
  }),
  actions: {
    async getStudents(page = 1) {
      try {
        const response = await instance.get("/admin/users?page=" + page);
        this.students = response.data.data.users.data;
        return response.data;
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            router.push("/login");
          } else if (status === 404) {
            router.push("/not-found");
          }
        }
        return Promise.reject(error);
      }
    },
    async deleteStudents(id) {
      try {
        const response = await instance.get("/admin/users/"+id);
        this.students = response.data.data.users.data;
        if (response.data.status) {
            students.value.splice(indexToRemove, 1);
          }
        return response.data;
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            router.push("/login");
          } else if (status === 404) {
            router.push("/not-found");
          }
        }
        return Promise.reject(error);
      }
    },
  },
});
