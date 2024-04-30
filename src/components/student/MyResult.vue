
<script setup>
import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow
} from 'flowbite-vue'

import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { StoreMyResult } from '@/stores/student/StoreMyResult';
import { useRouter } from 'vue-router';
const router = useRouter();

const { results } = storeToRefs(StoreMyResult())
onMounted(async () => {
    const id = router.currentRoute.value.params.id;
    console.log(id);
    await StoreMyResult().getResults(id)
    console.log(id);
    console.log(results.value);
})
</script>


<template>
    <div>

    </div>
    <fwb-table>
        <fwb-table-head>
            <fwb-table-head-cell>exam</fwb-table-head-cell>
            <fwb-table-head-cell>note</fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>


            <fwb-table-row v-for="(r, i) in results" :key="i">
                <fwb-table-cell>{{ r.exam.title }} </fwb-table-cell>
                <fwb-table-cell>
                    <div class="flex justify-start" >
                        {{ r.note }}
                    </div>
                </fwb-table-cell>



            </fwb-table-row>

        </fwb-table-body>

    </fwb-table>
</template>