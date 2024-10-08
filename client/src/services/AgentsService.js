import Api from '@/services/Api'
export default {
    index() {
        return Api().get('agents')
    },
    show(agentId) {
        return Api().get('agent/' + agentId)
    },
    post(agent) {
        return Api().post('agent', agent)
    },
    put(agent) {
        return Api().put('agent/' + agent.id, agent)
    },
    delete(agent) {
        return Api().delete('agent/' + agent.id, agent)
    },
}