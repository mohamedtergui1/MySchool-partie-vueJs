<script setup>
import {
    FwbModal, FwbButton
} from 'flowbite-vue'
import { storeToRefs } from "pinia";

import { employeeStore } from '@/stores/employeeStore.js'
const { users, isShowModalDelete, loader } = storeToRefs(employeeStore());
</script>
<template>
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
                    are you sue you wannna delete this user
                </h3>
            </div>

        </template>
        <template #footer>
            <div class=" flex justify-end gap-2 ">
                <fwb-button @click="isShowModalDelete = !isShowModalDelete" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="employeeStore().deleteemployee()" :disabled="loader" type="submit" :loading="loader"
                    color="red">
                    confirm
                </fwb-button>
            </div>
        </template>
    </fwb-modal>
</template>
