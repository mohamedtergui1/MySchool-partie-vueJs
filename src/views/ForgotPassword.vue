                    
 <script setup>
import {computed} from "vue"
import { FwbButton } from 'flowbite-vue'
import { storeToRefs } from "pinia"
import { userAuthStore } from "@/stores/userAuthStore.js"
const { loading, userCredential } = storeToRefs(userAuthStore());
const isEmailValid = computed(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userCredential.value.email);
});
</script>
<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
            <h1 class="text-center text-2xl font-bold mb-6">Forgot Password</h1>
            <form @submit.prevent="userAuthStore().forgotPassword()">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="email">
                        Email Address
                    </label>
                    <input v-model="userCredential.email"
                        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" placeholder="Enter your email address" />
                </div>

                <fwb-button :disabled="!isEmailValid || loading" :loading="loading" class="w-full" color="default">Reset
                    Password</fwb-button>
            </form>
        </div>
    </div>
</template>
