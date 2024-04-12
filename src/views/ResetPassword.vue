<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
            <h1 class="text-center text-2xl font-bold mb-6">Forgot Password</h1>
            <form @submit.prevent="userAuthStore().resetPassword()">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="password">
                        password
                    </label>
                    <input v-model="userCredential.password"
                        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="Enter your password" />
                </div>

                <fwb-button :disabled="!isPasswordValid || loading" :loading="loading" class="w-full"
                    color="default">Reset
                    Password</fwb-button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed , onMounted } from "vue"
import { FwbButton } from 'flowbite-vue'
import { storeToRefs } from "pinia"
import { userAuthStore } from "@/stores/userAuthStore.js"

const { token, userCredential,  loading } = storeToRefs(userAuthStore());

const isPasswordValid = computed(() => {

    return userCredential.value.password.length >= 5;
});
onMounted(() => {
    token.value = useRoute().query.token
    userCredential.value.email = useRoute().query.email

});

</script>   

