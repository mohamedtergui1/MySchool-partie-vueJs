import { defineStore } from "pinia";
import instance from "@/axios-config.js";

export const classroomDetails = defineStore("classroomDetails", {
  id: "classroomDetails",
  state: () => ({
    isShowModalDeleteLessons: false,
    isShowModalLesson: false,
    loader: false,
    students: [],
    lessons: [],
    exams: [],
    lesson: {
      id: null,
      name: null,
      description: null,
      course_file: null,
      classroom_id: null,
    },
  }),
  actions: {
    async fetchStudents(id) {
      try {
        const response = await instance.get(
          "/teacher/classroom/students/" + id
        );
        this.students = response;
      } catch (err) {
      } finally {
      }
    },
    async fetchLessons(id) {
      try {
        const response = await instance.get("/teacher/classroom/lessons/" + id);
        this.lessons = response;
      } catch (err) {
      } finally {
      }
    },
    async fetchExams(id) {
      try {
        const response = await instance.get("/teacher/classroom/exams/" + id);
        this.exams = response;
      } catch (err) {
      } finally {
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

          this.isShowModalLesson = false;
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

          this.isShowModalLesson = false;
          return true;
        } catch (err) {
          console.log(err);
        } finally {
          this.loader = false;
        }
      }
    },
    async deletelesson() {
      this.loader = true;
      try {
        const response = await instance.delete(
          "/teacher/Lessons/" + this.lesson.id
        );

        this.lessons = this.lessons.filter((t) => t.id !== this.lesson.id);

        this.lesson.id = null;
        this.isShowModalDeleteLessons = false;
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },
    async getexamClassroom(id) {
      try {
        const response = await instance.get("/teacher/examsClassroom/" + id);
         
        this.exams = response;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
