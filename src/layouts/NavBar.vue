<template>
    <div class="mt-4">
        <fwb-navbar>
            <template #logo>
                <AppLogo />
            </template>
            <template #default="{ isShowMenu }">
                <fwb-navbar-collapse :is-show-menu="isShowMenu">
                    <fwb-navbar-link @click="routeName = 'home'" :is-active="routeName === 'home'">
                        <router-link :to="{ name: 'home' }" exact>Home</router-link>
                    </fwb-navbar-link>

                    <fwb-navbar-link @click="routeName = 'about'" :is-active="routeName === 'about'">
                        <router-link :to="{ name: 'about' }" exact>About</router-link>
                    </fwb-navbar-link>


                    <fwb-navbar-link>
                        <router-link :to="{ name: 'contact' }" exact>Contact</router-link>
                    </fwb-navbar-link>
                </fwb-navbar-collapse>
            </template>
            <template #right-side>
                <div v-if="user" class="flex items-center gap-2">
                    <router-link :to="{ name: 'dashboard' }" > <span class="border  px-4 py-2 ">
                        dashboard
                    </span></router-link>
                   
                    <fwb-button color="alternative">
                        {{ user.username }}
                    </fwb-button>

                    <fwb-button :loading="loading" :disabled="loading" @click="userAuthStore().logout()">
                        logout
                    </fwb-button>
                </div>
                <div v-else class="flex gap-2">


                    <router-link :to="{ name: 'login' }"><span class="px-2 py-1 border rounded ">Login
                        </span></router-link>



                    

                </div>


            </template>
        </fwb-navbar>
    </div>
</template>

<script setup>
import router from '@/router'
import { useRoute } from 'vue-router'
import AppLogo from '@/components/AppLogo.vue'
import {
    FwbButton,
    FwbNavbar,
    FwbNavbarCollapse,
    FwbNavbarLink
    
} from 'flowbite-vue'
import { storeToRefs } from "pinia";
import { userAuthStore } from "@/stores/userAuthStore.js"
    
const { token, role, user, loading } = storeToRefs(userAuthStore());
 
</script>
