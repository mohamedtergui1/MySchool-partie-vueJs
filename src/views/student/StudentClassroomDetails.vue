<script setup>

import Students from '@/components/classroom/Students.vue'
import Lessons from '@/components/classroom/Lessons.vue'
import MyResult from '@/components/student/MyResult.vue'
import Exams from '@/components/student/Exams.vue';
</script>

<template>
    <div class="card">
        <TabView>
            <TabPanel header="Students">
                <Students />
            </TabPanel>
            <TabPanel header="Lessons">
                <Lessons />
            </TabPanel>
            <TabPanel header="Exams">
                <Exams/>
             </TabPanel>
                    <TabPanel header="My Results">
                        <MyResult />
                    </TabPanel>
        </TabView>
    </div>
</template>