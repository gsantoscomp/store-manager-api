const { Model, DataTypes } = require('sequelize');

class ProductPurchase extends Model {
    static init(connection) {
        super.init({
            product_value: DataTypes.FLOAT,
            product_quantity: DataTypes.INTEGER
        }, {
            sequelize: connection,
            modelName: 'products_purchases'
        });
    }

}

module.exports = ProductPurchase;