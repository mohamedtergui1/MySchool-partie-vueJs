<script setup>
import { ref } from "vue"
import ModalUpdateProfile from "@/components/modals/profile/ModalUpdateProfile.vue"
import ModllChangeImage from "@/components/modals/profile/ModllChangeImage.vue"
import { userAuthStore } from "@/stores/userAuthStore";
import { storeToRefs } from "pinia";
const { user, isShowModal, modaImageChange } = storeToRefs(userAuthStore())
const baseUrlfroPic = ref(import.meta.env.VITE_API_URL + '/uploads/students/')

</script>

<template>

    <section class="w-full overflow-hidden dark:bg-gray-900">
        <div class="flex flex-col">
            <!-- Cover Image -->
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
                alt="User Cover" class="w-full  xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]" />

            <!-- Profile Image -->
            <div class="sm:w-[80%] relative xs:w-[90%] justify-start items-center mx-auto flex">


                <img :src="user.image ? baseUrlfroPic + user.image : 'https://th.bing.com/th/id/R.1c2a84a1378f6bf7ad02b0bcf8e445f4?rik=TlikBeCFnlj72A&riu=http%3a%2f%2fayaan.ai%2fimg%2fteam%2fteam01.jpg&ehk=xCYgCvgUvLb1dM3n%2fVNYTtmypM9nxkCfVOdXU5dicps%3d&risl=&pid=ImgRaw&r=0'"
                    alt="User Profile"
                    class="rounded-full   lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]" />

                <button v-if="userAuthStore().role == 1 || userAuthStore().role == 2"
                    @click="modaImageChange = !modaImageChange" class="absolute p-1 rounded-full bg-slate-50 left-28 ">
                    <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linejoin="round" stroke-width="2"
                            d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
                        <path stroke="currentColor" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>


                </button>
                <!-- FullName -->
                <div class="flex flex-col xs:pl-4 sm:mx-4  my-4 p-4  ">

                    <h1
                        class="w-full text-left  text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
                        {{ user.firstName + " " + user.lastName }} </h1>

                    <h2 class="text-2xl ">
                        {{ user.username }}
                    </h2>
                </div>
                <div v-if="userAuthStore().role == 1 || userAuthStore().role == 2" class="flex justify-end h-10    ">
                    <ModalUpdateProfile />
                </div>
                <div v-if="userAuthStore().role == 1 || userAuthStore().role == 2" class="flex justify-end h-10    ">
                    <ModllChangeImage />
                </div>

            </div>

            <div
                class="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
                <!-- Description -->


                <!-- Detail -->
                <form class="w-full my-auto py-6 flex flex-col justify-center gap-2">
                    <div class="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                        <div class="w-full">
                            <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                <div class="flex flex-col pb-3">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">First Name</dt>
                                    <dd class="text-lg font-semibold"> {{ user.firstName }}</dd>
                                </div>
                                <div class="flex flex-col py-3">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Name</dt>
                                    <dd class="text-lg font-semibold">{{ user.lastName }}</dd>
                                </div>
                                <div class="flex flex-col py-3">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Date Of Birth</dt>
                                    <dd class="text-lg font-semibold">{{ user.date_of_birth }}</dd>
                                </div>
                                <div class="flex flex-col py-3">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Gender</dt>
                                    <dd class="text-lg font-semibold">{{ user.genre }}</dd>
                                </div>
                            </dl>
                        </div>
                        <div class="w-full">
                            <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">

                                <div class="flex flex-col ">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">username</dt>
                                    <dd class="text-lg pb-3 font-semibold">{{ user.username }}</dd>
                                </div>

                                <div class="flex flex-col pb-3">
                                    <dt class="mb-1 pt-3 text-gray-500 md:text-lg dark:text-gray-400">address</dt>
                                    <dd class="text-lg selection:font-semibold">{{ user.address }}</dd>
                                </div>

                                <div class="flex flex-col ">
                                    <dt class="mb-1 pt-3 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
                                    <dd class="text-lg pt-3 font-semibold">{{ user.number_phone }}</dd>
                                </div>

                                <div class="flex flex-col ">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                                    <dd class="text-lg pt-3 font-semibold">{{ user.email }}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
