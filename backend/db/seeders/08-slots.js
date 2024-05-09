'use strict';

const {Slot, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Slot.bulkCreate([
      {
        restaurantId: 1,
        slotStartTime: '06:30',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 1,
        slotStartTime: '07:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 1,
        slotStartTime: '07:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 1,
        slotStartTime: '08:00',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 1,
        slotStartTime: '08:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 1,
        slotStartTime: '09:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 1,
        slotStartTime: '09:30',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 1,
        slotStartTime: '10:00',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 2,
        slotStartTime: '06:30',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 2,
        slotStartTime: '07:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 2,
        slotStartTime: '07:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 2,
        slotStartTime: '08:00',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 2,
        slotStartTime: '08:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 2,
        slotStartTime: '09:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 2,
        slotStartTime: '09:30',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 2,
        slotStartTime: '10:00',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 3,
        slotStartTime: '06:30',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 3,
        slotStartTime: '07:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 3,
        slotStartTime: '07:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 3,
        slotStartTime: '08:00',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 3,
        slotStartTime: '08:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 3,
        slotStartTime: '09:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 3,
        slotStartTime: '09:30',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 3,
        slotStartTime: '10:00',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 4,
        slotStartTime: '06:30',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 4,
        slotStartTime: '07:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 4,
        slotStartTime: '07:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 4,
        slotStartTime: '08:00',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 4,
        slotStartTime: '08:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 4,
        slotStartTime: '09:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 4,
        slotStartTime: '09:30',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 4,
        slotStartTime: '10:00',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 5,
        slotStartTime: '06:30',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 5,
        slotStartTime: '07:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 5,
        slotStartTime: '07:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 5,
        slotStartTime: '08:00',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 5,
        slotStartTime: '08:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 5,
        slotStartTime: '09:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 5,
        slotStartTime: '09:30',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 5,
        slotStartTime: '10:00',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 6,
        slotStartTime: '06:30',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 6,
        slotStartTime: '07:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 6,
        slotStartTime: '07:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 6,
        slotStartTime: '08:00',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 6,
        slotStartTime: '08:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 6,
        slotStartTime: '09:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 6,
        slotStartTime: '09:30',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 6,
        slotStartTime: '10:00',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 7,
        slotStartTime: '06:30',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 7,
        slotStartTime: '07:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 7,
        slotStartTime: '07:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 7,
        slotStartTime: '08:00',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 7,
        slotStartTime: '08:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 7,
        slotStartTime: '09:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 7,
        slotStartTime: '09:30',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 7,
        slotStartTime: '10:00',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 8,
        slotStartTime: '06:30',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 8,
        slotStartTime: '07:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 8,
        slotStartTime: '07:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 8,
        slotStartTime: '08:00',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 8,
        slotStartTime: '08:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 8,
        slotStartTime: '09:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 8,
        slotStartTime: '09:30',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 8,
        slotStartTime: '10:00',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 9,
        slotStartTime: '06:30',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 9,
        slotStartTime: '07:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 9,
        slotStartTime: '07:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 9,
        slotStartTime: '08:00',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 9,
        slotStartTime: '08:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 9,
        slotStartTime: '09:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 9,
        slotStartTime: '09:30',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 9,
        slotStartTime: '10:00',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 10,
        slotStartTime: '06:30',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 10,
        slotStartTime: '07:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 10,
        slotStartTime: '07:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 10,
        slotStartTime: '08:00',
        slotDuration:  30,
        tableCapacity: 4,
        tableNum: 1
      },
      {
        restaurantId: 10,
        slotStartTime: '08:30',
        slotDuration:  30,
        tableCapacity: 5,
        tableNum: 3
      },
      {
        restaurantId: 10,
        slotStartTime: '09:00',
        slotDuration:  30,
        tableCapacity: 3,
        tableNum: 2
      },
      {
        restaurantId: 10,
        slotStartTime: '09:30',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      {
        restaurantId: 10,
        slotStartTime: '10:00',
        slotDuration:  30,
        tableCapacity: 6,
        tableNum: 4
      },
      
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Slots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      restaurantId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
    }, {});
  }
};
