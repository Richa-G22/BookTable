'use strict';

const {Booking, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
options.tableName = 'Bookings';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Bookings"; 
    return queryInterface.bulkInsert(options, [
      {
        restaurantId: 1,
        userId: 1,
        slotId: 1,
        bookingDate: '2024-04-15'
      },
      {
        restaurantId: 2,
        userId: 1,
        slotId: 10,
        bookingDate: '2024-04-10'
      },
      {
        restaurantId: 3,
        userId: 1,
        slotId: 18,
        bookingDate: "2024-04-17"
      },
      {
        restaurantId: 4,
        userId: 1,
        slotId: 25,
        bookingDate: "2024-04-18"
      },
      {
        restaurantId: 5,
        userId: 1,
        slotId: 34,
        bookingDate: "2024-04-19"
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
