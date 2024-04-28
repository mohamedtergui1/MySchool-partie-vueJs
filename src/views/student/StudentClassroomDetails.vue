<script setup>

import Students from '@/components/classroom/Students.vue'
import Lessons from '@/components/classroom/Lessons.vue'


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
                
            </TabPanel>
            <TabPanel header="My Results">
                <Exams />
            </TabPanel>
        </TabView>
    </div>
</template>