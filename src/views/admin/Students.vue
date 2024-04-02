<template>
    <fwb-modal v-if="isShowModal" @close="closeModal">
        <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
        </template>
        <template #body>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts new consumer privacy laws for its
                citizens, companies around the world are updating their terms of service agreements to comply.
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is
                meant to ensure a common set of data rights in the European Union. It requires organizations to notify
                users as soon as possible of high-risk data breaches that could personally affect them.
            </p>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="closeModal" color="green">
                    I accept
                </fwb-button>
            </div>
        </template>
    </fwb-modal>




    <fwb-table striped>
        <fwb-table-head>
            <fwb-table-head-cell>name</fwb-table-head-cell>
            <fwb-table-head-cell>email</fwb-table-head-cell>
            <fwb-table-head-cell>grade</fwb-table-head-cell>
            <fwb-table-head-cell>role</fwb-table-head-cell>
            <fwb-table-head-cell>
                <span class="sr-only">Edit</span>
            </fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>


            <fwb-table-row v-for="(student, index) in students" :key="index">
                <fwb-table-cell>{{ student.name }}</fwb-table-cell>
                <fwb-table-cell>{{ student.email }}</fwb-table-cell>
                <fwb-table-cell>Accessories</fwb-table-cell>
                <fwb-table-cell>$99</fwb-table-cell>
                <fwb-table-cell>
                    <fwb-dropdown text="***">
                        <div class="w-20 overflow-hidden ">
                            <fwb-list-group>
                                <fwb-list-group-item @click="showModal" class="text-blue-500  cursor-pointer ">
                                    Edit
                                </fwb-list-group-item>
                                <fwb-list-group-item class="text-red-500">
                                    Delete
                                </fwb-list-group-item>

                            </fwb-list-group>
                        </div>
                    </fwb-dropdown>
                </fwb-table-cell>
            </fwb-table-row>


        </fwb-table-body>
    </fwb-table>
</template>

<script setup>
import { studentsStore } from "@/stores/studentsStore.js"
import { ref, onMounted, watch } from 'vue'

import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
    FwbDropdown, FwbListGroup, FwbListGroupItem, FwbButton, FwbModal
} from 'flowbite-vue'


const students = ref([])
const store = studentsStore()
const isShowModal = ref(false)

const getStudents = async (page = 1) => {
    let response = await store.getStudents(page)
    console.log(response.data)
}

onMounted(() => {
    getStudents();
});

function closeModal() {
    isShowModal.value = false
}
function showModal() {
    isShowModal.value = true
}
watch(() => store.students, (newValue) => {
    students.value = newValue;
    console.log(students.value)
});

</script>
