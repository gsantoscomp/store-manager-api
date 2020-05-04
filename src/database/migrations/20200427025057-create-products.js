'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('products', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        purchase_price: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        sale_price:   {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT
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
      return queryInterface.dropTable('products');
  }
};
