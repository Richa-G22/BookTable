'use strict';

let options = {};
options.tableName = 'MenuDishes';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MenuDishes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Restaurants',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      dishCategory: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dishName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dishIngredients: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dishPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      dishCalories: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dishAllergies: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MenuDishes');
  }
};