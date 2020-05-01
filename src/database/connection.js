const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');

const connection = new Sequelize(dbConfig);

User.init(connection);
Product.init(connection);
Purchase.init(connection);

User.associate(connection.models);
Purchase.associate(connection.models);

module.exports = connection;
