<script setup>
import { storeToRefs } from 'pinia';
import { errorsStore } from '@/stores/errorsStore';
const { errors, status } = storeToRefs(errorsStore())
</script>


<template>
     
</template>

