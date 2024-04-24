<script setup>
import { ref, onMounted } from "vue";
import { classroomDetails } from "@/stores/teacher/classroomDetails";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

const { exams } = storeToRefs(classroomDetails());
const router = useRouter();

const baseUrlfroPicinClassroom = ref(import.meta.env.VITE_API_URL + '/uploads/exams/')

onMounted(async () => {

    const id = router.currentRoute.value.params.id;
    await classroomDetails().fetchExams(id);

});
</script>

<template>
    <div class="flex  py-10 justify-center lg:justify-start  flex-wrap gap-10 px-5 ">

    </div>
</template>