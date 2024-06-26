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
    getGrades: (state) => {
      const grades = state.grades;
      if (Array.isArray(grades)){
        return grades.map((grade) => ({
          value: grade.id,
          name: grade.name,
        }));
      }
      return []
    },
  },
  actions: {
    async getgradesWithoutPaginate() {
      try {
        const response = await instance.get("/admin/allgrades");

        this.grades = response;
      } catch (err) {
        console.log(err);
      }
    },
    async getgrades(id=1) {
      try {
        const response = await instance.get("/admin/grades?page=" + id);
        this.allResponse = response;
        this.grades = this.allResponse.data;
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

      
          this.grades = this.grades.filter((t) => t.id !== this.idDeletegrade);

          this.idDeletegrade = null;
          this.isShowModalDelete = false;
           
        
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

          
            this.grades = this.grades.map((t) => {
              if (t.id !== this.grade.id) return t;
              else return this.grade;
            });

            this.grade = {
              id: null,
              name: "",
            };

            this.isShowModal = false;
           
        } catch (err) {
          console.log(err);
        } finally {
          this.loader = false;
        }
      } else {
        try {
          const response = await instance.post("/admin/grades", this.grade);
          this.grades.unshift(response);
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
