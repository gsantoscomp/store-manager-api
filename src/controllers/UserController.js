const User = require('../models/User');
const Purchase = require('../models/Purchase');

module.exports = {
    async index(req, res) {
        try {
            const users =  await User.findAll({
                include: [{
                    model: Purchase,
                    as: 'purchases'
                }]
            });

            return res.json(users);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    },

    async store(req, res) {
        try {
            const { username, name } = req.body;
            const user = await User.create({
                username,
                name
            });

            return res.json(user);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json('User not Found!');
            }

            return res.json(user);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(400).json('User not found');
            }

            const { username, name } = req.body;
            const updatedUser = await User.update({ username, name },{
                where: { id }, 
                returning: true
            });

            return res.json(updatedUser);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    },

    async destroy(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(400).json('User not found!');
            }

            await User.destroy({where: { id }});

            return res.json();
        } catch(error) {
            return res.status(500).json(error.message);s
        }
    }
}
