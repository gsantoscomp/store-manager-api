const Product = require('../models/Product');

module.exports = {
    async index(req, res) {
        try {
            const products = await Product.findAll();

            return res.json(products);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async store(req, res) {
        try {
            const { name, purchasePrice, salePrice, description } = req.body;
            const product = await Product.create({
                name,
                description,
                purchase_price: purchasePrice,
                sale_price: salePrice 
            });

            return res.json(product);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id)

            if (!product) {
                return res.status(404).json('Product not found');
            }

            return res.json(product);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const product = Product.findByPk(id);

            if (!product) {
                return res.status(400).json('Product not found!');
            }

            const { name, description } = req.body;
            const updatedProduct = await Product.update({
                name,
                description,
                purchase_price: purchasePrice,
                sale_price: salePrice 
            }, {
                where: { id },
                returning: true
            });


            return res.json(updatedProduct);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async destroy(req, res) {
        try {
            const { id } = req.params;
            const product = Product.findByPk(id);

            if (!product) {
                return res.status(400).json('Product not found!');
            }
            
            await Product.destroy({where: { id }});

            return res.json();
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
}