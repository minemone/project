<template>
    <div class="container-fluid py-5" style="max-width: 600px;" v-if="agent"> <!-- ตรวจสอบว่ามีข้อมูล agent ก่อน -->
        <h1>Show Agent</h1>
        <p>ID: {{ agent.id }}</p>
        <p>Name: {{ agent.name }}</p>
        <p>Role: {{ agent.role }}</p>
        <p>Sex: {{ agent.sex }}</p>
        <div class="mt-3">
            <button class="btn btn-warning" v-on:click="navigateTo('/agent/edit/' + agent.id)">Edit Agent</button>
            <button class="btn btn-secondary" v-on:click="navigateTo('/agents')">Back</button>
        </div>
    </div>
    <div v-else>
        <p class="text-center">กำลังโหลดข้อมูล...</p> <!-- แสดงข้อความขณะกำลังดึงข้อมูล -->
    </div>
</template>

<script>
import AgentsService from '@/services/AgentsService'
export default {
    data() {
        return {
            agent: null
        }
    },
    async created() {
        try {
            let agentId = this.$route.params.agentId
            this.agent = (await AgentsService.show(agentId)).data
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        },
    }
}
</script>
<style scoped>
    .mt-3 {
        margin-top: 1rem;
    }

    button {
        margin-right: 10px;
    }

    .container-fluid {
        color: aliceblue;
    }
</style>