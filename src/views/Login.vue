                           
<script setup>
import {   computed } from 'vue';
import { FwbInput, FwbButton, FwbAlert } from 'flowbite-vue'
import AppLogo from "@/components/AppLogo.vue"
import { storeToRefs } from "pinia";
import { userAuthStore } from "@/stores/userAuthStore.js"
const { loading, token, role, user, userCredential, errors } = storeToRefs(userAuthStore());
const isEmailValid = computed(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userCredential.value.email);
});
const isPasswordValid = computed(() => {
   
    return userCredential.value.password.length >= 5;
});
</script>

<template>

    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div class="flex justify-center pb-4">
                    <AppLogo />
                </div>
                <h1 class="text-2xl text-center xl:text-3xl font-extrabold">
                    Log-In
                </h1>
                <form @submit.prevent="userAuthStore().login()" class="mt-5 flex flex-col items-center">
                    <div v-show="errors">
                        <fwb-alert closable icon="danger" type="danger">
                            <div class="flex flex-col gap-2">
                                <li v-for="(error, index) in errors" :key="index">
                                    {{ error.isArray ? error[0] : error }}
                                </li>
                            </div>


                        </fwb-alert>
                    </div>
                    <div class="w-full flex-1 mt-8">
                        <div class="mx-auto flex flex-col gap-6 max-w-xs">
                            <fwb-input v-model="userCredential.email" type="email" placeholder="email@email.com"
                                label="Email"
                                :validation-status="userCredential.email.length < 4 ? '' : (isEmailValid ? 'success' : 'error')">
                                <template #validationMessage>
                                    <p v-if="!isEmailValid && userCredential.email">enter a valid email</p>
                                </template>
                            </fwb-input>

                            <fwb-input v-model="userCredential.password" type="password" placeholder="***********"
                                label="password"
                                :validation-status="userCredential.password.length < 4 ? '' : (isPasswordValid ? 'success' : 'error')">
                                <template v-if="!isPasswordValid && userCredential.password" #validationMessage>
                                    short password
                                </template>
                            </fwb-input>
                            <fwb-button class="w-32 mt-2 " :disabled="loading || !isEmailValid || !isPasswordValid"
                                :loading="loading" color="blue" size="md">
                                login
                            </fwb-button>
                            <div class="flex justify-start">
                                <p class="text-sm underline  italic " >
                                    <router-link :to="{ name:'forgotpassword'}">Forgot Password</router-link>
                                </p>
                            </div>


                            <p class="mt-6 text-xs text-gray-600 text-center">
                                I agree to abide by templatana's
                                <a href="#" class="border-b border-gray-500 border-dotted">
                                    Terms of Service
                                </a>
                                and its
                                <a href="#" class="border-b border-gray-500 border-dotted">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
                <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                    style="background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');">
                </div>
            </div>
        </div>
    </div>
</template>


