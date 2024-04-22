import { defineStore } from "pinia";
import instance from "@/axios-config.js";
// import router from "@/router";

export const annonceStore = defineStore("annonceStore", {
  id: "annonceStore",
  state: () => ({
    annonce: {
      id: null,
      title: "",
      description: "",
    },
    annonces: {},
    allResponse: {},
    idDeleteannonce: null,
    isShowModalDelete: false,
    loader: false,
    isShowModal: false,
  }),
  getters: {
    getannonceById: function (state) {
      return function (ID) {
        return state.annonces.find((obj) => obj.id === ID);
      };
    },
    intialValues: function (state) {
      return {
        id: null,
        title: "",
        description: "",
      };
    },
    getterAnnonces: (state) => {
      const annonces = state.annonces;
      return annonces.map((annonce) => ({
        value: annonce.id,
        name: annonce.name,
      }));
    },
  },
  actions: {
    async getannonces(id = 1) {
      try {
        const response = await instance.get("/admin/annonces?page=" + id);
        this.allResponse = response;
        this.annonces = this.allResponse.data;
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteannonce() {
      this.loader = true;
      try {
        const response = await instance.delete(
          "/admin/annonces/" + this.idDeleteannonce
        );

        this.annonces = this.annonces.filter(
          (t) => t.id !== this.idDeleteannonce
        );

        this.idDeleteannonce = null;
        this.isShowModalDelete = false;
        return true;
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },
    async updateAndEdit() {
      if (this.annonce.id) {
        // update
        try {
          const response = await instance.put(
            "/admin/annonces/" + this.annonce.id,
            this.annonce
          );

          this.annonces = this.annonces.map((t) => {
            if (t.id !== this.annonce.id) return t;
            else return response;
          });

          this.annonce = {
            id: null,
            title: "",
            description: "",
          };

          this.isShowModal = false;
        } catch (err) {
          console.log(err);
        } finally {
          this.loader = false;
        }
      } else {
        try {
          const response = await instance.post("/admin/annonces", this.annonce);
          console.log(response);
          this.annonces.unshift(response);
          this.annonce = {
            id: null,
            title: "",
            description: "",
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
