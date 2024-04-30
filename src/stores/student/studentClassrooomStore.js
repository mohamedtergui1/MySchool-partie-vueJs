import { defineStore } from "pinia";
import instance from "@/axios-config.js";

export const studentClassrooomStore = defineStore("studentClassrooomStore", {
  id: "studentClassrooomStore",
  state: () => ({
    classrooms: [],
  }),
  actions: {
    async fetchClassrooms() {
      try {
        const response = await instance.get("/student/classrooms");
        this.classrooms = response.classrooms;
      } catch (err) {}
    },
  },
});
