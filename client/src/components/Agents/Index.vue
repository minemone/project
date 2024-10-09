<template>
    <div class="container py-5">
        <h1 class="text-center text-white">AGENTS</h1>
        <h4 class="text-center text-white">จำนวน agent : {{ agents.length }}</h4>
        <div class="text-center">
            <button class="btn btn-success" v-on:click="navigateTo('/agent/create')">Create Agent</button>
        </div>

        <div class="container py-5">
            <div class="row mx-auto">
                <div class="col-md-3 text-center">
                    <div v-for="agent in agents" v-bind:key="agent.id" class="agent-item my-4 p-3 border rounded">
                        <p>id: {{ agent.id }}</p>
                        <p>name: {{ agent.name }}</p>
                        <p>picture: {{ agent.picture }}</p>
                        <p>role: {{ agent.role }}</p>
                        <p>sex: {{ agent.sex }}</p>
                        <p>details: {{ agent.details }}</p>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-info mx-2"v-on:click="navigateTo('/agent/' + agent.id)">View</button>
                            <button class="btn btn-warning mx-2"v-on:click="navigateTo('/agent/edit/' + agent.id)">Edit</button>
                            <button class="btn btn-danger mx-2" v-on:click="deleteAgent(agent)">Delete</button>                 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AgentsService from '@/services/AgentsService'
export default {
    data() {
        return {
            agents: []
        }
    },
    async created() {
        this.agents = (await AgentsService.index()).data
    },
    methods: {
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setAgent', null)
            this.$router.push({
                name: 'login'
            })
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        async deleteAgent(agent) {
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    await AgentsService.delete(agent)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.agents = (await AgentsService.index()).data
        }
    }
}
</script>
<style scoped></style>