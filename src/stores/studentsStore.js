import { defineStore } from "pinia";
import instance from "@/axios-config.js";
import router from "@/router";

export const studentsStore = defineStore(  {
  id: "studentsStore",
  state: () => ({
    students: [],
  }),

  getters: {
    // getObjectById: (state) => (id) => {
    //   for (let i = 0; i < state.students.data.length; i++) {
    //     const element = state.students.data[i];
    //     if (element.id === id) {
    //       console.log(element);
    //       return element;
    //     }
    //   }
    //   return {};
    // },
  },

  actions: {
    async getStudents(page = 1) {
      try {
        const response = await instance.get("/admin/users?page=" + page);
        this.students = response.data.data.users;
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
        const response = await instance.delete("/admin/users/" + id);
        console.log(response);
        let tmp = this.students.data;
        if (response.status === 200) {
          for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].id === id) {
              tmp.splice(i, 1);
              break;
            }
          }
        }
        this.students.data = tmp;

        return response;
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
    async addStudents(data) {
      try {
        const response = await instance.post("/admin/users", data);

        if (response.status === 201) {
          this.students.data.unshift(response.data.data);
        }
        return response;
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
    async updateStudent(data, id) {
      try {
        const response = await instance.put("/admin/users/" + id, data);
        console.log(response);
        let tmp = this.students.data;
        if (response.status === 200) {
          for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].id === id) {
              tmp[i] = response.data.data;
              break;
            }
          }
        }
        this.students.data = tmp;

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
