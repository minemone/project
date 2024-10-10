<template>
    <div class="container py-5">
        <h1 class="text-center text-white">AGENTS</h1>
        <h4 class="text-center text-white">จำนวน Agent : {{ agents.length }}</h4>
        <div class="text-center">
            <button class="btn btn-success" v-on:click="navigateTo('/agent/create')">Create Agent</button>
        </div>

        <div class="container py-5">
            <div class="row">
                <div v-for="agent in agents" v-bind:key="agent.id" class="col-md-3">
                    <div class="agent-item my-4 p-3 text-center overflow-hidden"
                        :style="`background-image: url(https://r1.ilikewallpaper.net/iphone-11-pro-max-wallpapers/download/94969/valorant-logo-red-4k-iphone-11-pro-max-wallpaper-ilikewallpaper_com_1242x2688.jpg); background-size: cover; background-position: center;`"
                        v-on:click="navigateTo('/agent/' + agent.id)">
                        <img :src="`http://localhost:8081/uploads/${agent.name}.png`" class="img-fluid mb-3 zoom-image"
                            style="width: 235px; height: 313px; object-fit: contain;" />

                        <div class="position-absolute" style="top: 10px; right: 10px;">
                            <button class="btn btn-danger btn-sm mx-1" v-on:click.stop="deleteAgent(agent)"><i class="bi bi-x-circle"></i></button>
                        </div>

                        <div class="title mt-3 p-2 text-center"
                            style="background-color: #000; width: 100%; max-width: 235px; margin: 0 auto;">
                            <p class="font-weight-bold m-0 text-white">{{ agent.name }}</p>
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
<style scoped>
.agent-item {
    overflow: hidden;
    position: relative;
}

.zoom-image {
    transition: transform 0.3s ease;
}

/* เมื่อ Hover ให้ Zoom In */
.agent-item:hover .zoom-image {
    transform: scale(1.1);
}
</style>