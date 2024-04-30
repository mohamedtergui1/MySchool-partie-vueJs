import { defineStore } from "pinia";
import instance from "@/axios-config.js";
// import router from "@/router";

export const resultStore = defineStore("resultStore", {
  id: "resultStore",
  state: () => ({
    exam: {
      id: null,
      title: "",
      date: "",
    },
    exams: [],
    allResponse: [],
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
    initialValues: function (state) {
      return {
        id: null,
        title: "",
        date: "",
      };
    },
  },
  actions: {
    async getexams(id) {
      try {
        const response = await instance.get("/teacher/examsClassroom/" + id);

        this.exams = response;
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
          notes: this.studentWithResult.map((t) => [t.id, t.note]),
        });

        this.exams = this.exams.map((t) => {
          if (t.id !== this.exam.id) return t;
          else {
            this.exam.corrected = true;
            return this.exam;
          }
        });
        this.mangeNoteModal = false;
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },
    async getStudentExams(id) {
        try {
          const response = await instance.get("/student/examsClassroom/" + id);

          this.exams = response;
          console.log(response);
        } catch (err) {
          console.log(err);
        }
    },
  },
});
