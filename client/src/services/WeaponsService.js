import Api from '@/services/Api'
export default {
    index() {
        return Api().get('weapons')
    },
    show(weaponId) {
        return Api().get('weapon/' + weaponId)
    },
    post(weapon) {
        return Api().post('weapon', weapon)
    },
    put(weapon) {
        return Api().put('weapon/' + weapon.id, weapon)
    },
    delete(weapon) {
        return Api().delete('weapon/' + weapon.id, weapon)
    },
}