const Product = require('../models/Product');

module.exports = {
    async index(req, res) {
        try {
            const products = await Product.findAll();

            return res.json(products);
        } catch (error) {
            return res.json(error);
        }
    },

    async store(req, res) {
        try {
            const { name, description } = req.body;
            const product = await Product.create({name, description});

            return res.json(product);
        } catch (error) {
            return res.json(error);
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id)

            return res.json(product);
        } catch (error) {
            return res.json(error);
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            await Product.update({ name, description }, {
                where: {
                    id: id
                }
            });

            const product = await Product.findByPk(id)

            return res.json(product);
        } catch (error) {
            return res.json(error);
        }
    },

    async destroy(req, res) {
        try {
            const { id } = req.params;
            await Product.destroy({
                where: {
                    id: id
                }
            });

            const products = await Product.findAll();

            return res.json(products);
        } catch (error) {
            return res.json(error);
        }
    },
}