<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Edit User</h1>
    <form v-on:submit.prevent="editUser" class="mx-auto" style="max-width: 600px;">
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input type="text" v-model="user.name" id="name" class="form-control" placeholder="Enter name">
      </div>
      <div class="mb-3">
        <label for="lastname" class="form-label">Last Name:</label>
        <input type="text" v-model="user.lastname" id="lastname" class="form-control" placeholder="Enter last name">
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" v-model="user.email" id="email" class="form-control" placeholder="Enter email">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" v-model="user.password" id="password" class="form-control" placeholder="Enter password">
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Edit User</button>
        <button @click="navigateTo('/users')" class="btn btn-secondary">Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService';
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
  async created() {
    try {
      var userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async editUser() {
      try {
        await UsersService.put(this.user);
        this.$router.push('/users');
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>
