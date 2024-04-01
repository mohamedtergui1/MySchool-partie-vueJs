<template>
    <fwb-carousel :pictures="pictures" slide :slide-interval="2000" />
</template>

<script setup>
import { FwbCarousel } from 'flowbite-vue' 

const pictures = [

    { src: 'https://th.bing.com/th/id/R.99a5f51171f7dfca6248d8d0c2221b21?rik=yCqHnx1wRFZG%2fw&pid=ImgRaw&r=0', alt: 'Image 2' },
    { src: 'https://1.bp.blogspot.com/-O5b6jl7tUDg/Xl6yCvp-kXI/AAAAAAAAZac/MaPw-utfLUwou5CFNKVZVq0WhZ11YKg6ACLcBGAsYHQ/w1200-h630-p-k-no-nu/alumnos-en-practicas.jpg', alt: 'Image 3' },
]
</script>