import { defineStore } from "pinia";
import instance from "@/axios-config.js";
// import router from "@/router";

export const examStore = defineStore("examStore", {
  id: "examStore",
  state: () => ({
    exam: {
      id: null,
      title: "",
      date: "",
      classroom_id: null,
    },
    exams: {},
    allResponse: {},
    ClassroomsForexam: {},
    idDeleteexam: null,
    isShowModalDelete: false,
    loader: false,
    isShowModal: false,
    studentWithResult: null,
    mangeNoteModal: false,
  }),
  getters: {
    getexamById: function (state) {
      return function (ID) {
        return state.exams.find((obj) => obj.id === ID);
      };
    },
    intialValues: function (state) {
      return {
        id: null,
        title: "",
        date: "",
        classroom_id: null,
      };
    },
    getterClassroomsForexam: (state) => {
      const Classrooms = state.ClassroomsForexam;
      return Classrooms.map((Classroom) => ({
        value: Classroom.id,
        name: Classroom.name,
      }));
    },
  },
  actions: {
    async getClassroomsForexam(id = 1) {
      try {
        const response = await instance.get("/classrooms/lesson");
        this.ClassroomsForexam = response;
      } catch (err) {
        console.log(err);
      }
    },
    async getexams(id = 1) {
      try {
        const response = await instance.get("/teacher/exams?page=" + id);
        this.allResponse = response;
        this.exams = this.allResponse.data;
        return this.exams;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteexam() {
      this.loader = true;
      try {
        const response = await instance.delete(
          "/teacher/exams/" + this.idDeleteexam
        );

        this.exams = this.exams.filter((t) => t.id !== this.idDeleteexam);

        this.idDeleteexam = null;
        this.isShowModalDelete = false;
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },
    async updateAndEdit() {
      if (this.exam.id) {
        // update
        try {
          const response = await instance.put(
            "/teacher/exams/" + this.exam.id,
            this.exam
          );

          this.exams = this.exams.map((t) => {
            if (t.id !== this.exam.id) return t;
            else return this.exam;
          });

          this.exam = {
            id: null,
            title: "",
            date: "",
            classroom_id: null,
          };

          this.isShowModal = false;
        } catch (err) {
          console.log(err);
        } finally {
          this.loader = false;
        }
      } else {
        try {
          const response = await instance.post("/teacher/exams", this.exam);
          this.exams.unshift(response);
          this.exam = {
            id: null,
            title: "",
            date: "",
            classroom_id: null,
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
    async getStudentWithResult() {
      try {
        const response = await instance.get(
          "/teacher/resultexam/" + this.exam.id
        );
        console.log(response);
        this.studentWithResult = response;
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },
    async updateExamNote() {
      this.loader = true;
      try {
        console.log();
        const response = await instance.post("/teacher/updateResult", {
          notes: this.studentWithResult.map((t) => [t.id, t.note])
        });
        this.mangeNoteModal = false
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },
    async getexamClassroom(id) {
      try {
         
        const response = await instance.get("/teacher/examsClassroom/"+id);
        this.allResponse = {};
        this.exams = response;
         
      } catch (err) {
        console.log(err);
      }
    }
  },
});
