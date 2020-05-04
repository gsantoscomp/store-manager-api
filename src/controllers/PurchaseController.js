const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const User = require('../models/User');

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

            // productsData = [{ productId, productPrice, productQuantity }];
            const { request_number, datetime, email, status, productsData } = req.body;
            const purchase = await Purchase.create({
                request_number, datetime, email, status, user_id
            });

            const productsIds = productsData.map(product => {
                return product.productId;
            });

            const products = await Product.findAll({
                where: {id: productsIds}
            });

            // A row will be inserted in the junction table "products_purchases" for each product purchased
            products.forEach(async (product) => {
                const selectedProduct = productsData.filter(productData => {
                    return product.id == productData.productId;
                });

                await purchase.addProduct(product, {
                    through: {
                        product_value: selectedProduct[0].productPrice,
                        product_quantity: selectedProduct[0].productQuantity
                    }
                });
            });

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

            const { request_number, datetime, email, status } = req.body;
            const updatedPurchase = await Purchase.update({
                request_number, datetime, email, status, user_id
            }, {
                where: { id },
                returning: true
            });

            return res.json(updatedPurchase);
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