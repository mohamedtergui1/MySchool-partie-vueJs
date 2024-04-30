import { defineStore } from "pinia";
 
export const progressStore = defineStore("progressStore", {
  id: "progressStore",
  state: () => ({
    progress: false,
   
  }),
  
});
