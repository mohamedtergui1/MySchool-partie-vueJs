<template>
    <table class="table">
        <thead>
            <tr>

                <th scope="col">name</th>
                <th scope="col">emailt</th>
                <th scope="col">password</th>
            </tr>
        </thead>
        <tbody id="table_body">


        </tbody>
    </table>
</template>

<script>

import axios from '@/axios/axios-config.js';
import $ from 'jquery';
 
export default {
    created() {
        this.showUsers();  
    },
    methods: {
        showUsers() {
            axios.get('/admin/users').then(response => {
                response.data.users.forEach(e => {

                    $("#table_body").append(

                        `
                        <tr>
                        
                        <td>${e.name}</td>
                        <td>${e.email}</td>
                        <td>${e.password}</td>
                        </tr>
                
                `
                    );

                });
            })
        },
    }
}
</script>