<script setup>
import { onMounted, ref, watch, computed } from 'vue'

import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,   FwbButton
} from 'flowbite-vue'
import ModalAddEditUser from "@/components/modals/ModalAddEditUser.vue"
import ModalDeleteUser from "@/components/modals/ModalDeleteUser.vue"

import { storeToRefs } from "pinia";
import { userStore } from '@/stores/usersStore.js'
import { gradeStore } from '@/stores/gradesStore.js'

const { users, isShowModal, idDeleteuser, user, isShowModalDelete } = storeToRefs(userStore());

 
const handleDeleteButtonClick = (id) => {
    idDeleteuser.value = id
    isShowModalDelete.value = true
}
const handleEditButtonClick = (id, index) => {

    let tmp = users.value[index];

    for (const key of Object.keys(user.value)) {

        user.value[key] = tmp[key];
    }

    isShowModal.value = true
}



function showModal() {
    console.log(user.value);
    let tmp = userStore().intialValues
    for (const key of Object.keys(user.value)) {

        user.value[key] = tmp[key];
    }
    console.log(user.value);

    isShowModal.value = true
}
onMounted(() => {
    userStore().getusers();
    gradeStore().getgradesWithoutPaginate();
})

</script>

<template>

    <div class="flex justify-end p-5 ">
        <fwb-button @click="showModal">
            add
        </fwb-button>
    </div>

    <fwb-table class="pb-10" striped>
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


            <fwb-table-row v-for="(user, index) in users" :key="index">
                <fwb-table-cell>{{ user.username }}</fwb-table-cell>
                <fwb-table-cell>{{ user.email }}</fwb-table-cell>
                <fwb-table-cell>{{ user.grade.name }}</fwb-table-cell>
                <fwb-table-cell>{{ user.role_id ? user.role.name : 'null' }}</fwb-table-cell>

                <fwb-table-cell class=" flex justify-end gap-2">
                    <FwbButton @click="handleDeleteButtonClick(user.id)" color="red">delete</FwbButton>
                    <FwbButton @click="handleEditButtonClick(user.id, index)">edit</FwbButton>


                </fwb-table-cell>

            </fwb-table-row>


        </fwb-table-body>

    </fwb-table>

    <!-- modal delete -->
   
    <ModalDeleteUser/>
     <!-- end delete modal -->



    <!-- modal add and edit -->

    <ModalAddEditUser />

</template>