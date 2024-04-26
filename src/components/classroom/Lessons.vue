<script setup>
import {
    FwbModal, FwbButton, FwbInput, FwbTextarea 
} from 'flowbite-vue'


import { ref, onMounted } from "vue";
import { classroomDetails } from "@/stores/teacher/classroomDetails";
 
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

const { lessons, loader, lesson, isShowModalLesson, isShowModalDeleteLessons } = storeToRefs(classroomDetails());
const router = useRouter();

const handleEditButtonClick = (  index) => {
   
    let tmp = lessons.value[index];

    for (const key of Object.keys(lesson.value)) {

        lesson.value[key] = tmp[key];
    }

    isShowModalLesson.value = true
}


function showModal() {
    let p = {
        id: null,
        name: null,
        description: null,
        course_file: null,
        classroom_id: router.currentRoute.value.params.id
    }


    for (const key of Object.keys(lesson.value)) {

        lesson.value[key] = p[key];
    }
    isShowModalLesson.value = true
}

const openDelete = (id)=>{
    lesson.value.id = id
    isShowModalDeleteLessons.value = true
}



onMounted(async () => {

    const id = router.currentRoute.value.params.id;
    lessons.value = id;
    await classroomDetails().fetchLessons(id);

});
</script>

<template>
    <div class="flex justify-end p-5 ">
        <fwb-button @click="showModal">
            add
        </fwb-button>
    </div>

    <div class="flex py-10 justify-center lg:justify-start  flex-wrap gap-20 px-5 ">
        <div v-for="(l, i) in lessons " :key="i"
            class="relative flex   flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">


            <div
                class="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8   ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                <span
                    class="absolute top-10 z-0 h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]"></span>
                <div class="relative z-10 mx-auto max-w-md">
                    <div class=" flex justify-between  items-center   ">

                        <span
                            class="grid h-20 w-20 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="h-10 w-10 text-white transition-all">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                        </span>
                        <span class="font-bold   ">
                            {{ l.name }}
                        </span>

                    </div>
                    <div
                        class="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                        <p>{{ l.description.length > 80 ? l.description.substring(0, 80) +'...' : l.description }}</p>
                    </div>
                    <div class="pt-5 text-base font-semibold leading-7">
                        <p>
                            <a href="#" class="text-sky-500 transition-all duration-300 group-hover:text-white">Read the
                                docs
                                &rarr;
                            </a>
                        </p>
                    </div>
                </div>
            </div>


            <div class="  flex  justify-end items-center pt-10 gap-2 ">
                <FwbButton @click="openDelete(l.id)" color="red">delete</FwbButton>
                <FwbButton @click="handleEditButtonClick(i)">edit</FwbButton>
                 
                <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000"
                    @upload="onUpload" />
            </div>


        </div>
    </div>
    <!-- modal delete -->
    <fwb-modal v-if="isShowModalDeleteLessons" @close="isShowModalDeleteLessons = !isShowModalDeleteLessons">
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
                    are you sue you wanna delete this student
                </h3>
            </div>

        </template>
        <template #footer>
            <div class="flex justify-end gap-5">
                <fwb-button class="mr-2" @click="isShowModalDeleteLessons = !isShowModalDeleteLessons"
                    color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="classroomDetails().deletelesson()" :disabled="loader" type="submit"
                    :loading="loader" color="red">
                    confirm
                </fwb-button>
            </div>
        </template>
    </fwb-modal>
    <!-- end delete modal -->



    <!-- modal add and edit -->


    <fwb-modal v-if="isShowModalLesson" @close="isShowModalLesson = !isShowModalLesson">
        <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
        </template>
        <template #body>
            <div class="flex gap-2 flex-col justify-center items-center">
                <fwb-input class="w-full" v-model="lesson.name" placeholder="enter title" label="title" />
                <div class="w-full">
                    <fwb-textarea v-model="lesson.description" :rows="7" label="Your description"
                        placeholder="Write your description..." />
                    <!-- <Editor v-model="lesson.description" editorStyle="height: 320px" /> -->

                </div>

                <!-- <fwb-checkbox v-if="lesson.TheCurrent"  v-model="lesson.TheCurrent" label=" current lesson" /> -->


            </div>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="isShowModalLesson = !isShowModalLesson" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="classroomDetails().updateAndEdit()" :disabled="loader" :loading="loader"
                    color="blue">
                    {{ lesson.id ? 'update' : 'add' }}
                </fwb-button>
            </div>
        </template>
    </fwb-modal>

</template>