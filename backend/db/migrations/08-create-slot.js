'use strict';

let options = {};
options.tableName = 'Slots';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
} 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Slots', {
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
      slotStartTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      slotDuration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tableCapacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tableNum: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Slots');
  }
};