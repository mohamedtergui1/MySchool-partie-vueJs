<template>
    <div class="bg-gray-100">

        <div class="h-screen flex overflow-hidden bg-gray-200">
            <!-- Sidebar -->
            <div :class="openSidebarButton ? '-translate-x-full' : ''"
                class="absolute z-50 bg-gray-800 text-white w-56 min-h-screen overflow-y-auto transition-transform transform  ease-in-out duration-300"
                id="sidebar">
                <!-- Your Sidebar Content -->
                <div class="p-4">
                    <h1 class="text-2xl font-semibold">Sidebar</h1>
                    <ul class="mt-4">
                        <li class="mb-2"><router-link :to="{ name: 'students' }"
                                class="block hover:text-indigo-400">users</router-link></li>
                        <li class="mb-2"><router-link to="#"
                                class="block hover:text-indigo-400">classrooms</router-link></li>
                        <li class="mb-2"><router-link to="#" class="block hover:text-indigo-400">Services</router-link>
                        </li>
                        <li class="mb-2"><router-link to="#" class="block hover:text-indigo-400">Contact</router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Content -->
            <div class="flex-1 flex flex-col overflow-hidden">
                <!-- Navbar -->
                <div class="bg-white shadow">
                    <div class="container mx-auto">
                        <div class="flex justify-between items-center py-4 px-2">
                            <h1 class="text-xl font-semibold">Animated Drawer</h1>

                            <button @click="toggleSidebar" class="text-gray-500 hover:text-gray-600" id="open-sidebar">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Content Body -->
                <div class="px-4">
                    <RouterView />
                </div>

            </div>
        </div>



    </div>

</template>

<script setup>
import { FwbSidebar, FwbSidebarCta, FwbSidebarItem } from 'flowbite-vue'
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
const openSidebarButton = ref(true)

const toggleSidebar = () => {
    openSidebarButton.value = !openSidebarButton.value
}



</script>
