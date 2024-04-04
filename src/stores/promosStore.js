import { defineStore } from "pinia";
import instance from "@/axios-config.js";
// import router from "@/router";

export const promoStore = defineStore("promoStore", {
  state: () => ({
    promos: [],
    allResponse: [],
  }),
  getters: {
      getPromoById: (state) => (ID) => {
         
             for (let i = 0; i < this.promos.length; i++) {
               if (this.promos[i].id === id) {
                 
                 return this.promos[i];
               }
             }
           
            
      return {};
    },
  },
  actions: {
    async getPromos() {
      try {
        const response = await instance.get("/admin/promos");
        this.allResponse = response.data;
        this.promos = this.allResponse.data.data;
        return this.allResponse;
      } catch (err) {
        console.log(err);
      }
    },
    async deletePromo(id) {
      try {
        const response = await instance.delete("/admin/promos/" + id);
        let tmp = this.promos;
        if (response.status === 200) {
          for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].id === id) {
              tmp.splice(i, 1);
              break;
            }
          }
          this.promos = tmp;
          return true;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
