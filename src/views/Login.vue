<template>
    <!-- <div class="p-2 md:m-24 m-4 rounded-xl  bg-gradient-to-r from-blue-500 to-green-500  ">
        <div class="min-h-screen  px-8 bg-slate-50 rounded-xl  flex justify-center gap-5 items-center ">
            <form @submit.prevent="login" class="lg:w-1/2  w-full flex flex-col gap-5 ">
                <div v-show="errors">
                    <fwb-alert v-for="(error, index) in errors" :key="index" closable icon="danger" type="danger">
                        {{ error[0] }}
                    </fwb-alert>
                </div>

                <fwb-input v-model="user.email" type="email" @blur="frontValidateEmail(user.email)"
                    placeholder="enter your email address" label="Email"
                    :validation-status="frontValidateEmail(user.email) ? 'success' : 'error'">

                    <template #validationMessage>
                        <span v-if="frontValidateEmail(user.email)">
                            Valid email address
                        </span>
                        <span v-else>
                            Please enter a valid email address
                        </span>
                    </template>

                </fwb-input>

                <fwb-input v-model="user.password" type="password" placeholder="***********" label="password"
                    validation-status="">
                    <template #validationMessage>
                        Please enter a valid password address
                    </template>
                </fwb-input>

                <fwb-button class="w-32" :loading="loading" gradient="green-blue" size="md">
                    login
                </fwb-button>
            </form>
            <div class="w-1/2 h-96 rounded-xl lg:block hidden"
                style="background-image: url('https://pennwatch.org/wp-content/uploads/2020/10/college-students-studying-together-in-a-library_Ht90h5Ari-scaled.jpg'); background-size: cover; background-position: center;">

            </div>

        </div>
    </div> -->
    <!-- source:https://codepen.io/owaiswiz/pen/jOPvEPB -->
    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div>
                    <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                        class="w-32 mx-auto" />
                </div>
                <div class="mt-12 flex flex-col items-center">
                    <h1 class="text-2xl xl:text-3xl font-extrabold">
                        Log-In
                    </h1>
                    <div class="w-full flex-1 mt-8">
                       

                      

                        <div class="mx-auto max-w-xs">
                            <fwb-input v-model="user.email" type="email" @blur="frontValidateEmail(user.email)"
                                placeholder="enter your email address" label="Email"
                                :validation-status="frontValidateEmail(user.email) ? 'success' : 'error'">

                                <template #validationMessage>
                                    <span v-if="frontValidateEmail(user.email)">
                                        Valid email address
                                    </span>
                                    <span v-else>
                                        Please enter a valid email address
                                    </span>
                                </template>

                            </fwb-input>
                            <fwb-input v-model="user.password" type="password" placeholder="***********"
                                label="password" validation-status="">
                                <template #validationMessage>
                                    Please enter a valid password address
                                </template>
                            </fwb-input>
                            <fwb-button class="w-32 mt-2 " :loading="loading" color="blue" size="md">
                                login
                            </fwb-button>
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
                </div>
            </div>
            <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
                <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                    style="background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { FwbInput, FwbButton, FwbAlert } from 'flowbite-vue'
import { useAuthStore } from "@/stores/authUser.js"
import { useRouter } from 'vue-router';
const loading = ref(false)
const message = ref('')
const errors = ref(null)

const user = reactive({
    email: "",
    password: ""
})
const router = useRouter();
const authStore = useAuthStore()
const login = async () => {
    if (user.email && user.password)
        try {
            loading.value = true;
            const response = await authStore.login(user);

            const { token, role } = response.data.authorization;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            authStore.user = response.data.user;
            authStore.token = token;
            authStore.role = role;

            switch (role) {
                case 1:
                    router.push("/dashboard");
                    break;
                case 2:
                    router.push("/teacher");
                    break;
                case 3:
                    router.push("/student");
                    break;
                default:
                    router.push("/");
            }




        } catch (error) {

            if (error.response.status === 401) {
                errors.value = {
                    error: ["your credential not matched  our record"]
                }
            } else if (error.response.status === 400 || error.response.status === 422) {
                errors.value = error.response.data.errors
            }

        } finally {
            loading.value = false;
        }
}
const frontValidateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

</script>
