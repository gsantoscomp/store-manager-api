const dbConfig = require('../config/database');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || "development";

const User = require('../models/User');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
const ProductPurchase = require('../models/ProductPurchase')

console.log(env);

const connection = new Sequelize(dbConfig[env].url, {
    define: { timestamps: true, underscored: true }
});

User.init(connection);
Product.init(connection);
Purchase.init(connection);
ProductPurchase.init(connection);

User.associate(connection.models);
Product.associate(connection.models);
Purchase.associate(connection.models);

module.exports = connection;
