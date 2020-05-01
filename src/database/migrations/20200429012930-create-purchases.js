'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('purchases', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        request_number: {
          type: Sequelize.STRING,
          allowNull: false
        },
        datetime: {
          type: Sequelize.DATE,
          allowNull: false
        },
        // One of the business rules of this app is to use different email addresses for each purchase
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM([
            'orderPlaced',
            'paymentMade',
            'paymentConfirmed',
            'forwardedProduct', 
            'productReceived',
            'orderCanceled']),
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('purchases');
  }
};
