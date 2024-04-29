<script setup>
import { onMounted, ref, watch, computed } from 'vue'

import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow, FwbModal, FwbButton, FwbInput, FwbTextarea, FwbSelect, FwbAvatar
} from 'flowbite-vue'
import { storeToRefs } from "pinia";
import { examStore } from '@/stores/examStore.js'



const { exams, isShowModal, idDeleteexam, exam, isShowModalDelete, loader, mangeNoteModal, studentWithResult } = storeToRefs(examStore());

const baseUrlfroPic = ref(import.meta.env.VITE_API_URL + '/uploads/students/')


const handleDeleteButtonClick = (id) => {
    idDeleteexam.value = id
    isShowModalDelete.value = true
}
const handleEditButtonClick = (id, index) => {

    let tmp = exams.value[index];

    for (const key of Object.keys(exam.value)) {

        exam.value[key] = tmp[key];
    }

    isShowModal.value = true
}


const handleCorrectButtonClick = (index) => {

    let tmp = exams.value[index];

    for (const key of Object.keys(exam.value)) {

        exam.value[key] = tmp[key];
    }
    mangeNoteModal.value = true
    examStore().getStudentWithResult();

}


function closeModal() {
    isShowModal.value = false
}
function showModal() {
    let p = examStore().intialValues


    for (const key of Object.keys(exam.value)) {

        exam.value[key] = p[key];
    }
    isShowModal.value = true
}
onMounted(() => {
    examStore().getexams();
    examStore().getClassroomsForexam();
})

</script>

<template>



    <div class="flex justify-end p-5 ">
        <fwb-button @click="showModal">
            add
        </fwb-button>
    </div>

    <div v-if="exams.length == 0">
        <img class="w-full" src="https://th.bing.com/th/id/OIP.pwWwXIMGatkmJKMZ0gE2SgHaDt?rs=1&pid=ImgDetMain" />
    </div>



    <fwb-table v-else >
        <fwb-table-head>
            <fwb-table-head-cell>title</fwb-table-head-cell>
            <fwb-table-head-cell>description</fwb-table-head-cell>
            <fwb-table-head-cell>classroom name</fwb-table-head-cell>
            <fwb-table-head-cell>classroom promo</fwb-table-head-cell>

            <fwb-table-head-cell>
                <span class="sr-only">Edit</span>
            </fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>


            <fwb-table-row v-for="(l, index) in exams " :key="index">
                <fwb-table-cell>{{ l.title }} </fwb-table-cell>
                <fwb-table-cell>
                    {{ l.date }}
                </fwb-table-cell>
                <fwb-table-cell>{{ l.classroom.name }} </fwb-table-cell>
                <fwb-table-cell>{{ l.classroom.promo.year }} </fwb-table-cell>




                <fwb-table-cell class=" flex  justify-end gap-2">
                    <FwbButton @click="handleCorrectButtonClick(index)" color="green">correct</FwbButton>
                    <FwbButton @click="handleDeleteButtonClick(l.id)" color="red">delete</FwbButton>
                    <FwbButton @click="handleEditButtonClick(l.id, index)">edit</FwbButton>
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
                    are you sue you wannna delete this student
                </h3>
            </div>

        </template>
        <template #footer>
            <div class="flex justify-end gap-5 ">
                <fwb-button class="mr-2" @click="isShowModalDelete = !isShowModalDelete" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="examStore().deleteexam()" :disabled="loader" type="submit" :loading="loader"
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
            <div class="flex gap-2   flex-col justify-center items-center">
                <fwb-input class="w-full" v-model="exam.title" placeholder="enter title" label="title" />
                <div class="w-full">
                    <fwb-input class="w-full" type="date" v-model="exam.date" placeholder="enter title" label="title" />
                </div>
                <fwb-select class="w-full" v-model="exam.classroom_id" :options="examStore().getterClassroomsForexam"
                    label="Select a classroom" placeholder="select a classroom" />

                <!-- <fwb-checkbox v-if="exam.TheCurrent"  v-model="exam.TheCurrent" label=" current exam" /> -->


            </div>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="examStore().updateAndEdit()" :disabled="loader" :loading="loader" color="blue">
                    {{ exam.id ? 'update' : 'add' }}
                </fwb-button>
            </div>
        </template>
    </fwb-modal>


    <!-- modal mange  note -->


    <fwb-modal size="5xl" v-if="mangeNoteModal" @close="mangeNoteModal = !mangeNoteModal">
        <template #header>

        </template>
        <template #body>
            <div class=" h-96 overflow-y-scroll px-2 ">
                <div class="flex justify-between my-5 items-center " v-for="(s, index) in studentWithResult "
                    :key="index">
                    <div class="flex justify-start gap-4">
                        <span class="cursor-pointer">
                            <fwb-avatar :img="s.student.image ? baseUrlfroPic + s.student.image : ''"
                                status-position="bottom-right" status="online" />
                        </span>


                        <div class="flex flex-col items-between ">
                            <span>{{ s.student.lastName + " " + s.student.firstName }}</span>
                            <span>{{ s.student.username }}</span>

                        </div>

                    </div>
                    <div>
                        <fwb-input class="w-full" v-model="s.note" type="number" placeholder="enter note" />
                    </div>

                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-end gap-5 ">
                <fwb-button class="mr-2" @click="mangeNoteModal = !mangeNoteModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="examStore().updateExamNote()" :disabled="loader" type="submit" :loading="loader"
                    color="blue">
                    confirm
                </fwb-button>
            </div>
        </template>
    </fwb-modal>







</template>