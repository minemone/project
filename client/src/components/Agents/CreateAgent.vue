<template>
  <div class="container-fluid py-5">
    <h1 class="text-center">Create Agent</h1>
    <form v-on:submit.prevent="createAgent" class="mx-auto" style="max-width: 600px;">
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input type="text" v-model="agent.name" class="form-control" id="name" />
      </div>
      <div class="mb-3">
        <label for="role" class="form-label">Role:</label>
        <input type="text" v-model="agent.role" class="form-control" id="role" />
      </div>
      <div class="mb-3">
        <label for="details" class="form-label">Details:</label>
        <input type="text" v-model="agent.details" class="form-control" id="details" />
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Create Agent</button>
      </div>
    </form>
  </div>
</template>

<script>
import AgentsService from "@/services/AgentsService";

export default {
  data() {
    return {
      agent: {
        name: "",
        role: "",
        sex: "",
        details: ""
      }
    };
  },
  methods: {
    async createAgent() {
      try {
        await AgentsService.post(this.agent);
        this.$router.push({ name: "agents" });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
  .container-fluid {
    color: aliceblue;
  }
</style>
