<template>
    <fwb-modal size="x"   v-if="true" @close="closeModal">
        <template #body>
            <div class="card">
                <PickList v-model="students" listStyle="height:342px" dataKey="id" breakpoint="1400px">
                    <template #sourceheader> Available </template>
                    <template #targetheader> Selected </template>
                    <template #item="slotProps">
                        <div class="flex flex-wrap p-2 align-items-center gap-3">
                            <img class="w-4rem flex-shrink-0 border-round" :src="baseUrlfroPic + slotProps.item.image"
                                :alt="slotProps.item.username" />
                            <div class="flex-1 flex flex-column gap-2">
                                <span class="font-bold">{{ slotProps.item.firstName }}</span>
                                <div class="flex align-items-center gap-2">
                                    <i class="pi pi-tag text-sm"></i>
                                    <span>{{ slotProps.item.lastName }}</span>
                                </div>
                            </div>
                            <span class="font-bold"> {{ slotProps.item.grade.name }}</span>
                        </div>
                    </template>
                </PickList>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="closeModal" color="green">
                    I accept
                </fwb-button>
            </div>
        </template>
    </fwb-modal>
</template>

<script setup>
import {  ref,  onMounted } from 'vue';
import { studentStore } from '@/stores/studentStore';

 
import { FwbModal, FwbButton } from 'flowbite-vue'
const isShowModal = ref(false)

function closeModal() {
    isShowModal.value = false
}
function showModal() {
    isShowModal.value = true
}
const baseUrlfroPic = ref(import.meta.env.VITE_API_URL + '/uploads/students/')
const students = ref({})
onMounted(async () => {
    await studentStore().getAllStudents()
    students.value = studentStore().getterStudents
})
</script>
