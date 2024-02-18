<template>
    <div class="container">
      <div id="alert"  class="alert alert-success  d-none " role="alert">
  
</div>
   <div>
     <div class="mb-3">
       <label for="exampleInputfullname1" class="form-label">fullname address</label>
       <input type="text"  v-model= "user.name"  class="form-control" id="exampleInputfullname1" aria-describedby="fullnameHelp">
     </div>
     <div class="mb-3">
       <label for="exampleInputEmail1" class="form-label">Email address</label>
       <input type="email" v-model= "user.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      
       <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
     </div>
     <div class="mb-3">
       <label for="exampleInputPassword1" class="form-label">Password</label>
       <input type="password"   v-model= "user.password"  class="form-control" id="exampleInputPassword1">
     </div>
     <div class="mb-3 form-check">
       <input type="checkbox" class="form-check-input" id="exampleCheck1">
       <label class="form-check-label" for="exampleCheck1">Check me out</label>
     </div>
     <button type="submit"   @click="register()" class="btn btn-primary">Submit</button>
   </div>
 </div>
</template>
<script>
    import axios from '@/axios/axios-config.js';  
    import $ from 'jquery';
export default {
 data() {
   return {
     user: {
       id:'',
       name: '',
       email: '',
       password: ''
     },
     errorMessage: '', // New property to store error message
     successMessage: '' // New property to store success message
   };
 },
 methods: {
   register() {
  
      var button = $(this)
      button.prop('disabled', true);  
     axios.post('/register', this.user)
       .then(response => {
         
          if (response.data) {
        
              $("#alert").removeClass("alert-danger").addClass("alert-success").html("login success");
            }
      
         
        
       })
       .catch(error => {
         console.error('Error registering user:', error.response.data);
        let whrong = "";
        error.response.data.forEach(e => {
          whrong +=(e + "\n" );
        });
        
        $("#alert").addClass("alert-danger").removeClass("alert-success").html("something s wrong" + "\n" +
        whrong
        );
      
       }).finally(() => {
        this.user.email = "";
        this.user.password = "";
        this.user.name = "";
        button.prop('disabled', false);  
    });
   }
 }
}
</script>

