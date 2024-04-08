<script setup>
import { onMounted, ref, watch, computed } from 'vue'

import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow, FwbModal, FwbButton, FwbInput, FwbCheckbox, FwbSelect
} from 'flowbite-vue'
import { storeToRefs } from "pinia";
import { userStore } from '@/stores/usersStore.js'

const roles = [
    { value: '1', name: 'admin' },
    { value: '2', name: 'teacher' },
    { value: '3', name: 'student' },
]
const genres = [
    { value: 'man', name: 'man' },
    { value: 'woman', name: 'woman' }
    
]

const userstore = userStore();
const { users, isShowModal, idDeleteuser, user, isShowModalDelete, loader } = storeToRefs(userstore);

const { getusers } = userstore;
const { deleteuser } = userstore;
const { updateAndEdit } = userstore;
const handelClick = () => {
    updateAndEdit()
}
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



function closeModal() {
    isShowModal.value = false
}
function showModal() {
    console.log(user.value);
    let tmp = userstore.intialValues
    for (const key of Object.keys(user.value)) {

        user.value[key] = tmp[key];
    }
    console.log(user.value);

    isShowModal.value = true
}
onMounted(() => {
    getusers();
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
                <fwb-table-cell>{{ user.role.name }}</fwb-table-cell>

                <fwb-table-cell class=" flex justify-end gap-2">
                    <FwbButton @click="handleDeleteButtonClick(user.id)" color="red">delete</FwbButton>
                    <FwbButton @click="handleEditButtonClick(user.id, index)">edit</FwbButton>


                </fwb-table-cell>

            </fwb-table-row>


        </fwb-table-body>

    </fwb-table>

    <!-- modal delete -->
    <fwb-modal v-if="isShowModalDelete" @close="isShowModalDelete = !isShowModalDelete">
        <template #header>

        </template>
        <template #body>
            <div class="flex justify-center ">
                <img class="w-1/2 h-1/2"
                    src="https://th.bing.com/th/id/R.e2b23eb712c12203c36bc33b468f516e?rik=2fy31L5wvA4LVQ&riu=http%3a%2f%2fwww.dailyfreepsd.com%2fwp-content%2fuploads%2f2013%2f06%2fsign-of-danger-vector.jpg&ehk=JMb5ABS6sK0eYQu0CK8shEX2P%2b8gs9wQlyibkbbS8lY%3d&risl=&pid=ImgRaw&r=0"
                    alt="">
            </div>
            <div class="py-8">
                <h3 class="text-2xl font-bold text-center ">
                    are you sue you wannna delete this user
                </h3>
            </div>

        </template>
        <template #footer>
            <div class=" flex justify-end gap-2 ">
                <fwb-button @click="isShowModalDelete = !isShowModalDelete" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="deleteuser" :disabled="loader" type="submit" :loading="loader" color="red">
                    confirm
                </fwb-button>
            </div>
        </template>
    </fwb-modal>
    <!-- end delete modal -->



    <!-- modal add and edit -->


    <fwb-modal v-if="isShowModal" @close="closeModal">
        <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
        </template>
        <template #body>
            <form class="flex justify-around">
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

                    <fwb-select class="w-full" v-model="user.grade_id" :options="userstore.getGrades"
                        label="Select a grade" placeholder="select a grade " />
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
                    <fwb-input v-model="user.date_d_inscription" required placeholder="enter date d'inscription"
                        label="date d'inscription" type="date" validation-status="">
                        <template #validationMessage>
                            Please enter a valid date d'inscription
                        </template>
                    </fwb-input>
                    <fwb-input v-model="user.address" required placeholder="enter address" label="address" type="text"
                        validation-status="">
                        <template #validationMessage>
                            Please enter a valid date d'inscription
                        </template>
                    </fwb-input>
                    <fwb-select v-model="user.role_id" :options="roles" label="Select a role" />
                </div>

            </form>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="handelClick" :disabled="loader" :loading="loader" color="blue">
                    {{ user.id ? 'update' : 'add' }}
                </fwb-button>
            </div>
        </template>
    </fwb-modal>


</template>