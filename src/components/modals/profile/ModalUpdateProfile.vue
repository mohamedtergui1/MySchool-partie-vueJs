                    
<script setup>
import {ref} from "vue"
import { userAuthStore } from "@/stores/userAuthStore";
import { storeToRefs } from "pinia";
 
import {
    FwbModal, FwbButton, FwbInput, FwbCheckbox, FwbSelect, FwbFileInput
} from 'flowbite-vue'  
const { user, isShowModal } = storeToRefs(userAuthStore())
const genres = ref([
    { value: 'man', name: 'man' },
    { value: 'woman', name: 'woman' },
])
 
</script>
<template>
    <fwb-button @click="isShowModal = !isShowModal" color="blue">
        edit
    </fwb-button>

    <fwb-modal v-if="isShowModal" @close="isShowModal = !isShowModal">
        <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
        </template>
        <template #body>
            <div class="flex justify-around">
                <div class="w-1/2 flex flex-col gap-2 px-2">
                    <fwb-input v-model="user.firstName" required placeholder="enter your first Name address"
                        label="first Name" validation-status="">
                        <template #validationMessage>
                            Please enter a valid first Name address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="user.username" required placeholder="enter your username address"
                        label="username" validation-status="">
                        <template #validationMessage>
                            Please enter a valid username address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="user.number_phone" required placeholder="enter number phone address"
                        label="number phone" validation-status="">
                        <template #validationMessage>
                            Please enter a valid email address
                        </template>
                    </fwb-input>

                    <fwb-select v-model="user.genre" :options="genres" label="Select a genre" />

                </div>
                <div class="w-1/2  flex flex-col gap-2 px-2 ">
                    <fwb-input v-model="user.lastName" required placeholder="enter your first Name address"
                        label="first Name" validation-status="">
                        <template #validationMessage>
                            Please enter a valid first Name address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="user.email" type="email" required placeholder="enter your email address"
                        label="Email" validation-status="">
                        <template #validationMessage>
                            Please enter a valid email address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="user.date_of_birth" required placeholder="enter date d'date of birth"
                        label="date d'inscription" type="date" validation-status="">
                        <template #validationMessage>
                            Please enter a valid date date of birth
                        </template>
                    </fwb-input>
                    <fwb-input v-model="user.address" required placeholder="enter address" label="address"
                        type="text" validation-status="">
                        <template #validationMessage>
                            Please enter a valid address
                        </template>
                    </fwb-input>


                </div>

            </div>

        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="isShowModal =  ! isShowModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="userStore().updateAndEdit()" :disabled="loader" :loading="loader" color="blue">
                    {{ user.id ? 'update' : 'add' }}
                </fwb-button>
            </div>
        </template>
    </fwb-modal>
</template>
 