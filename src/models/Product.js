const { Model, DataTypes } = require('sequelize');

class Product extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            purchase_price: DataTypes.DOUBLE,
            sale_price: DataTypes.DOUBLE
        }, {
            sequelize: connection
        });
    }

    static associate(models) {
        this.belongsToMany(models.Purchase, {
            foreignKey: 'product_id', through: 'products_purchases', as: 'purchases'
        });
    }
}

module.exports = Product;