<script setup>
import { FwbModal, FwbButton } from 'flowbite-vue'
import { ref, onMounted, watch } from 'vue';
import { classroomStore } from '@/stores/classroomsStore.js'

import { storeToRefs } from 'pinia';
const { modalMangeStudents, SelectedClass, loader, availableStudent } = storeToRefs(classroomStore())
const isShowModal = ref(false)

function closeModal() {

    modalMangeStudents.value = false

}
const syncSrudents = () => {
    classroomStore().syncStudents(SelectedClass.value.id, students.value[1].map((student => student.id)))
}
watch(SelectedClass, (newValue) => {


    availableStudent.value.map((student) => {
        student.grade = {
            name: SelectedClass.value.grade.name,
        };
        return student;
    });;

    SelectedClass.value.students.map((student) => {
        student.grade = {
            name: SelectedClass.value.grade.name
        };
        return student;
    });

    students.value = [availableStudent.value, SelectedClass.value.students]


});
const baseUrlfroPic = ref(import.meta.env.VITE_API_URL + '/uploads/students/')
const students = ref(null)
 
</script>

<template>
    <fwb-modal size="x" v-if="modalMangeStudents" @close="closeModal">
        <template #body>
            <div class="card">
                <PickList v-model="students" listStyle="height:80vh" dataKey="id" breakpoint="1400px">
                    <template #sourceheader> Available Students </template>
                    <template #targetheader> Selected Students </template>
                    <template #item="slotProps">
                        <div class="flex flex-wrap p-2 align-items-center gap-3">
                            <img class="w-16  h-16 flex-shrink-0 border-round"
                                :src="baseUrlfroPic + slotProps.item.image" :alt="slotProps.item.username" />
                            <div class="flex-1 flex flex-column gap-2">
                                <span class="font-bold">{{ slotProps.item.firstName }}</span>
                                <div class="flex align-items-center gap-2">
                                    <span>{{ slotProps.item.lastName }}</span>
                                    <i class="pi pi-tag text-sm"></i>
                                </div>
                            </div>
                            <span class="font-bold"> {{ slotProps.item.grade.name }}</span>
                        </div>
                    </template>
                </PickList>

            </div>
        </template>
        <template #footer>
            <div class="flex gap-2 justify-end">

                <fwb-button @click="closeModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="syncSrudents" :disabled="loader" :loading="loader" color="blue">
                    I accept
                </fwb-button>
            </div>
        </template>
    </fwb-modal>
</template>