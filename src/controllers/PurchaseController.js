const User = require('../models/User');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
const ProductPurchase = require('../models/ProductPurchase');

module.exports = {
    async index(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findByPk(user_id);

            if (!user) {
                return res.status(400).json('User not found!');
            }
            
            const purchases = await Purchase.findAll({
                where: {user_id},
                include: [{
                    model: Product,
                    as: 'products',
                    through: {attributes: ['product_value', 'product_quantity']}
                }]
            });

            return res.json(purchases);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async store(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findByPk(user_id);

            if (!user) {
                return res.status(400).json('User not found!');
            }

            // productsData = [{ product_id, product_value, product_quantity }];
            const { request_number, datetime, email, status, productsData } = req.body;
            const purchase = await Purchase.create({
                request_number, datetime, email, status, user_id
            });

            let productsPurchase = productsData.map(product => {
                product['purchase_id'] = purchase.id;

                return product;
            });

            await ProductPurchase.bulkCreate(productsPurchase);

            return res.json(purchase);
        } catch (error) {
            return res.status(500).json(error);
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
            const purchase = await Purchase.findByPk(id, {
                include: [{ 
                    model: Product,
                    as: 'products',
                    through: {attributes: ['product_value', 'product_quantity']}
                }]
            });

            if (!purchase) {
                return res.status(404).json('Purchase not found!')
            }
        
            return res.json(purchase);
        } catch (error) {
            return res.status(500).json(error);
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
            const purchase =  await Purchase.findByPk(id, {
                include: [{ 
                    model: Product,
                    as: 'products',
                    through: {attributes: ['product_value', 'product_quantity']}
                }]
            });

            if (!purchase) {
                return res.status(400).json('Purchase not found');
            }

            const { request_number, datetime, email, status, productsData } = req.body;

            if (productsData.length) {
                let productsPurchase = productsData.map(product => {
                    product['purchase_id'] = purchase.id;

                    return product;
                });

                await purchase.setProducts([]);
                await ProductPurchase.bulkCreate(productsPurchase);
            }

            const updatedPurchase = await Purchase.update({
                request_number, datetime, email, status, user_id
            }, {
                where: { id },
                returning: true
            });            

            return res.json(updatedPurchase);
        } catch (error) {
            return res.status(500).json(error);
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
            return res.status(500).json(error);
        }
    },
}