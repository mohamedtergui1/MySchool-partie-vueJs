<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <modal-users @userAdded="handleUserAdded" />
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Product name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Color
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="index"
                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ user.name }}
                    </th>
                    <td class="px-6 py-4">
                        {{ user.email }}
                    </td>
                    <td class="px-6 py-4">
                        Laptop
                    </td>
                    <td class="px-6 py-4">
                        $2999
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>

            </tbody>
        </table>


        <div id="test" class="border border-blue-300 shadow rounded-md p-4 h-72   w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-end">
            <nav aria-label="Page navigation example">
                <div class="flex">
                    <!-- Previous Button -->
                    <button @click="prevPage()" :disabled="currentPage === 1"
                        :class="currentPage === 1 ? 'hidden' : 'block'"
                        class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Previous
                    </button>

                    <!-- Next Button -->
                    <button @click="nextPage()" :disabled="totalPages === currentPage"
                        :class="totalPages === currentPage ? 'hidden' : 'block'"
                        class="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                    </button>
                </div>
            </nav>
        </div>

    </div>
</template>

<script>
import axios from '@/axios/axios-config.js';
import $ from 'jquery';
import ModalAddUser from "@/components/ModalAddUser.vue";
export default {
    created() {
        this.getUsers();
    },
    data() {
        return {
            users: [],
            currentPage: 1,
            totalPages: 1
        };
    },
    name: "AllUsersView"
    ,
    components: {
        'modal-users': ModalAddUser
    }
    ,
    methods: {
        getUsers(page = 1) {
            this.users = []
            $("#test").show()
            axios.get(`/admin/users?page=${page}`).then(
                Response => {

                    this.users = Response.data.data.users.data;

                    this.totalPages = Response.data.data.users.last_page;
                    this.currentPage = Response.data.data.users.current_page;

                }
            ).finally(() => {
                $("#place_result").show();
                $("#test").hide()
            })
        }
        ,
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.getUsers(this.currentPage + 1);
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.getUsers(this.currentPage - 1);
            }
        },
        handleUserAdded(newUser) {

            this.users.unshift(newUser)
        },
        mounted() {

            this.$on('userAdded', this.handleUserAdded);
        }
    }
}
</script>