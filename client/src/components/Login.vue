<template>
  <div class="container mt-5 d-flex justify-content-center" style="min-height: 100px;">
    <div class="card p-4 shadow-lg" style="width: 500px; margin-top: 100px;">
      <h1 class="text-center mb-4">User Login</h1>
      <form v-on:submit.prevent="onLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            class="form-control form-control-lg"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            class="form-control form-control-lg"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-lg w-100">Login</button>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        <div class="text-center mt-3">
          <button class="btn btn-link btn-lg" @click="navigateToRegister">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import AuthenService from "../services/AuthenService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({
          name: "users",
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    },
    navigateToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
