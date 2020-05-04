const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
const ProductPurchase = require('../models/ProductPurchase')

const connection = new Sequelize(dbConfig);

User.init(connection);
Product.init(connection);
Purchase.init(connection);
ProductPurchase.init(connection);

User.associate(connection.models);
Purchase.associate(connection.models);

module.exports = connection;
