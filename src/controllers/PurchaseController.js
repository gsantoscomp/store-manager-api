const Purchase = require('../models/Purchase');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findByPk(user_id);

            if (!user) {
                return res.status(400).json('User not found!');
            }
            
            const products = await Purchase.findAll({where: {user_id}});

            return res.json(products);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async store(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findByPk(user_id);

            if (!user) {
                return res.status(400).json('User not found!');
            }

            const { request_number, datetime, email, status } = req.body;
            const product = await Purchase.create({
                request_number, datetime, email, status, user_id
            });

            return res.json(product);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async show(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findByPk(user_id);

            if (!user) {
                return res.status(400).json('User not found!');
            }

            const { id } = req.params;
            const product = await Purchase.findByPk(id);

            if (!product) {
                return res.status(404).json('Purchase not found!')
            }

            return res.json(product);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async update(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findByPk(user_id);

            if (!user) {
                return res.status(400).json('User not found!');
            }

            const { id } = req.params;
            const purchase =  await Purchase.findByPk(id);

            if (!purchase) {
                return res.status(400).json('Purchase not found');
            }
            
            const { request_number, datetime, email, status } = req.body;
            const product = await Purchase.update({
                request_number, datetime, email, status, user_id
            }, {
                where: { id },
                returning: true
            });

            return res.json(product);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async destroy(req, res) {
        try {

            const { user_id } = req.params;
            const user = await User.findByPk(user_id);

            if (!user) {
                return res.status(400).json('User not found!');
            }

            const { id } = req.params;
            const purchase =  await Purchase.findByPk(id);

            if (!purchase) {
                return res.status(400).json('Purchase not found');
            }
            
            await Purchase.destroy({where: { id }});

            return res.json();
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
}