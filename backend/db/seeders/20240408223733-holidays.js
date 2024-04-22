'use strict';

const {Holiday, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
options.tableName = 'Holidays';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Holidays"; 
    return queryInterface.bulkInsert(options, [
      {
        restaurantId: 1,
        occasion: 'Christmas'
      },
      {
        restaurantId: 1,
        occasion: 'New Year'
      },
      {
        restaurantId: 1,
        occasion: 'Thanksgiving Day'
      },
      {
        restaurantId: 2,
        occasion: 'Christmas'
      },
      {
        restaurantId: 2,
        occasion: 'New Year'
      },
      {
        restaurantId: 2,
        occasion: 'Thanksgiving Day'
      },
      {
        restaurantId: 2,
        occasion: "President's Day"
      },
      {
        restaurantId: 3,
        occasion: 'New Year'
      },
      {
        restaurantId: 3,
        occasion: 'Thanksgiving Day'
      },
      {
        restaurantId: 3,
        occasion: 'Christmas'
      },
      {
        restaurantId: 4,
        occasion: 'New Year'
      },
      {
        restaurantId: 4,
        occasion: 'Thanksgiving Day'
      },
      {
        restaurantId: 4,
        occasion: 'Christmas'
      },
      {
        restaurantId: 5,
        occasion: 'New Year'
      },
      {
        restaurantId: 5,
        occasion: 'Thanksgiving Day'
      },
      {
        restaurantId: 5,
        occasion: 'Christmas'
      },
      {
        restaurantId: 5,
        occasion: "President's Day"
      },
      
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Holidays';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      restaurantId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
