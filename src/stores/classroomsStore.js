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
        console.log(response);
        this.classrooms = this.classrooms.map((t) => {
          if (t.id !== response.id) return t;
          else return response;
        });
        this.modalMangeStudents = false;
      } catch (err) {
        
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
        this.availableStudent = response.data;
      } catch (err) {
        
      } finally {
        this.loader = false;
      }
    },
    async getclassrooms() {
      try {
        const response = await instance.get("/admin/classrooms");
        console.log(response);  
        this.allResponse = response;
        this.classrooms = this.allResponse.data.data;

      } catch (err) {
        
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
         
      } finally {
        this.loader = false;
      }
    },
    async updateAndEdit() {
      

      if (this.classroom.id) {
        // update
        try {
          const response = await instance.put(
            "/admin/classrooms/" + this.classroom.id,
            this.classroom
          );
             this.classrooms = this.classrooms.map((t) => {
               if (t.id !== this.classroom.id) return t;
               else return response.data;
             });
               
            this.classroom = {
              id: null,
              name: "",
              teacher_id: "",
              grade_id: "",
              promo_id: "",
            };

            this.isShowModal = false;
           
          
        } catch (err) {
           
        } finally {
          this.loader = false;
        }
      } else {
        try {
          const response = await instance.post(
            "/admin/classrooms",
            this.classroom
          );
          this.classrooms.unshift(response.data);
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
          
        } finally {
          this.loader = false;
        }
      }
    },
  },
});
