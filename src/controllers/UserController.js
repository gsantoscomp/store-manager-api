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
            const { id } = req.params;
            const user = await User.findByPk(id);

            return res.json(user);
        } catch(error) {
            return res.json(error.message);
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { username, name } = req.body;
            await User.update({ username, name },{
                where: {
                    id: id
                }
            });

            const user = User.findByPk(id);
            
            return res.json(user);
        } catch(error) {
            return res.json(error);
        }
    },

    async destroy(req, res) {
        try {
            const { id } = req.params;

            await User.destroy({
                where: {
                    id: id
                }
            })
    
            const users = await User.findAll();
            
            return res.json(users);
        } catch(error) {
            return res.json(error);
        }
    }
}
