import { defineStore } from "pinia";
import instance from "@/axios-config.js";
// import router from "@/router";

export const promoStore = defineStore("promoStore", {
  id: "promoStore",
  state: () => ({
    promo: {
      id: null,
      year: "",
      TheCurrent: true
    },
    promos: {},
    allResponse: {},
    idDeletePromo: null,
    isShowModalDelete: false,
    loader: false,
    isShowModal: false,
  }),
  getters: {
    getPromoById: function (state) {
      return function (ID) {
        return state.promos.find((obj) => obj.id === ID);
      };
    },
    intialValues: function (state) {
      return {
        id: null,
        year: "",
        TheCurrent: true,
      };
    },
  },
  actions: {
    async getPromos() {
      try {
        const response = await instance.get("/admin/promos");
        this.allResponse = response.data;
        this.promos = this.allResponse.data.data;
        console.log(this.promos);
        return this.allResponse;
      } catch (err) {
        console.log(err);
      }
    },
    async deletePromo() {
      this.loader = true;
      try {
        const response = await instance.delete(
          "/admin/promos/" + this.idDeletePromo
        );
        let tmp = this.promos;
        if (response.status === 200) {
          for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].id === this.idDeletePromo) {
              tmp.splice(i, 1);
              break;
            }
          }
          this.promos = tmp;
          this.idDeletePromo = null;
          this.isShowModalDelete = false;
          return true;
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },
    async updateAndEdit() {
      console.log(this.promo);

      if (this.promo.id) {
        // update
        try {
          const response = await instance.put(
            "/admin/promos/" + this.promo.id,
            this.promo
          );
          
          let tmp = this.promos;
          
            for (let i = 0; i < tmp.length; i++) {
              if (tmp[i].id === this.promo.id) {
                tmp[i] = response.data.data;
                break;
              }
          }
           this.promos =tmp;
            this.promo = {
              id: null,
              year: "",
              TheCurrent: true,
            };

            this.isShowModal = false;
            return true;
        } catch (err) {
          console.log(err);
        } finally {
          this.loader = false;
        }
      } else {
         try {
          const response = await instance.post(
            "/admin/promos",
            this.promo
          );
            this.promos.unshift(response.data.data);
            this.promo = {
              id: null,
              year: "",
              TheCurrent: true,
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
