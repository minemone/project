<template>
    <div class="container py-5">
      <h1 class="text-center mb-4">Register</h1>
      <form v-on:submit.prevent="createUser" class="mx-auto" style="max-width: 600px;">
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input type="text" v-model="user.name" id="name" class="form-control form-control-lg" placeholder="Enter name" required>
        </div>
        <div class="mb-3">
          <label for="lastname" class="form-label">Last Name:</label>
          <input type="text" v-model="user.lastname" id="lastname" class="form-control form-control-lg" placeholder="Enter last name" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input type="email" v-model="user.email" id="email" class="form-control form-control-lg" placeholder="Enter email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input type="password" v-model="user.password" id="password" class="form-control form-control-lg" placeholder="Enter password" required>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary btn-lg w-100">Register</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import UsersService from '@/services/UsersService'; // ถ้าอยู่ในโฟลเดอร์ src/services
  export default {
    data() {
      return {
        user: {
          name: '',
          lastname: '',
          email: '',
          password: '',
          status: 'active'
        }
      };
    },
    methods: {
      async createUser() {
        try {
          await UsersService.post(this.user);
          this.$router.push('/login');
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  .btn-primary {
    background-color: #007bff;
    border: none;
  }
  </style>
  