<script setup>
import { ref, onMounted } from "vue"
import {
   FwbButton, FwbInput, FwbCheckbox, FwbSelect, FwbAvatar
} from 'flowbite-vue'
import { studentClassrooomStore } from "@/stores/student/studentClassrooomStore"
import { storeToRefs } from "pinia"
const { classrooms } = storeToRefs(studentClassrooomStore())
const baseUrlfroPicinClassroom = ref(import.meta.env.VITE_API_URL + '/uploads/students/')

onMounted(() => {
    studentClassrooomStore().fetchClassrooms()
})
</script>
<template>
    <div class="flex flex-wrap gap-8 justify-center lg:justify-start mx-10">

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
                <span>{{ c.grade ? c.grade.name : 'no grade' }}</span> <span>{{ c.promo ? c.promo.year : 'no promo'
                    }}</span>
            </div>
            <div class=" py-2 h-16 px-2 ">

                <div class="flex">
                    <fwb-avatar v-for="(s, i) in c.students.slice(0, 9)" :key="i"
                        :img="s.image ? baseUrlfroPicinClassroom + s.image : ''" rounded stacked />
                    <fwb-avatar v-if="c.students.length > 9" :initials="'+' + (c.students.length - 7)" rounded
                        stacked />
                    <!-- <stacked-avatars-counter href="#" total="99" /> -->
                </div>

            </div>
            <router-link :to="{ name: 'StudentClassroomDetails', params: { id: c.id } }">

                <fwb-button class="w-full">view more</fwb-button>

            </router-link>

        </div>



    </div>
</template>
