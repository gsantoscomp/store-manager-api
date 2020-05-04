'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('products_purchases', {
        purchase_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'purchases', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'purchases', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        // The value of the product may change at different purchases
        product_value: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        product_quantity: {
          type: Sequelize.INTEGER,
          allowNull: false  
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
