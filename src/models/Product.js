const { Model, DataTypes } = require('sequelize');

class Product extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.TEXT
        }, {
            sequelize: connection
        });
    }
}

module.exports = Product;