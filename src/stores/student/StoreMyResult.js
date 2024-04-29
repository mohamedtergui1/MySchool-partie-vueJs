import { defineStore } from "pinia";
import instance from "@/axios-config.js";

export const StoreMyResult = defineStore("StoreMyResult", {
  id: "StoreMyResult",
  state: () => ({
    results: {},
  }),

  actions: {
    async getResults(id) {
      try {
        const response = await instance.get("/student/getAllResults/"+id);
        console.log(response);
          this.results = response;
      } catch (err) {
          
      }
    }
  },
});
