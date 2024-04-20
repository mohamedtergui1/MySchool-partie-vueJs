<script setup>
import { onMounted, ref } from 'vue'
import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow, FwbButton, FwbAvatar, FwbModal, FwbFileInput
} from 'flowbite-vue'
import ModalAddEditemployee from "@/components/modals/ModalAddEditemployee.vue"
import ModalDeleteemployee from "@/components/modals/ModalDeleteemployee.vue"

import { storeToRefs } from "pinia";
import { employeeStore } from '@/stores/employeeStore.js'


const { employees, isShowModal, idDeleteemployee, employee, isShowModalDelete, ModalChangeImage } = storeToRefs(employeeStore());
const baseUrlfroPic = ref(import.meta.env.VITE_API_URL + '/uploads/students/')
const imageUrl = ref(null)

const handleDeleteButtonClick = (id) => {
    idDeleteemployee.value = id
    isShowModalDelete.value = true
}
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
function changePic(id, index) {
    let tmp = employees.value[index];

    for (const key of Object.keys(employee.value)) {

        employee.value[key] = tmp[key];
    }
    imageUrl.value = baseUrlfroPic.value + employee.value.image
    ModalChangeImage.value = true


}
const handleEditButtonClick = (id, index) => {

    let tmp = employees.value[index];

    for (const key of Object.keys(employee.value)) {

        employee.value[key] = tmp[key];
    }
    console.log(employee.value);
    isShowModal.value = true
}

function showModal() {
    console.log(employee.value);
    let tmp = employeeStore().intialValues
    for (const key of Object.keys(employee.value)) {

        employee.value[key] = tmp[key];
    }


    isShowModal.value = true
}

onMounted(() => {
    employeeStore().getemployees();
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
            <fwb-table-head-cell>role</fwb-table-head-cell>
            <fwb-table-head-cell>phone number </fwb-table-head-cell>
            <fwb-table-head-cell>
                <span class="sr-only">Edit</span>
            </fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>


            <fwb-table-row v-for="(employee, index) in employees" :key="index">
                <fwb-table-cell class="flex justify-start gap-4">
                    <span class="cursor-pointer" @click="changePic(employee.image.id, index)">
                        <fwb-avatar :img="employee.image ? baseUrlfroPic + employee.image : ''"
                            status-position="bottom-right" status="online" />
                    </span>

                    <div class="flex flex-col items-between ">
                        <span>{{ employee.lastName + " " + employee.firstName }}</span>
                        <span>{{ employee.username }}</span>

                    </div>

                </fwb-table-cell>

                <fwb-table-cell>{{ employee.email }}</fwb-table-cell>
                <fwb-table-cell>{{ employee.role.name }}</fwb-table-cell>
                <fwb-table-cell>{{ employee.number_phone }}</fwb-table-cell>

                <fwb-table-cell class=" flex justify-end gap-2">
                    <FwbButton @click="handleDeleteButtonClick(employee.id)" color="red">delete</FwbButton>
                    <FwbButton @click="handleEditButtonClick(employee.id, index)">edit</FwbButton>


                </fwb-table-cell>

            </fwb-table-row>


        </fwb-table-body>

    </fwb-table>

    <!-- modal delete -->

    <ModalDeleteemployee />
    <!-- end delete modal -->



    <!-- modal add and edit -->

    <ModalAddEditemployee />

    <fwb-modal v-if="ModalChangeImage" @close="ModalChangeImage = !ModalChangeImage">
        <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
        </template>
        <template #body>
            <div class="flex justify-center ">
                <img class=" rounded-full border-2 " :src="imageUrl" :alt="employee.name">
            </div>
            <fwb-file-input v-model="employee.image" @change="handleFileUpload" label="Upload image" />
        </template>
        <template #footer>
            <div class=" flex justify-between">
                <fwb-button @click="ModalChangeImage = !ModalChangeImage" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="employeeStore().changeImage" color="green">
                    I accept
                </fwb-button>
            </div>
        </template>
    </fwb-modal>

</template>