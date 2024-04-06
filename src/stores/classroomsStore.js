import { defineStore } from "pinia";
import instance from "@/axios-config.js";
// import router from "@/router";

export const classroomStore = defineStore("classroomStore", {
  id: "classroomStore",
  state: () => ({
    classroom: {
      id: null,
      name: "",
    },
    classrooms: {},
    allResponse: {},
    idDeleteclassroom: null,
    isShowModalDelete: false,
    loader: false,
    isShowModal: false,
  }),
  getters: {
    getclassroomById: function (state) {
      return function (ID) {
        return state.classrooms.find((obj) => obj.id === ID);
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
    async getclassrooms() {
      try {
        const response = await instance.get("/admin/classrooms");
        this.allResponse = response.data;
        this.classrooms = this.allResponse.data.data;
        console.log(this.classrooms);
        return this.allResponse;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteclassroom() {
      this.loader = true;
      try {
        const response = await instance.delete(
          "/admin/classrooms/" + this.idDeleteclassroom
        );
        let tmp = this.classrooms;
        if (response.status === 200) {
          for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].id === this.idDeleteclassroom) {
              tmp.splice(i, 1);
              break;
            }
          }
          this.classrooms = tmp;
          this.idDeleteclassroom = null;
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
      console.log(this.classroom);

      if (this.classroom.id) {
        // update
        try {
          const response = await instance.put(
            "/admin/classrooms/" + this.classroom.id,
            this.classroom
          );
          let tmp = this.classrooms;
          if (response.status === 200) {
            for (let i = 0; i < tmp.length; i++) {
              if (tmp[i].id === this.classroom.id) {
                tmp[i] = this.classroom;
                break;
              }
            }
            this.classrooms = tmp;
            this.classroom = {
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
          const response = await instance.post("/admin/classrooms", this.classroom);
          this.classrooms.unshift(response.data.data);
          this.classroom = {
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
