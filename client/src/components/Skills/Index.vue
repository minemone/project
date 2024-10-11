<template>
    <div class="container py-5">
        <h1 class="text-center text-white">SKILLS</h1>
        <h4 class="text-center text-white">จำนวน Skill ของ Agent : {{ skills.length }}</h4>
        <div class="text-center">
            <button class="btn btn-success" v-on:click="navigateTo('/skill/create')">Create Skill</button>
        </div>

        <div class="container py-5">
            <div class="row">
                <div v-for="skill in skills" :key="skill.id" class="col-12 mb-4">
                    <h1 :style="{ color: getRandomColor() }">{{ skill.name }}</h1>
                    <div class="row">
                        <div v-for="index in 4" :key="index" class="col-md-3">
                            <div class="card" style="width: 300px; height: 350px;">
                                <!-- กำหนดความกว้างและความสูงที่ต้องการ -->
                                <div class="card-img-top d-flex justify-content-center align-items-center"
                                    style="background-color: #000; height: 150px;">
                                    <img :src="`http://localhost:8081/uploads/${skill['skill' + index]}.png`"
                                        class="img-fluid" alt="Skill Image"
                                        style="width: 150px; height: 150px; object-fit: contain;" />
                                </div>
                                <div class="card-body">
                                    <p class="text-muted">{{ skill['details' + index] }}</p>
                                </div>

                                <div class="position-absolute" style="top: 10px; right: 10px;">
                                    <button class="btn btn-warning btn-sm mx-1"
                                        v-on:click="navigateTo('/skill/edit/' + skill.id)"><i
                                            class="bi bi-pen"></i></button>
                                    <button class="btn btn-danger btn-sm mx-1" v-on:click.stop="deleteSkill(skill)"><i
                                            class="bi bi-x-circle"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import SkillsService from '@/services/SkillsService'
export default {
    data() {
        return {
            skills: []
        }
    },
    async created() {
        this.skills = (await SkillsService.index()).data
    },
    methods: {
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setSkill', null)
            this.$router.push({
                name: 'login'
            })
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        async deleteSkill(skill) {
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    await SkillsService.delete(skill)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.skills = (await SkillsService.index()).data
        },
        getRandomColor() {
            const brightColors = [
                '#FF5733', '#FFBD33', '#DBFF33', '#75FF33',
                '#33FF57', '#33FFBD', '#33DBFF', '#3375FF',
                '#5733FF', '#BD33FF', '#FF33DB', '#FF3375'
            ];
            // สุ่มสีจากรายการ brightColors
            return brightColors[Math.floor(Math.random() * brightColors.length)];
        },
    }
}
</script>
<style scoped></style>