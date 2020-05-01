const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            username: DataTypes.STRING,
            name: DataTypes.STRING
        }, {
            sequelize: connection
        });
    }

    static associate(models) {
        this.hasMany(models.Purchase, {foreignKey: 'user_id', as: 'purchases'});
    }


}

module.exports = User;