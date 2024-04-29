<script setup>
import { onMounted, ref, watch, computed } from 'vue'

import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow, FwbModal, FwbButton, FwbInput, FwbTextarea, FwbSelect, FwbAvatar, FwbBadge
} from 'flowbite-vue'
import { storeToRefs } from "pinia";
import { resultStore } from '@/stores/teacher/resultStore.js'

import { useRouter } from 'vue-router';
const router = useRouter();


const { exams } = storeToRefs(resultStore());

const baseUrlfroPic = ref(import.meta.env.VITE_API_URL + '/uploads/students/')

 
 
onMounted(() => {
    const id = router.currentRoute.value.params.id;

    resultStore().getStudentExams(id);

})

</script>

<template>








    <fwb-table>
        <fwb-table-head>
            <fwb-table-head-cell>title</fwb-table-head-cell>
            <fwb-table-head-cell>description</fwb-table-head-cell>
            <fwb-table-head-cell>corrected</fwb-table-head-cell>
            <fwb-table-head-cell></fwb-table-head-cell>




        </fwb-table-head>
        <fwb-table-body>


            <fwb-table-row v-for="(l, index) in exams " :key="index">
                <fwb-table-cell>{{ l.title }} </fwb-table-cell>
                <fwb-table-cell>
                    {{ l.date }}
                </fwb-table-cell>
                <fwb-table-cell v-if="l.corrected"> <fwb-badge type="green">yes</fwb-badge>
                </fwb-table-cell>
                <fwb-table-cell v-else><fwb-badge type="red">no</fwb-badge></fwb-table-cell>
                <fwb-table-cell v-if="l.corrected">
                    <fwb-button 
                        color="green">
                        show corrected exam
                    </fwb-button>
                </fwb-table-cell>



            </fwb-table-row>

        </fwb-table-body>

    </fwb-table>








</template>