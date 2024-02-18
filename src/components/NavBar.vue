<template>
    <nav class="d-flex justify-content-center" >
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      |
      <div  v-if="isAuthenticated"   >
         <span @click="logout()" >Logout</span>  
      |
      <router-link to="/admin/users">users</router-link>
     </div>
      <div v-else  >
         <router-link to="/login">Login</router-link>
      |
      <router-link to="/signup">Signup</router-link> 
    </div>
      
     
    </nav>
</template>


<script>
import axios from '@/axios/axios-config.js';  
export default {
  name: 'NavBar',
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token')
    };
}
  ,
  methods:{
    logout() {
      axios.post('/logout')
        .then(response => {
          if (response.data.message) {
            localStorage.removeItem('token');
           this.isAuthenticated = false;
          }
           
        })
        .catch(error => {
          console.error('Logout failed:', error);
          
        });
    }
  }
  

} 
</script>

