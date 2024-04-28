import { defineStore } from "pinia";

export const errorsStore = defineStore("errorsStore", {
  id: "errorsStore",
  state: () => ({
      errors: {},
      status:false
  }),
});
