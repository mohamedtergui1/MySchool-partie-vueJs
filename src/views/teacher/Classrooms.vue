<script setup>
import {
    FwbButton, FwbAvatar
} from 'flowbite-vue'
import { ref, onMounted } from "vue"
import { classroomMangeStore } from "@/stores/teacher/classroomMangeStore"
import { storeToRefs } from "pinia"
const { classrooms, loading } = storeToRefs(classroomMangeStore())
const baseUrlfroPicinClassroom = ref(import.meta.env.VITE_API_URL + '/uploads/students/')

onMounted(() => {
    classroomMangeStore().fetchClassroomData()
})
</script>

<template>
    <div class="flex text-black flex-wrap gap-10">

        <div v-for="(c, index) in classrooms " :key="index"
            class=" border rounded-2xl    flex flex-col   shadow-lg text-center  w-[430px]">
            <h1 class="text-xl font-bold py-5  ">
                {{ c.name }}
            </h1>


            <div class="py-5 flex justify-around ">
                <span>{{ c.grade.name }}</span> <span>{{ c.promo.year }}</span>
            </div>
            <div class="  py-5   px-2 ">

                <div class="flex">
                    <fwb-avatar v-for="(s, i) in c.students.slice(0, 9)" :key="i"
                        :img="s.image ? baseUrlfroPicinClassroom + s.image : ''" rounded stacked />
                    <fwb-avatar v-if="c.students.length > 9" :initials="'+' + (c.students.length - 7)" rounded
                        stacked />
                    <!-- <stacked-avatars-counter href="#" total="99" /> -->
                </div>

            </div>
            <router-link :to="{ name: 'ClassroomDetails', params: { id: c.id } }">

                <div :loading="loading" class="px-8 rounded-2xl   bg-blue-500 text-white font-bold py-2">
                    view
                </div>
            </router-link>


        </div>
    </div>
</template>