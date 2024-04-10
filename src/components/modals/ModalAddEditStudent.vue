<script setup>
import {
    FwbModal, FwbButton, FwbInput, FwbCheckbox, FwbSelect
} from 'flowbite-vue'
import { storeToRefs } from "pinia";
import { studentStore } from '@/stores/studentStore.js'
import { gradeStore } from '@/stores/gradesStore.js'

 
const genres = [
    { value: 'man', name: 'man' },
    { value: 'woman', name: 'woman' }
]

const { isShowModal, student, loader } = storeToRefs(studentStore());

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
            <form class="flex justify-around">
                <div class="w-1/2 flex flex-col gap-2 px-2">
                    <fwb-input v-model="student.firstName" required placeholder="enter your first Name address"
                        label="first Name" validation-status="">
                        <template #validationMessage>
                            Please enter a valid first Name address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="student.username" required placeholder="enter your username address"
                        label="username" validation-status="">
                        <template #validationMessage>
                            Please enter a valid username address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="student.number_phone" required placeholder="enter number phone address"
                        label="number phone" validation-status="">
                        <template #validationMessage>
                            Please enter a valid email address
                        </template>
                    </fwb-input>

                    <fwb-select class="w-full" v-model="student.grade_id" :options="gradeStore().getGrades"
                        label="Select a grade" placeholder="select a grade " />
                    <fwb-select v-model="student.genre" :options="genres" label="Select a genre" />

                </div>
                <div class="w-1/2  flex flex-col gap-2 px-2 ">
                    <fwb-input v-model="student.lastName" required placeholder="enter your first Name address"
                        label="first Name" validation-status="">
                        <template #validationMessage>
                            Please enter a valid first Name address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="student.email" type="email" required placeholder="enter your email address"
                        label="Email" validation-status="">
                        <template #validationMessage>
                            Please enter a valid email address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="student.date_d_inscription" required placeholder="enter date d'inscription"
                        label="date d'inscription" type="date" validation-status="">
                        <template #validationMessage>
                            Please enter a valid date d'inscription
                        </template>
                    </fwb-input>
                    <fwb-input v-model="student.address" required placeholder="enter address" label="address" type="text"
                        validation-status="">
                        <template #validationMessage>
                            Please enter a valid date d'inscription
                        </template>
                    </fwb-input>
                    
                </div>

            </form>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="studentStore().updateAndEdit()" :disabled="loader" :loading="loader" color="blue">
                    {{ student.id ? 'update' : 'add' }}
                </fwb-button>
            </div>
        </template>
    </fwb-modal>



</template>