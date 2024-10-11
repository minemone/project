import Api from '@/services/Api'
export default {
    index() {
        return Api().get('skills')
    },
    show(skillId) {
        return Api().get('skill/' + skillId)
    },
    post(skill) {
        return Api().post('skill', skill)
      },
    put(skill) {
        return Api().put('skill/' + skill.id, skill)
    },
    delete(skill) {
        return Api().delete('skill/' + skill.id, skill)
    },
}