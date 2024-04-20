<script setup>
import { onMounted, ref, watch, computed } from 'vue'

import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow, FwbModal, FwbButton, FwbInput, FwbCheckbox, FwbTextarea, FwbAvatar
} from 'flowbite-vue'
import { storeToRefs } from "pinia";
import { annonceStore } from '@/stores/annonceStore.js'



const { annonces, isShowModal, idDeleteannonce, annonce, isShowModalDelete, loader } = storeToRefs(annonceStore());




const handleDeleteButtonClick = (id) => {
    idDeleteannonce.value = id
    isShowModalDelete.value = true
}
const handleEditButtonClick = (id, index) => {

    let tmp = annonces.value[index];

    for (const key of Object.keys(annonce.value)) {

        annonce.value[key] = tmp[key];
    }

    isShowModal.value = true
}



function closeModal() {
    isShowModal.value = false
}
function showModal() {

    for (const key of Object.keys(annonce.value)) {

        annonce.value[key] = annonceStore().intialValues[key];
    }
    isShowModal.value = true
}
onMounted(() => {
    annonceStore().getannonces()
})
const baseUrlfroPic = ref(import.meta.env.VITE_API_URL + '/uploads/students/')

</script>

<template>



    <div class="flex justify-end p-5  ">
        <fwb-button @click="showModal">
            add
        </fwb-button>
    </div>

    <div class="flex flex-wrap justify-center  lg:justify-start  gap-5  px-10 ">
       
        <div v-for="(p, index) in annonces" :key="index" class=" rounded lg:w-[650px] w-10/12 px-10 border shadow-lg ">
            <h1 class="font-bold pt-4  border-b " >{{ p.title }}</h1>
            <ScrollPanel class="pt-5" style="width: 100%; height: 200px">
                <p>
                    {{ p.description }}
                </p>
            </ScrollPanel>
            <div class="flex items-center gap-6      py-5 justify-between">
                <div class="w-1/2 flex  gap-2 ">
                    <fwb-avatar :img="p.user.image ? baseUrlfroPic + p.user.image : null" rounded
                        status-position="bottom-left" size="md" status="online" />
                    <div class="flex flex-wrap  gap-2 items-center text-sm  ">
                        <span>{{ p.user.firstName }}</span>
                        <span>{{ p.user.lastName }}</span>

                    </div>
                </div>
                <div class="flex  items-center gap-1">
                    <FwbButton @click="handleDeleteButtonClick(p.id)" color="red">delete</FwbButton>
                    <FwbButton @click="handleEditButtonClick(p.id, index)">edit</FwbButton>
                </div>
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
                    are you sue you wannna delete this annonce
                </h3>
            </div>

        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <fwb-button @click="isShowModalDelete = !isShowModalDelete" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click=" annonceStore().deleteannonce()" :disabled="loader" type="submit" :loading="loader"
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
                <fwb-input class="w-full" v-model="annonce.title" placeholder="enter title" label="title" />
                <div class="w-full">
                    <fwb-textarea v-model="annonce.description" :rows="7" label="Your description"
                        placeholder="Write your description..." />

                </div>




                <!-- <fwb-checkbox v-if="annonce.TheCurrent"  v-model="annonce.TheCurrent" label=" current annonce" /> -->


            </div>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="annonceStore().updateAndEdit()" :disabled="loader" :loading="loader" color="blue">
                    {{ annonce.id ? 'update' : 'add' }}
                </fwb-button>
            </div>
        </template>
    </fwb-modal>










</template>