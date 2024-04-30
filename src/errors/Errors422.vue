<script setup>
import {
    FwbModal, FwbButton, FwbFileInput
} from 'flowbite-vue'
import { storeToRefs } from 'pinia';
import { errorsStore } from '@/stores/errorsStore';
const { errors, status } = storeToRefs(errorsStore())
</script>

<template>

    <fwb-modal   v-if="status" @close="status = !status">

        <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
        </template>

        <template #body>
            <div  class="flex  justify-center" >

                <ul  >
                    <li class="text-lg text-red-500" v-for="(e, i) in errors" :key="i">
                        {{ e[0] }}
                    </li>
                </ul>
            </div>
        </template>

        <template #footer>
            <div class="mt-5 sm:mt-6">
                <button @click="status = !status"
                    class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                    OK
                </button>
            </div>
        </template>

    </fwb-modal>

</template>