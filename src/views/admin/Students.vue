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
import ModalAddEditStudent from "@/components/modals/ModalAddEditStudent.vue"
import ModalDeleteStudent from "@/components/modals/ModalDeleteStudent.vue"
import { TailwindPagination } from 'laravel-vue-pagination';
import { storeToRefs } from "pinia";
import { studentStore } from '@/stores/studentStore.js'
import { gradeStore } from '@/stores/gradesStore.js'

const { students, isShowModal, idDeletestudent, student, isShowModalDelete, ModalChangeImage, allResponse } = storeToRefs(studentStore());

const baseUrlfroPic = ref(import.meta.env.VITE_API_URL + '/uploads/students/')
const imageUrl = ref(null)
 
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

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {

        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl.value = e.target.result;
            student.image = file;
        };
        reader.readAsDataURL(file);
    }
}
function changePic(id, index) {
    let tmp = students.value[index];

    for (const key of Object.keys(student.value)) {

        student.value[key] = tmp[key];
    }
 
    student.value.image ? imageUrl.value = baseUrlfroPic.value + student.value.image : imageUrl.value =null

    
    ModalChangeImage.value = true
     

}

function showModal() {
    console.log(student.value);
    let tmp = studentStore().intialValues
    for (const key of Object.keys(student.value)) {

        student.value[key] = tmp[key];
    }


    isShowModal.value = true
}

const paginationStudents = (page) => {
    studentStore().getstudents(page);
}
const deleteImage = () => {
    console.log(student.value);
    student.value.image = ""
    studentStore().changeImage()
}
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
                    <span class="cursor-pointer" @click="changePic(student.id, index)">
                        <fwb-avatar :img="student.image ? baseUrlfroPic + student.image : ''"
                            status-position="bottom-right" status="online" />
                    </span>


                    <div class="flex flex-col items-between ">
                        <span>{{ student.lastName + " " + student.firstName }}</span>
                        <span>{{ student.username }}</span>

                    </div>

                </fwb-table-cell>

                <fwb-table-cell>{{ student.email }}</fwb-table-cell>
                <fwb-table-cell>{{ student.grade.name }}</fwb-table-cell>
                <fwb-table-cell>{{ student.date_of_birth }}</fwb-table-cell>

                <fwb-table-cell class=" flex justify-end gap-2">
                    <FwbButton @click="handleDeleteButtonClick(student.id)" color="red">delete</FwbButton>
                    <FwbButton @click="handleEditButtonClick(student.id, index)">edit</FwbButton>


                </fwb-table-cell>

            </fwb-table-row>

        </fwb-table-body>

    </fwb-table>
    <div class="flex justify-end p-5">

        <TailwindPagination :limit="2" :data="allResponse" @pagination-change-page="paginationStudents" />
    </div>

    <!-- modal delete -->

    <ModalDeleteStudent />
    <!-- end delete modal -->



    <!-- modal add and edit -->

    <ModalAddEditStudent />




    <fwb-modal v-if="ModalChangeImage" @close="ModalChangeImage = !ModalChangeImage">
        <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
        </template>
        <template #body>
            <div class="flex justify-center ">
                <span class=" rounded-full p-1  border border-blue-600 bg-gradient-to-l    from-blue-500 to-red-500 ">
                    <img class=" rounded-full h-80 w-80 border border-blue-600 "
                        :src="imageUrl ? imageUrl : 'https://th.bing.com/th/id/R.1c2a84a1378f6bf7ad02b0bcf8e445f4?rik=TlikBeCFnlj72A&riu=http%3a%2f%2fayaan.ai%2fimg%2fteam%2fteam01.jpg&ehk=xCYgCvgUvLb1dM3n%2fVNYTtmypM9nxkCfVOdXU5dicps%3d&risl=&pid=ImgRaw&r=0' "
                        :alt="student.name">

                </span>
            </div>
            <fwb-file-input v-model="student.image" @change="handleFileUpload" label="Upload image" />
        </template>
        <template #footer>
            <div class=" flex justify-end gap-2 pr-4 ">
                <fwb-button @click="ModalChangeImage = !ModalChangeImage" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="deleteImage" color="red">
                    delete
                </fwb-button>
                <fwb-button @click="studentStore().changeImage" color="blue">
                    save
                </fwb-button>
            </div>
        </template>
    </fwb-modal>



</template>