const User = require('../models/User');

module.exports = {
    async index(req, res) {
        try {
            const users =  await User.findAll();

            return res.json(users);
        } catch(error) {
            return res.json(error.message);
        }
    },

    async store(req, res) {
        try {
            const { username, name} = req.body;
            const user = await User.create({
                username,
                name
            });

            return res.json(user);
        } catch(error) {
            return res.json(error.message);
        }
    },

    async show(req, res) {
        try {
            const user = await User.findByPk(req.params.id);

            return res.json(user);
        } catch(error) {
            return res.json(error.message);
        }
    },

    async update(req, res) {
        try {
            const { username, name } = req.body;
            const user = await User.update({ username, name },{
                where: {
                    id: req.params.id
                }
            });

            return res.json(user);
        } catch(error) {
            return res.json(error);
        }
    },

    async destroy(req, res) {
        try {
            await User.destroy({
                where: {
                    id: req.params.id
                }
            })
    
            const users = await User.findAll();
            
            return res.json(users);
        } catch(error) {
            return res.json(error);
        }
    }
}
