import { defineStore } from "pinia";
import instance from "@/axios-config.js";
// import router from "@/router";

export const gradeStore = defineStore("gradeStore", {
  id: "gradeStore",
  state: () => ({
    grade: {
      id: null,
      name: "",
    },
    grades: {},
    allResponse: {},
    idDeletegrade: null,
    isShowModalDelete: false,
    loader: false,
    isShowModal: false,
  }),
  getters: {
    getgradeById: function (state) {
      return function (ID) {
        return state.grades.find((obj) => obj.id === ID);
      };
    },
    intialValues: function (state) {
      return {
        id: null,
        name: "",
      };
    },
  },
  actions: {
    async getgradesWithoutPaginate() {
      try {
        const response = await instance.get("/admin/allgrades");
        
        this.grades = response.data.data;

      
      } catch (err) {
        console.log(err);
      }
    },
    async getgrades() {
      try {
        const response = await instance.get("/admin/grades");
        this.allResponse = response.data;
        this.grades = this.allResponse.data.data;

        return this.grades;
      } catch (err) {
        console.log(err);
      }
    },
    async deletegrade() {
      this.loader = true;
      try {
        const response = await instance.delete(
          "/admin/grades/" + this.idDeletegrade
        );

        if (response.status === 200) {
          this.grades = this.grades.filter((t) => t.id !== this.idDeletegrade);

          this.idDeletegrade = null;
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
      if (this.grade.id) {
        // update
        try {
          const response = await instance.put(
            "/admin/grades/" + this.grade.id,
            this.grade
          );

          if (response.status === 200) {
            this.grades = this.grades.map((t) => {
              if (t.id !== this.grade.id) return t;
              else return this.grade;
            });

            this.grade = {
              id: null,
              name: "",
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
          const response = await instance.post("/admin/grades", this.grade);
          this.grades.unshift(response.data.data);
          this.grade = {
            id: null,
            name: "",
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
