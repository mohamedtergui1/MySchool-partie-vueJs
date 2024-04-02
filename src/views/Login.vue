<template>
    <div class="p-2 md:m-24 m-4 rounded-xl  bg-gradient-to-r from-blue-500 to-green-500  ">
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
                case "admin":
                    router.push("/dashboard");
                    break;
                case "teacher":
                    router.push("/teacher");
                    break;
                case "student":
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
