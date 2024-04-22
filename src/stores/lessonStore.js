import { defineStore } from "pinia";
import instance from "@/axios-config.js";
// import router from "@/router";

export const lessonStore = defineStore("lessonStore", {
  id: "lessonStore",
  state: () => ({
    lesson: {
      id: null,
      name: "",
      description: "",
      course_file: "",
      classroom_id : null,
    },
    lessons: {},
    allResponse: {},
    ClassroomsForLesson: {},
    idDeletelesson: null,
    isShowModalDelete: false,
    loader: false,
    isShowModal: false,
  }),
  getters: {
    getlessonById: function (state) {
      return function (ID) {
        return state.lessons.find((obj) => obj.id === ID);
      };
    },
    intialValues: function (state) {
  
      return {
        id: null,
        name: "",
        description: "",
        course_file: "",
        classroom_id: null,
      };
      
    },
    getterClassroomsForLesson: (state) => {
      const Classrooms = state.ClassroomsForLesson;
      return Classrooms.map((Classroom) => ({
        value: Classroom.id,
        name: Classroom.name,
      }));
    },
  },
  actions: {
    async getClassroomsForLesson(id = 1) {
      try {
        const response = await instance.get("/classrooms/lesson");

        this.ClassroomsForLesson = response;
      } catch (err) {
        console.log(err);
      }
    },
    async getlessons(id = 1) {
      try {
        const response = await instance.get("/teacher/Lessons?page=" + id);
        this.allResponse = response;
        this.lessons = this.allResponse.data;
        return this.lessons;
      } catch (err) {
        console.log(err);
      }
    },
    async deletelesson() {
      this.loader = true;
      try {
        const response = await instance.delete(
          "/teacher/Lessons/" + this.idDeletelesson
        );

        this.lessons = this.lessons.filter((t) => t.id !== this.idDeletelesson);

        this.idDeletelesson = null;
        this.isShowModalDelete = false;
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },
    async updateAndEdit() {
      if (this.lesson.id) {
        // update
        try {
          const response = await instance.put(
            "/teacher/Lessons/" + this.lesson.id,
            this.lesson
          );

          this.lessons = this.lessons.map((t) => {
            if (t.id !== this.lesson.id) return t;
            else return this.lesson;
          });

          this.lesson = {
            id: null,
            name: "",
            description: "",
            course_file: "",
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
          const response = await instance.post("/teacher/Lessons", this.lesson);
          this.lessons.unshift(response);
          this.lesson = {
            id: null,
            name: "",
            description: "",
            course_file: "",
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
  },
});
