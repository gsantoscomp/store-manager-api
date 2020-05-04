const { Model, DataTypes } = require('sequelize');
const Product = require('../models/Product');

class Purchase extends Model {
    static init(connection) {
        super.init({
            request_number: DataTypes.STRING,
            datetime: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
                email: DataTypes.STRING,
            status: DataTypes.ENUM([
                'orderPlaced', 'paymentMade','paymentConfirmed', 'forwardedProduct','productReceived','orderCanceled'
            ])
        }, {sequelize: connection});
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
        this.belongsToMany(models.Product, {
            foreignKey: 'purchase_id', through: 'products_purchases', as: 'products'
        });
    }


}

module.exports = Purchase;