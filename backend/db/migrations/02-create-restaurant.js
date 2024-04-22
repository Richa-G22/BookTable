'use strict';

let options = {};
options.tableName = 'Restaurants';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      restaurantType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      zipCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cuisines: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      locationMapUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      dayClosed: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hoursOfOperation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avgMealPrice: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      parkingAvailability: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentOption: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dressCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      executiveChef: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      menuUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
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
    return queryInterface.dropTable(options);
  }
};