import { defineStore } from "pinia";
import instance from "@/axios-config.js";  
import router from "@/router";

export const classroomMangeStore = defineStore("classroomMangeStore", {
  id: "classroomMangeStore",
  state: () => ({
    classrooms: null,
    lessons: null,
    exams: null,
    classroom: null,
    loading: false,
  }),
getters: {
  getById: (state) => (index) => {
    state.classroom = state.classrooms[index];
    state.loading = false
    router.push({ name: "ClassroomDetails" });
  },
},

  actions: {
    async fetchClassroomData() {
      try {
        const response = await instance.get("/teacher/classroom");
        this.classrooms = response;
      } catch (err) {
        console.error("Error fetching classroom data:", err);
      } finally {
      }
    },
  },
});
