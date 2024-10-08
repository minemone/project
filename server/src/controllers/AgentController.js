const { Agent } = require('../models');

module.exports = {
    // get all agent
    async index(req, res) {
        try {
            const agents = await Agent.findAll()
            res.send(agents)
        } catch (err) {
            res.status(500).send({
                error: 'The agents information was incorrect'
            })
        }
    },
    // create blog
    async create(req, res) {
        // res.send(JSON.stringify(req.body))
        try {
            const agent = await Agent.create(req.body)
            res.send(agent.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create agent incorrect'
            })
        }
    },
    // edit blog, suspend, active
    async put(req, res) {
        try {
            await Agent.update(req.body, {
                where: {
                    id: req.params.agentId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update agent incorrect'
            })
        }
    },
    // delete blog
    async remove(req, res) {
        try {
            const agent = await Agent.findOne({
                where: {
                    id: req.params.agentId
                }
            })
            if (!agent) {
                return res.status(403).send({
                    error: 'The agent information was incorrect'
                })
            }
            await agent.destroy()
            res.send(blog)
        } catch (err) {
            res.status(500).send({
                error: 'The agent information was incorrect'
            })
        }
    },
    // get blog by id
    async show(req, res) {
        try {
            const agent = await Agent.findByPk(req.params.agentId)
            res.send(agent)
        } catch (err) {
            req.status(500).send({
                error: 'The agent information was incorrect'
            })
        }
    }
}