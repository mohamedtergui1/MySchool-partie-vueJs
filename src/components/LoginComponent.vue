<template>
  <div class="max-w-md mx-auto">
    <div id="alert_success"
      class=" hidden font-medium p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert">

    </div>
    <div id="alert_danger" class= " hidden p-4 mb-4 font-semibold text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
   
  </div>

    <div class="relative z-0 w-full mb-5 group">
      <input type="email" v-model="user.email" name="floating_email" id="floating_email"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required />
      <label for="floating_email"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
        address</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
      <input type="password" v-model="user.password" name="floating_password" id="floating_password"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" " required />
      <label for="floating_password"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    </div>



    <button type="submit" @click="login()"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </div>
</template>


<script  >
import axios from '@/axios/axios-config.js';
import $ from 'jquery';
export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    login() {


      var button = $(this);


      button.prop('disabled', true);

      axios.post('/login', this.user)
        .then(response => {


          if (response.data.status) {
            localStorage.setItem('token', response.data.data.authorization.token);
            $("#alert_success").removeClass("hidden").removeClass("hidden").addClass("alert-success").html("login success");
          }

        })
        .catch(error => {
          console.error('Error logging in:', error);
          $("#alert_success").addClass("hidden")
          $("#alert_danger").removeClass("hidden").html('email  or password incrcorict');
        })
        .finally(() => {
          this.user.email = "";
          this.user.password = "";

          button.prop('disabled', false);
        });
    }

  }
}
</script>