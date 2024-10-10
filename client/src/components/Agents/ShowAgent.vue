<template>
    <div class="container py-5 d-flex justify-content-center" v-if="agent"> <!-- ตรวจสอบว่ามีข้อมูล agent ก่อน -->
        <div class="card shadow" style="max-width: 100%; width: 100%;">
            <div class="card-body">
                <h1 class="card-title text-center mb-4">{{ agent.name }}</h1>
                <div class="d-flex justify-content-center">
                    <img :src="`http://localhost:8081/uploads/${agent.name}.png`" class="img-fluid mb-3 zoom-image"
                        style="width: 235px; height: 313px; object-fit: contain;" />
                </div>
                <p class="card-text">Role: {{ agent.role }}</p>
                <p class="card-text">Sex: {{ agent.sex }}</p>
                <p class="card-text">Details: {{ agent.details }}</p>
                <div class="mt-4 text-center">
                    <button class="btn btn-warning me-2" v-on:click="navigateTo('/agent/edit/' + agent.id)">Edit
                        Agent</button>
                    <button class="btn btn-secondary" v-on:click="navigateTo('/agents')">Back</button>
                </div>
            </div>
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