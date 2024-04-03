import { defineStore } from "pinia";

export const useAppAlertStore = defineStore("appAlert", {
  state: () => ({
    visibility: 0,
    code: 200,
    message: "this is a default alert message",
    link: "",
  }),
  getters: {
    getStatus: (state) => state.visibility,
    getCode: (state) => state.code,
    getMessage: (state) => state.message,
    getLink: (state) => state.link,
  },
  actions: {
    setCode(code) {
      this.code = code;
    },
    setLink(link) {
      this.link = link;
    },
    show(id, message) {
      (this.visibility = id), (this.message = message);
    },
    hide() {
      this.visibility = 0;
      this.link = "";
    },
  },
});
