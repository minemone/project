<template>
    <div class="container-fluid" v-if="agent"> <!-- ตรวจสอบว่ามีข้อมูล agent ก่อน -->
      <h1>Show Agent</h1>
      <p>id: {{ agent.id }}</p>
      <p>name: {{ agent.name }}</p>
      <p>role: {{ agent.role }}</p>
      <p>sex: {{ agent.sex }}</p>
      <p>details: {{ agent.details }}</p>
      <div class="mt-3">
        <button class="btn btn-warning" v-on:click="navigateTo('/agent/edit/'+ agent.id)">แก้ไข agent</button>
        <button class="btn btn-secondary" v-on:click="navigateTo('/agents')">กลับ</button>
      </div>
    </div>
    <div v-else>
      <p>กำลังโหลดข้อมูล...</p> <!-- แสดงข้อความขณะกำลังดึงข้อมูล -->
    </div>
  </template>
  
  <script>
  import AgentsService from '@/services/AgentsService'
  export default {
    data() {
      return {
        agent: null
      };
    },
    async created() {
      try {
        let agentId = this.$route.params.agentId;
        this.agent = (await AgentsService.show(agentId)).data;
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route);
      }
    }
  };
  </script>
  
  <style scoped>
    .mt-3 {
      margin-top: 1rem;
    }
    button {
      margin-right: 10px;
    }
  </style>
  