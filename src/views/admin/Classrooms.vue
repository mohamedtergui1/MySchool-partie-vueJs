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
    FwbTableRow, FwbModal, FwbButton, FwbInput, FwbCheckbox
} from 'flowbite-vue'
import { storeToRefs } from "pinia";
import { classroomStore } from '@/stores/classroomsStore.js'


const classroomstore = classroomStore();
const { classrooms, isShowModal, idDeleteclassroom, classroom, isShowModalDelete, loader } = storeToRefs(classroomstore);

const { getclassrooms } = classroomstore;
const { deleteclassroom } = classroomstore;
const { updateAndEdit } = classroomstore;
const handelClick = () => {
    updateAndEdit()
}
const handleDeleteButtonClick = (id,index) => {
    idDeleteclassroom.value = id
    isShowModalDelete.value = true
}
const handleEditButtonClick = (id,index) => {

    let tmp = classrooms.value[index];
    console.log(tmp)
    for (const key of Object.keys(tmp)) {
       
        if (classroom.value.hasOwnProperty(key)) {
             
             classroom.value[key]=tmp[key] ;
        }
    }
    console.log(classroom.value);

    isShowModal.value = true
}



function closeModal() {
    isShowModal.value = false
}
function showModal() {
    classroom.value = classroomstore.intialValues
    isShowModal.value = true
}
onMounted(() => {
    getclassrooms();
})

</script>

<template>



    <div class="flex justify-end p-5 ">
        <fwb-button @click="showModal">
            add
        </fwb-button>
    </div>





    <fwb-table>
        <fwb-table-head>
            <fwb-table-head-cell>name</fwb-table-head-cell>
            <fwb-table-head-cell>teacher</fwb-table-head-cell>
            <fwb-table-head-cell>promo</fwb-table-head-cell>
            <fwb-table-head-cell>grade</fwb-table-head-cell>




            <fwb-table-head-cell>
                <span class="sr-only">Edit</span>
            </fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>


            <fwb-table-row v-for="(c, index) in classrooms " :key="index">
                <fwb-table-cell>{{ c.name }} </fwb-table-cell>
                <fwb-table-cell>{{ c.teacher.firstName + ' ' + c.teacher.lastName }} </fwb-table-cell>
                <fwb-table-cell>{{ c.promo.year }} </fwb-table-cell>
                <fwb-table-cell>{{ c.grade.name }} </fwb-table-cell>





                <fwb-table-cell class="flex justify-end gag-2">
                    <FwbButton @click="handleDeleteButtonClick(c.id,index)" color="red">delete</FwbButton>
                    <FwbButton @click="handleEditButtonClick(c.id,index)">edit</FwbButton>

                    <!-- <button @click="idEditclassrooms = p.id">edit</button> -->
                </fwb-table-cell>
            </fwb-table-row>

        </fwb-table-body>
        <!-- <swiper :slides-per-view="3" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        ...
      </swiper> -->
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
            <div class=" flex justify-end gap-2 ">
                <fwb-button @click="isShowModalDelete = !isShowModalDelete" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="deleteclassroom" :disabled="loader" type="submit" :loading="loader" color="red">
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
                <fwb-input v-model="classroom.name" placeholder="enter year" label="Year" />

                <!-- <fwb-checkbox v-if="classroom.TheCurrent"  v-model="classroom.TheCurrent" label=" current classroom" /> -->


            </div>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="handelClick" :disabled="loader" :loading="loader" color="blue">
                    {{ classroom.id ? 'update' : 'add' }}
                </fwb-button>
            </div>
        </template>
    </fwb-modal>


</template>