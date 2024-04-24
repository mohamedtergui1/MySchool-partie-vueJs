<script setup>
import Students from '@/components/classroom/Students.vue'
import Lessons from '@/components/classroom/Lessons.vue'
import Exams from '@/components/classroom/Exams.vue'


</script>

<template>
    <div class="card">
        <TabView>
            <TabPanel header="Students">
                <Students/>
             </TabPanel>
                    <TabPanel header="Lessons">
                        <Lessons/>
                    </TabPanel>
                    <TabPanel header="Exams">
                       <Exams/>
                    </TabPanel>
        </TabView>
    </div>
</template>