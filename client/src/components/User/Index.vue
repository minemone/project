<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Get All Users</h1>
    <div class="text-center mb-3">
      <button class="btn btn-primary" v-on:click="navigateTo('/user/create')">Create User</button>
    </div>
    <hr>
    <div v-if="users.length">
      <h2><div class="mb-3"><b>จำนวนผู้ใช้งาน:</b> {{ users.length }}</div></h2>
      <div class="row">
        <div v-for="user in users" :key="user.id" class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <div><b>id:</b> {{ user.id }}</div>
              <div><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</div>
              <div><b>อีเมล:</b> {{ user.email }}</div>
              <div><b>status:</b> {{ user.status }}</div>
              <div><b>type:</b> {{ user.type }}</div>
              <div class="mt-3">
                <button class="btn btn-info btn-sm me-2" v-on:click="navigateTo('/user/' + user.id)">
                  <i class="bi bi-eye" style="font-size: 1.2em;"></i>
                </button>
                <button class="btn btn-warning btn-sm me-2" v-on:click="navigateTo('/user/edit/' + user.id)">
                  <i class="bi bi-pen" style="font-size: 1.2em;"></i>
                </button>
                <button class="btn btn-danger btn-sm" v-on:click="deleteUser(user)">
                  <i class="bi bi-x-circle" style="font-size: 1.2em;"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button class="btn btn-secondary mt-3" v-on:click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      users: []
    }
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({ name: 'login' });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      try {
        this.users = (await UsersService.index()).data;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
