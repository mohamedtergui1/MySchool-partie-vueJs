import { defineStore } from "pinia";
import instance from "@/axios-config.js";
import router from "@/router";


export const promosStore = defineStore("promoStore", {
    state: () => ({
        promos: [],
    }),
    actions: {
        async getPromos() {
            try{
            const response = await instance.get("/promos")
                console.log(response)
            } catch (err) {
                console.log(err)
            }
        }
    }
    


})