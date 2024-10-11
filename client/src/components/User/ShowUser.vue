<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">User Details</h1>
    <div class="card mx-auto" style="max-width: 600px;">
      <div class="card-body">
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Lastname:</strong> {{ user.lastname }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Password:</strong> {{ user.password }}</p>
        <p><strong>Status:</strong> {{ user.status }}</p>
        <p><strong>Created At:</strong> {{ user.createdAt }}</p>
        <div class="mt-4 text-center">
          <button @click="navigateTo('/users')" class="btn btn-secondary mt-3">Back</button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      user: {}
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
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style>
</style>
