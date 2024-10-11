const { Skill } = require('../models');

module.exports = {
    // get all skill
    async index(req, res) {
        try {
            const skills = await Skill.findAll()
            res.send(skills)
        } catch (err) {
            res.status(500).send({
                error: 'The skills information was incorrect'
            })
        }
    },
    // create skill
    async create(req, res) {
        try {
            console.log('Skill create req.body:', req.body);
            const skill = await Skill.create(req.body);
            console.log('Skill create skill:', skill);
            res.send(skill.toJSON());
        } catch (err) {
            console.log('Skill create err:', err);
            res.status(500).send({
                error: 'Create skill incorrect',
            });
        }
    },
    // edit skill, suspend, active
    async put(req, res) {
        try {
            await Skill.update(req.body, {
                where: {
                    id: req.params.skillId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update skill incorrect'
            })
        }
    },
    // delete skill
    async remove(req, res) {
        try {
            const skill = await Skill.findOne({
                where: {
                    id: req.params.skillId
                }
            })
            if (!skill) {
                return res.status(403).send({
                    error: 'The skill information was incorrect'
                })
            }
            await skill.destroy()
            res.send(skill)
        } catch (err) {
            res.status(500).send({
                error: 'The skill information was incorrect'
            })
        }
    },
    // get skill by id
    async show(req, res) {
        try {
            const skill = await Skill.findByPk(req.params.skillId)
            res.send(skill)
        } catch (err) {
            req.status(500).send({
                error: 'The skill information was incorrect'
            })
        }
    }
}