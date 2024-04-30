<script setup>
import { onMounted, ref, watch, computed } from 'vue'
// import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
// import 'swiper/css';
import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow, FwbModal, FwbButton, FwbInput, FwbTextarea, FwbSelect
} from 'flowbite-vue'
import { storeToRefs } from "pinia";
import { lessonStore } from '@/stores/lessonStore.js'



const { lessons, isShowModal, idDeletelesson, lesson, isShowModalDelete, loader } = storeToRefs(lessonStore());



const handleDeleteButtonClick = (id) => {
    idDeletelesson.value = id
    isShowModalDelete.value = true
}
const handleEditButtonClick = (id, index) => {

    let tmp = lessons.value[index];

    for (const key of Object.keys(lesson.value)) {

        lesson.value[key] = tmp[key];
    }

    isShowModal.value = true
}



function closeModal() {
    isShowModal.value = false
}
function showModal() {
    let  p = lessonStore().intialValues
    

    for (const key of Object.keys(lesson.value)) {

        lesson.value[key] = p[key];
    }
    isShowModal.value = true
}
onMounted(() => {
    lessonStore().getlessons();
    lessonStore().getClassroomsForLesson();

})

</script>

<template>



    <div class="flex justify-end p-5 ">
        <fwb-button @click="showModal">
            add
        </fwb-button>
    </div>


    <div v-if="lessons.length == 0">
        <img class="w-full" src="https://th.bing.com/th/id/OIP.pwWwXIMGatkmJKMZ0gE2SgHaDt?rs=1&pid=ImgDetMain" />
    </div>



    <fwb-table v-else>
        <fwb-table-head>
            <fwb-table-head-cell>title</fwb-table-head-cell>
            <fwb-table-head-cell>description</fwb-table-head-cell>
            <fwb-table-head-cell>classroom name</fwb-table-head-cell>



            <fwb-table-head-cell>
                <span class="sr-only">Edit</span>
            </fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>


            <fwb-table-row v-for="(l, index) in lessons " :key="index">
                <fwb-table-cell>{{ l.name }} </fwb-table-cell>
                <fwb-table-cell>
                    {{ l.description.length > 20 ? l.description.substring(0, 20) + "...." : l.description }}
                </fwb-table-cell>
                <fwb-table-cell>{{ l.classroom.name }} </fwb-table-cell>
                <fwb-table-cell class=" flex  justify-end gap-2">
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

                </h3>
            </div>

        </template>
        <template #footer>
            <div class="flex justify-end gap-5">
                <fwb-button class="mr-2" @click="isShowModalDelete = !isShowModalDelete" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="lessonStore().deletelesson()" :disabled="loader" type="submit" :loading="loader"
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
            <div class="flex gap-2 flex-col justify-center items-center">
                <fwb-input class="w-full" v-model="lesson.name" placeholder="enter title" label="title" />
                <div class="w-full">
                    <!-- <fwb-textarea v-model="lesson.description" :rows="7" label="Your description"
                        placeholder="Write your description..." /> -->
                    <Editor v-model="lesson.description" editorStyle="height: 320px" />

                </div>
                <fwb-select class="w-full" v-model="lesson.classroom_id"
                    :options="lessonStore().getterClassroomsForLesson" label="Select a classroom"
                    placeholder="select a classroom" />

                <!-- <fwb-checkbox v-if="lesson.TheCurrent"  v-model="lesson.TheCurrent" label=" current lesson" /> -->


            </div>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="lessonStore().updateAndEdit()" :disabled="loader" :loading="loader" color="blue">
                    {{ lesson.id ? 'update' : 'add' }}
                </fwb-button>
            </div>
        </template>
    </fwb-modal>


</template>