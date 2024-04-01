<template>
    <div class="p-2 md:m-24 m-4 rounded-xl  bg-gradient-to-r from-blue-500 to-green-500  ">
        <div class="min-h-screen  px-8 bg-slate-50 rounded-xl  flex justify-center gap-5 items-center ">
            <form class="lg:w-1/2  w-full flex flex-col gap-5 ">
                <fwb-input v-model="user.name" required placeholder="enter your name address" label="name"
                    validation-status="">
                    <template #validationMessage>
                        Please enter a valid name address
                    </template>
                </fwb-input>
                <fwb-input v-model="user.email" required placeholder="enter your email address" label="Email"
                    validation-status="">
                    <template #validationMessage>
                        Please enter a valid email address
                    </template>
                </fwb-input>
                <fwb-input v-model="user.password" required placeholder="enter your password address" label="password"
                    validation-status="">
                    <template #validationMessage>
                        Please enter a valid password address
                    </template>
                </fwb-input>

                <fwb-button class="w-32" :loading="loading" gradient="green-blue" size="md" @click="loading = !loading">
                    register
                </fwb-button>
            </form>
            <div class="w-1/2 h-96 rounded-xl lg:block hidden"
                style="background-image: url('https://pennwatch.org/wp-content/uploads/2020/10/college-students-studying-together-in-a-library_Ht90h5Ari-scaled.jpg'); background-size: cover; background-position: center;">

            </div>

        </div>
    </div>
</template>
<script setup>
import { ref,reactive } from 'vue'
import { FwbInput, FwbButton } from 'flowbite-vue'

const loading = ref(false)
const user = reactive({
    name :"",
    email: "",
    password: ""
})
</script>
