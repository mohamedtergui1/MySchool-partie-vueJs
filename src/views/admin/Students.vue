<script setup>
import { onMounted , ref } from 'vue'

import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow, FwbButton, FwbAvatar
} from 'flowbite-vue'
import ModalAddEditStudent from "@/components/modals/ModalAddEditStudent.vue"
import ModalDeleteStudent from "@/components/modals/ModalDeleteStudent.vue"

import { storeToRefs } from "pinia";
import { studentStore } from '@/stores/studentStore.js'
import { gradeStore } from '@/stores/gradesStore.js'

const { students, isShowModal, idDeletestudent, student, isShowModalDelete } = storeToRefs(studentStore());


const handleDeleteButtonClick = (id) => {
    idDeletestudent.value = id
    isShowModalDelete.value = true
}
const handleEditButtonClick = (id, index) => {

    let tmp = students.value[index];

    for (const key of Object.keys(student.value)) {

        student.value[key] = tmp[key];
    }
    console.log(student.value);
    isShowModal.value = true
}



function showModal() {
    console.log(student.value);
    let tmp = studentStore().intialValues
    for (const key of Object.keys(student.value)) {

        student.value[key] = tmp[key];
    }
     

    isShowModal.value = true
}

const baseUrlfroPic = ref(import.meta.env.VITE_API_URL + '/uploads/students/')

onMounted(() => {
    console.log(baseUrlfroPic);
    studentStore().getstudents();
    gradeStore().getgradesWithoutPaginate();
})
</script>

<template>

    <div class="flex justify-end p-5 ">
        <fwb-button @click="showModal">
            add
        </fwb-button>
    </div>

    <fwb-table striped>
        <fwb-table-head>
            <fwb-table-head-cell>name</fwb-table-head-cell>
            <fwb-table-head-cell>email</fwb-table-head-cell>
            <fwb-table-head-cell>grade</fwb-table-head-cell>
            <fwb-table-head-cell>date </fwb-table-head-cell>
            <fwb-table-head-cell>
                <span class="sr-only">Edit</span>
            </fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>


            <fwb-table-row v-for="(student, index) in students" :key="index">
                <fwb-table-cell class="flex justify-start gap-4">
                    <fwb-avatar :img="student.image ? baseUrlfroPic + student.image : ''" status-position="bottom-right"
                        status="online" />

                    <div class="flex flex-col items-between " >
                        <span>{{ student.lastName + " " + student.firstName }}</span>
                        <span>{{ student.username }}</span>

                    </div>

                </fwb-table-cell>

                <fwb-table-cell>{{ student.email }}</fwb-table-cell>
                <fwb-table-cell>{{ student.grade.name }}</fwb-table-cell>
                <fwb-table-cell>{{ student.date_d_inscription }}</fwb-table-cell>

                <fwb-table-cell class=" flex justify-end gap-2">
                    <FwbButton @click="handleDeleteButtonClick(student.id)" color="red">delete</FwbButton>
                    <FwbButton @click="handleEditButtonClick(student.id, index)">edit</FwbButton>
                </fwb-table-cell>

            </fwb-table-row>


        </fwb-table-body>

    </fwb-table>

    <!-- modal delete -->

    <ModalDeleteStudent />
    <!-- end delete modal -->



    <!-- modal add and edit -->

    <ModalAddEditStudent />

</template>