const { Model, DataTypes } = require('sequelize');

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
                'orderPlaced',
                'paymentMade',
                'paymentConfirmed',
                'forwardedProduct', 
                'productReceived',
                'orderCanceled'
            ])
        }, {sequelize: connection});
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
    }


}

module.exports = Purchase;