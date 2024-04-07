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
                        Pricing
                    </fwb-navbar-link>
                    <fwb-navbar-link>
                        Contact
                    </fwb-navbar-link>
                </fwb-navbar-collapse>
            </template>
            <template #right-side>
                <div v-if="user" class="flex gap-2">
                    <fwb-button color="alternative">
                        {{ user.username }}
                    </fwb-button>

                    <fwb-button :loading="active" @click="logout">
                        logout
                    </fwb-button>
                </div>
                <div v-else class="flex gap-2">
                  <router-link>  
                    <span class="px-2 py-1 border rounded ">
                       Login
                    </span>
                </router-link>
                <router-link>
                    <span class="px-2 py-1  border rounded ">
                        Register
                    </span>
                </router-link>
                </div>


            </template>
        </fwb-navbar>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from "@/stores/authUser.js"
import AppLogo from '@/components/AppLogo.vue'
import {
    FwbButton,
    FwbNavbar,
    FwbNavbarCollapse,
    FwbNavbarLink

} from 'flowbite-vue'
import router from '@/router'
const routeName = ref(useRoute().name)
const authStore = useAuthStore();
const active = ref(false);

const user = ref(authStore.getUser);
const logout = async () => {
    active.value = true;
    try {
        await authStore.logout();
        await router.push("/login");
    } catch (error) {
        console.error("Error while logging out:", error);
    } finally {
        active.value = false;
    }
};

watch(() => authStore.getUser, (newValue) => {
    user.value = newValue;
});

</script>
