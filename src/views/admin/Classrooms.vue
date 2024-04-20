<script setup>
import { onMounted, ref } from 'vue'
import ModalMangeStudentIncClass from '@/components/modals/ModalMangeStudentsInClass.vue';
import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow, FwbModal, FwbButton, FwbInput, FwbCheckbox, FwbSelect, FwbAvatar
} from 'flowbite-vue'
import { storeToRefs } from "pinia";
import { classroomStore } from '@/stores/classroomsStore.js'

import { gradeStore } from "@/stores/gradesStore.js";
import { promoStore } from "@/stores/promosStore.js";
import { employeeStore } from "@/stores/employeeStore.js";





const { classrooms, isShowModal, idDeleteclassroom, classroom,
    isShowModalDelete, loader, modalMangeStudents, SelectedClass } = storeToRefs(classroomStore());




const handleDeleteButtonClick = (id, index) => {
    idDeleteclassroom.value = id
    isShowModalDelete.value = true
}
const handleEditButtonClick = (index) => {




    let tmp = classrooms.value[index];
    for (const key of Object.keys(tmp)) {
        if (classroom.value.hasOwnProperty(key)) {
            classroom.value[key] = tmp[key];
        }
    }
    console.log(classroom.value);
    isShowModal.value = true
}

const handleMangeStudentButtonClick = async (id, index) => {
    modalMangeStudents.value = true
    await classroomStore().getAvailableStudent(id)
    SelectedClass.value = classrooms.value[index];

}

function closeModal() {
    isShowModal.value = false
}
function showModal() {
    let tmp = classroomStore().intialValues
    for (const key of Object.keys(tmp)) {
        classroom.value[key] = tmp[key];
    }
    isShowModal.value = true
}
onMounted(() => {
    classroomStore().getclassrooms();
    promoStore().getpromosWithoutPaginate()
    gradeStore().getgradesWithoutPaginate()
    employeeStore().getTeachers()
})
const baseUrlfroPicinClassroom = ref(import.meta.env.VITE_API_URL + '/uploads/students/')

</script>

<template>

    <ModalMangeStudentIncClass />
    <div class="flex justify-end p-5 ">
        <fwb-button @click="showModal">
            add
        </fwb-button>
    </div>






    <div class="flex flex-wrap gap-5 justify-center lg:justify-start mx-10">

        <div v-for="(c, index) in classrooms " :key="index"
            class=" border rounded shadow-lg text-center text-gray-500 w-[430px]">
            <div class="flex justify-center p-5 "
                :style="{ 'background-image': 'url(https://png.pngtree.com/png-clipart/20211017/original/pngtree-school-logo-png-image_6851480.png)' }">

                <fwb-avatar size="xl" :img="c.teacher.image ? baseUrlfroPicinClassroom + c.teacher.image : ''"
                    rounded />
            </div>

            <div class="flex mt-4 justify-center">
                <div class="text-sm mt-5">
                    <a href="#"
                        class="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out">
                        {{ c.name }}
                    </a>
                    <p>{{ c.teacher.firstName + ' ' + c.teacher.lastName }}</p>
                </div>
            </div>
            <div class="py-5 flex justify-around ">
                <span>{{ c.grade.name }}</span> <span>{{ c.promo.year }}</span>
            </div>
            <div class="  h-10 px-2 ">

                <div class="flex">
                    <fwb-avatar v-for="(s, i) in c.students.slice(0, 9)" :key="i"
                        :img="s.image ? baseUrlfroPicinClassroom + s.image : ''" rounded stacked />
                    <fwb-avatar v-if="c.students.length > 9" :initials=" '+' + (c.students.length -7) " rounded
                        stacked />
                    <!-- <stacked-avatars-counter href="#" total="99" /> -->
                </div>
            </div>
            <div class="flex justify-end py-5  pr-2 gap-2">
                <FwbButton @click="handleDeleteButtonClick(c.id, index)" color="red">delete</FwbButton>
                <FwbButton @click="handleEditButtonClick(index)">edit</FwbButton>
                <FwbButton @click="handleMangeStudentButtonClick(c.id, index)">Mange Student</FwbButton>
            </div>
        </div>



    </div>
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
                    are you sue you wannna delete this student
                </h3>
            </div>

        </template>
        <template #footer>
            <div class=" flex justify-end gap-2 ">
                <fwb-button @click="isShowModalDelete = !isShowModalDelete" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="classroomStore().deleteclassroom" :disabled="loader" type="submit" :loading="loader"
                    color="red">
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
            <div class="flex gap-2   flex-col justify-start items-center">
                <fwb-input class="w-full" v-model="classroom.name" placeholder="enter year" label="name" />
                <fwb-select class="w-full" v-model="classroom.teacher_id" :options="employeeStore().getterTeachers"
                    label="Select a teacher" placeholder="select a teacher" />
                <fwb-select class="w-full" v-model="classroom.grade_id" :options="gradeStore().getGrades"
                    label="Select a grade" placeholder="select a grade " />
                <fwb-select class="w-full" v-model="classroom.promo_id" :options="promoStore().getPromos"
                    label="Select a promo" placeholder="select a promo" />
            </div>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <fwb-button @click="closeModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click=" classroomStore().updateAndEdit()" :disabled="loader" :loading="loader"
                    color="blue">
                    {{ classroom.id ? 'update' : 'add' }}
                </fwb-button>
            </div>
        </template>
    </fwb-modal>






























</template>