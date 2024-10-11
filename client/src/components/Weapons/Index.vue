<template>
    <div class="container py-5">
        <h1 class="text-center text-white">WAEPONS</h1>
        <h4 class="text-center text-white">จำนวน Weapon : {{ weapons.length }}</h4>
        <div class="text-center">
            <button class="btn btn-success" v-on:click="navigateTo('/weapon/create')">Create Weapon</button>
        </div>

        <div class="container py-5">
            <div class="row">
                <div v-for="weapon in weapons" :key="weapon.id" class="col-md-4 mb-4">
                    <!-- เพิ่ม mb-4 สำหรับระยะห่างด้านล่าง -->
                    <div class="card" style="width: 400px; height: 100%;">
                        <div class="card-img-top">
                            <img :src="`http://localhost:8081/uploads/${weapon.name}.png`" class="img-fluid"
                                alt="Weapon Image" style="width: 100%; height: 200px; object-fit: cover;" />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title font-weight-bold">{{weapon.name }}</h5> 
                            <p class="text-muted">TYPES // {{ weapon.type }} <br>
                            {{ weapon.details }}
                            </p> 
                        </div>


                        <div class="position-absolute" style="top: 10px; right: 10px;">
                            <button class="btn btn-warning btn-sm mx-1"
                                v-on:click="navigateTo('/weapon/edit/' + weapon.id)"><i class="bi bi-pen"></i></button>
                            <button class="btn btn-danger btn-sm mx-1" v-on:click.stop="deleteWeapon(weapon)"><i
                                    class="bi bi-x-circle"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
import WeaponsService from '@/services/WeaponsService'
export default {
    data() {
        return {
            weapons: []
        }
    },
    async created() {
        this.weapons = (await WeaponsService.index()).data
    },
    methods: {
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setWeapon', null)
            this.$router.push({
                name: 'login'
            })
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        async deleteWeapon(weapon) {
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    await WeaponsService.delete(weapon)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.weapons = (await WeaponsService.index()).data
        }
    }
}
</script>
<style scoped></style>