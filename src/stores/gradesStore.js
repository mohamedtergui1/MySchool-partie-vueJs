import { defineStore } from "pinia";
import instance from "@/axios-config.js";
// import router from "@/router";

export const gradeStore = defineStore("gradeStore", {
  id: "gradeStore",
  state: () => ({
    grade: {
      id: null,
      name: ""
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
        name: ""
      };
    },
  },
  actions: {
    async getgrades() {
      try {
        const response = await instance.get("/admin/grades");
        this.allResponse = response.data;
        this.grades = this.allResponse.data.data;
        console.log(this.grades);
        return this.allResponse;
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
        let tmp = this.grades;
        if (response.status === 200) {
          for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].id === this.idDeletegrade) {
              tmp.splice(i, 1);
              break;
            }
          }
          this.grades = tmp;
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
      console.log(this.grade);

      if (this.grade.id) {
        // update
        try {
          const response = await instance.put(
            "/admin/grades/" + this.grade.id,
            this.grade
          );
          let tmp = this.grades;
          if (response.status === 200) {
            for (let i = 0; i < tmp.length; i++) {
              if (tmp[i].id === this.grade.id) {
                tmp[i] = this.grade;
                break;
              }
            }
            this.grades = tmp;
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
            name: "" 
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
