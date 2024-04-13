<script setup>
import {ref   } from 'vue'
import {
    FwbModal, FwbButton, FwbInput, FwbCheckbox, FwbSelect, FwbFileInput
} from 'flowbite-vue'
import { storeToRefs } from "pinia";
import { employeeStore } from '@/stores/employeeStore.js'
import { gradeStore } from '@/stores/gradesStore.js'
const { isShowModal, employee, loader } = storeToRefs(employeeStore());
const imageUrl = ref(null)
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        
        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl.value = e.target.result;
            employee.image = file;
        };
        reader.readAsDataURL(file);
    }
}

const roles = [
    { value: 1, name: 'administrateur' },
    { value: 2, name: 'teacher' }
]

const genres = [
    { value: 'man', name: 'man' },
    { value: 'woman', name: 'woman' }
]


const closeModal = () => {
    isShowModal.value = false
}
</script>

<template>


    <fwb-modal v-if="isShowModal" @close="closeModal">
        <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
        </template>
        <template #body>
            <div class="flex justify-around">
                <div class="w-1/2 flex flex-col gap-2 px-2">
                    <fwb-input v-model="employee.firstName" required placeholder="enter your first Name address"
                        label="first Name" validation-status="">
                        <template #validationMessage>
                            Please enter a valid first Name address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="employee.username" required placeholder="enter your username address"
                        label="username" validation-status="">
                        <template #validationMessage>
                            Please enter a valid username address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="employee.number_phone" required placeholder="enter number phone address"
                        label="number phone" validation-status="">
                        <template #validationMessage>
                            Please enter a valid email address
                        </template>
                    </fwb-input>

                    <fwb-select class="w-full" v-model="employee.role_id" :options="roles" label="Select a role"
                        placeholder="select a role " />

                </div>
                <div class="w-1/2  flex flex-col gap-2 px-2 ">
                    <fwb-input v-model="employee.lastName" required placeholder="enter your last Name address"
                        label="last Name" validation-status="">
                        <template #validationMessage>
                            Please enter a valid last Name address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="employee.email" type="email" required placeholder="enter your email address"
                        label="Email" validation-status="">
                        <template #validationMessage>
                            Please enter a valid email address
                        </template>
                    </fwb-input>

                    <fwb-input v-model="employee.address" required placeholder="enter address" label="address"
                        type="text" validation-status="">
                        <template #validationMessage>
                            Please enter a valid address
                        </template>
                    </fwb-input>
                    <fwb-select v-model="employee.genre" :options="genres" label="Select a genre" />


                </div>

            </div>
            <div v-if="imageUrl">
                <img class="h-24 overflow-hidden p-2 " :src="imageUrl" alt="Uploaded Image">
            </div>
            <fwb-file-input v-model="employee.image" @change="handleFileUpload" label="Upload file" />
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="employeeStore().updateAndEdit()" :disabled="loader" :loading="loader" color="blue">
                    {{ employee.id ? 'update' : 'add' }}
                </fwb-button>
            </div>
        </template>
    </fwb-modal>



</template>