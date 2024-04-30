<script setup>
import { RouterView } from 'vue-router'
import { progressStore } from "@/stores/progressStore";
 import Errors422 from './errors/Errors422.vue';

 

 
</script>

<template>
      <div v-if="progressStore().progress"
      class="  h-10 w-10 fixed top-3 right-2  z-50 animate-spin rounded-full border-8 border-t-blue-600" />
      
      <ProgressBar v-if="progressStore().progress" mode="indeterminate"
            style="height: 4px; background-color: blue; color: aliceblue; "></ProgressBar>
            
            <RouterView />
            <Errors422/>
</template>
