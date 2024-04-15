import { defineStore } from "pinia";
import instance from "@/axios-config.js";
// import router from "@/router";

export const classroomStore = defineStore("classroomStore", {
  id: "classroomStore",
  state: () => ({
    classroom: {
      id: null,
      name: "",
      teacher_id: "",
      grade_id: "",
      promo_id: "",
    },
    classrooms: {},
    allResponse: {},
    idDeleteclassroom: null,
    isShowModalDelete: false,
    loader: false,
    isShowModal: false,
    modalMangeStudents: false,
    SelectedClass: [],
    availableStudent: [],
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
        teacher_id: "",
        grade_id: "",
        promo_id: "",
      };
    },
  },
  actions: {
    async syncStudents(id, students) {
      this.loader = true;
      try {
        const response = await instance.put("/admin/syncStudents/" + id, {
          student_ids: students,
        });
        console.log(response.data);
        this.classrooms = this.classrooms.map((t) => {
          if (t.id !== response.data.id) return t;
          else return response.data;
        });
        this.modalMangeStudents = false;
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },

    async getAvailableStudent(id) {
      this.loader = true;

      try {
        const response = await instance.get(
          "/admin/getAvailableStudents/" + id
        );
        console.log(response);
        this.availableStudent = response.data.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },
    async getclassrooms() {
      try {
        const response = await instance.get("/admin/classrooms");
        this.allResponse = response.data;
        this.classrooms = this.allResponse.data.data;
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

        if (response.status === 200) {
          this.classrooms = this.classrooms.filter(
            (t) => t.id !== this.idDeleteclassroom
          );

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
                tmp[i] = response.data.data;
                break;
              }
            }
            this.classrooms = tmp;
            this.classroom = {
              id: null,
              name: "",
              teacher_id: "",
              grade_id: "",
              promo_id: "",
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
          const response = await instance.post(
            "/admin/classrooms",
            this.classroom
          );
          this.classrooms.unshift(response.data.data);
          this.classroom = {
            id: null,
            name: "",
            teacher_id: "",
            grade_id: "",
            promo_id: "",
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
