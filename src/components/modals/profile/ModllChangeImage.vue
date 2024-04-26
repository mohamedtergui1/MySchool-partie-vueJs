<script setup>
import { ref } from "vue"
import { userAuthStore } from "@/stores/userAuthStore";
import { storeToRefs } from "pinia";

import {
    FwbModal, FwbButton, FwbFileInput
} from 'flowbite-vue'
const { user, modaImageChange, loading } = storeToRefs(userAuthStore())
const  tmpImage = ref(user.value.image)
const baseUrlfroPic = ref(import.meta.env.VITE_API_URL + '/uploads/students/')
const imageUrl = ref(baseUrlfroPic.value + tmpImage.value)
const handleEditButtonClick = (id, index) => {

    let tmp = students.value[index];

    for (const key of Object.keys(student.value)) {

        student.value[key] = tmp[key];
    }
    console.log(student.value);
    isShowModal.value = true
}

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {

        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl.value = e.target.result;
            student.image = file;
        };
        reader.readAsDataURL(file);
    }
}
</script>




<template>
    <fwb-modal v-if="modaImageChange" @close="modaImageChange = !modaImageChange">
        <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
        </template>
        <template #body>
            <div class="flex justify-center ">
                <span class=" rounded-full p-1  border border-blue-600 bg-gradient-to-l    from-blue-500 to-red-500 ">
                    <img class=" rounded-full h-80 w-80 border border-blue-600 "
                        :src="imageUrl ? imageUrl : 'https://th.bing.com/th/id/R.1c2a84a1378f6bf7ad02b0bcf8e445f4?rik=TlikBeCFnlj72A&riu=http%3a%2f%2fayaan.ai%2fimg%2fteam%2fteam01.jpg&ehk=xCYgCvgUvLb1dM3n%2fVNYTtmypM9nxkCfVOdXU5dicps%3d&risl=&pid=ImgRaw&r=0'"
                        :alt="user.name">

                </span>
            </div>
            <fwb-file-input v-model="tmpImage" @change="handleFileUpload" label="Upload image" />
        </template>
        <template #footer>
            <div class=" flex justify-end gap-2 pr-4 ">
                <fwb-button @click="modaImageChange = !modaImageChange" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="deleteImage" color="red">
                    delete
                </fwb-button>
                <fwb-button @click="userAuthStore().changeImage(tmpImage)" color="blue">
                    save
                </fwb-button>
            </div>
        </template>
    </fwb-modal>

</template>