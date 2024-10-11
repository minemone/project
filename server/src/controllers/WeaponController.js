const { Weapon } = require('../models');

module.exports = {
    // get all weapon
    async index(req, res) {
        try {
            const weapons = await Weapon.findAll()
            res.send(weapons)
        } catch (err) {
            res.status(500).send({
                error: 'The weapons information was incorrect'
            })
        }
    },
    // create weapon
    async create(req, res) {
        // res.send(JSON.stringify(req.body))
        try {
            console.log('Weapon create req.body:',req.body)
            const weapon = await Weapon.create(req.body)
            console.log('Weapon create weapon:',weapon)
            res.send(weapon.toJSON())
        } catch (err) {
            console.log('Weapon create err:',err)
            res.status(500).send({
                error: 'Create weapon incorrect'
            })
        }
    },
    // edit weapon, suspend, active
    async put(req, res) {
        try {
            await Weapon.update(req.body, {
                where: {
                    id: req.params.weaponId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update weapon incorrect'
            })
        }
    },
    // delete weapon
    async remove(req, res) {
        try {
            const weapon = await Weapon.findOne({
                where: {
                    id: req.params.weaponId
                }
            })
            if (!weapon) {
                return res.status(403).send({
                    error: 'The weapon information was incorrect'
                })
            }
            await weapon.destroy()
            res.send(weapon)
        } catch (err) {
            res.status(500).send({
                error: 'The weapon information was incorrect'
            })
        }
    },
    // get weapon by id
    async show(req, res) {
        try {
            const weapon = await Weapon.findByPk(req.params.weaponId)
            res.send(weapon)
        } catch (err) {
            req.status(500).send({
                error: 'The weapon information was incorrect'
            })
        }
    }
}