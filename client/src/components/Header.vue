<template>
  <div>
    <!-- new navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <!-- Logo -->
        <a class="navbar-brand" href="#" @click.prevent="navigateTo('/#')">
          <img src="../assets/valo-logo.png" id="logo" alt="logo">
        </a>
        <!-- Toggler/collapsibe Button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/agents">Agents</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/users">Users</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/comments">Comments</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/logout">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route); // ใช้ Vue Router เพื่อเปลี่ยนเส้นทาง
    },
    isLogin() {
      return this.$store.getters.isUserLoggedIn;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped>
.navbar-brand>img {
  width: 60px;
  margin-right: auto;
}

.navbar-nav .nav-link {
  color: white;
}

.navbar-nav .nav-link:hover {
  color: #ff4655;
}

.nav-link {
  font-size: 1.5rem;
  /* ปรับขนาดตามที่ต้องการ */
}
</style>
