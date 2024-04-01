<template>
    <NavBar />
    <RouterView />
    <Footer />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Footer from './Footer.vue';
import NavBar from './NavBar.vue';
</script>