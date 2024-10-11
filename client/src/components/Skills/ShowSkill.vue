<template>
    <div class="container py-5 d-flex justify-content-center" v-if="skill"> <!-- ตรวจสอบว่ามีข้อมูล skill ก่อน -->
        <div class="card shadow" style="max-width: 800px; width: 100%;"> <!-- กำหนดขนาดการ์ดให้ใหญ่ขึ้น -->
            <div class="card-body">
                <h1 class="card-title text-center mb-4" style="font-weight: bold; color: #343a40;">{{ skill.name }}</h1>
                <div class="d-flex justify-content-center">
                    <img :src="`http://localhost:8081/uploads/${skill.name}.png`" class="img-fluid mb-3"
                        style="width: 500px !important; height: 600px !important; object-fit: contain;" />
                </div>
                <!-- <div class="mt-4">
                    <h3 class="card-text text-center" style="color: #495057;">Role: <span class="text-primary">{{ skill.type}}</span></h3>
                    <h3 class="card-text" style="color: #495057;">Details:</h3>
                    <p class="card-text" style="font-size: 1.2em; line-height: 1.5; color: #6c757d; text-indent: 2em;">{{ skill.details }}
                    </p>
                </div> -->
                <div class="mt-4 text-center">
                    <button class="btn btn-warning me-2" v-on:click="navigateTo('/skill/edit/' + skill.id)">Edit
                        skill</button>
                    <button class="btn btn-secondary" v-on:click="navigateTo('/skills')">Back</button>
                </div>
            </div>
        </div>
    </div>


    <div v-else>
        <p class="text-center">กำลังโหลดข้อมูล...</p> <!-- แสดงข้อความขณะกำลังดึงข้อมูล -->
    </div>
</template>

<script>
import SkillsService from '@/services/SkillsService'
export default {
    data() {
        return {
            skill: null
        }
    },
    async created() {
        try {
            let skillId = this.$route.params.skillId
            this.skill = (await SkillsService.show(skillId)).data
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        },
    },
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