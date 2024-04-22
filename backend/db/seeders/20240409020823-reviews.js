'use strict';

const {Review, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        restaurantId: 1,
        userId: 4,
        review: 'Amazing place. Totally enjoyed the food and the ambience',
        stars: 5
      },
      {
        restaurantId: 1,
        userId: 2,
        review: 'Amazing food.',
        stars: 4
      },
      {
        restaurantId: 2,
        userId: 3,
        review: 'Great place to get together and enjoy a meal',
        stars: 4
      },
      {
        restaurantId: 2,
        userId: 4,
        review: 'Nice',
        stars: 3
      },
      {
        restaurantId: 3,
        userId: 1,
        review: 'Loved the food. Will come again.',
        stars: 4
      },
      {
        restaurantId: 3,
        userId: 4,
        review: 'Good',
        stars: 3
      },
      {
        restaurantId: 4,
        userId: 1,
        review: 'Nice food',
        stars: 4
      },
      {
        restaurantId: 4,
        userId: 3,
        review: 'Could be better',
        stars: 3
      },
      {
        restaurantId: 5,
        userId: 3,
        review: 'Nice food',
        stars: 4
      },
      {
        restaurantId: 5,
        userId: 1,
        review: 'Totally enjoyed the kebabs.',
        stars: 4
      },
      
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      restaurantId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
