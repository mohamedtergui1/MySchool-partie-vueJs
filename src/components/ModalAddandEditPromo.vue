<template>
    <fwb-button @click="showModal">
        Open modal
    </fwb-button>

    <fwb-modal v-if="isShowModal" @close="closeModal">
        <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
        </template>
        <template #body>
            <fwb-input v-model="promo.year" required placeholder="enter your year address" label="year"
                validation-status="">
                <template #validationMessage>
                    Please enter a valid year address
                </template>
            </fwb-input>

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
import { useStore } from 'pinia';

import { ref, reactive, defineEmits, defineProps, watch } from 'vue'
import { FwbButton, FwbModal } from 'flowbite-vue'
const store = useStore('promoStore');
const promo = reactive({
    id: ''
    ,
    year: ''
    ,
    TheCurrent: ''
})
const props = defineProps({
    id: String,
    name: {
        type: Number,
        default: 0
    }
});

const isShowModal = ref(false)

function closeModal() {
    isShowModal.value = false
}
function showModal() {
    isShowModal.value = true
}

watch(() => props.id, (newValue, oldValue) => {
    if (newValue) {
        let promo = store.getPromoById(newValue)
        console.log(promo)
    } else {

        promo.id = ""
        promo.year = ""
        promo.TheCurrent = ""

    }
});
</script>