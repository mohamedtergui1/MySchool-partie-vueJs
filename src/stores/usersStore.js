import { defineStore } from "pinia";
import instance from "@/axios-config.js";
// import router from "@/router";
import { gradeStore } from "./gradesStore";

export const userStore = defineStore("userStore", {
  id: "userStore",
  state: () => ({
    user: {
      id: null,
      username: "",
      email: "",

      firstName: "",
      lastName: "",
      grade_id: "",
      address: "",
      number_phone: "",
      date_d_inscription: "",
      role_id: "",
    },
    users: {},
    allResponse: {},
    idDeleteuser: null,
    isShowModalDelete: false,
    loader: false,
    isShowModal: false,
    gradeStoreState: gradeStore(),
  }),
  getters: {
    getuserById: function (state) {
      return function (ID) {
        return state.users.find((obj) => obj.id === ID);
      };
    },
    intialValues: function (state) {
      return {
        id: null,
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        grade_id: "",
        address: "",
        number_phone: "",
        date_d_inscription: "",
        role_id: "",
      };
    },
    getGrades: (state) => {
      const grades = state.gradeStoreState.grades;

      return grades.map((grade) => ({
        value: grade.id,
        name: grade.name,
      }));
    },
  },
  actions: {
    async getusers() {
      await this.gradeStoreState.getgradesWithoutPaginate();

      try {
        const response = await instance.get("/admin/users");
        this.allResponse = response.data;
        this.users = this.allResponse.data.data;
        console.log(response);
        return this.users;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteuser() {
      this.loader = true;
      try {
        const response = await instance.delete(
          "/admin/users/" + this.idDeleteuser
        );

        if (response.status === 200) {
          this.users = this.users.filter((t) => t.id !== this.idDeleteuser);

          this.idDeleteuser = null;
          this.isShowModalDelete = false;
          return true;
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },
    async updateAndEdit() {
      if (this.user.id) {
        // update
        try {
          const response = await instance.put(
            "/admin/users/" + this.user.id,
            this.user
          );

          if (response.status === 200) {
            this.users = this.users.map((t) => {
              if (t.id !== this.user.id) return t;
              else return response.data.data;
            });

            this.user = {
              id: null,
              username: "",
              email: "",
              firstName: "",
              lastName: "",
              grade_id: "",
              address: "",
              number_phone: "",
              date_d_inscription: "",
              role_id: "",
            };

            this.isShowModal = false;
            return true;
          }
        } catch (err) {
          console.log(err);
        } finally {
          this.loader = false;
        }
      } else {
        try {
          const response = await instance.post("/admin/users", this.user);
          this.users.unshift(response.data.data);
          this.user = {
            id: null,
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            grade_id: "",
            address: "",
            number_phone: "",
            date_d_inscription: "",
            role_id: "",
          };

          this.isShowModal = false;
          return true;
        } catch (err) {
          console.log(err);
        } finally {
          this.loader = false;
        }
      }
    },
  },
});
