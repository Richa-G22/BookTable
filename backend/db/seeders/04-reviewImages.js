'use strict';

const {ReviewImage, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        reviewUrl: 'https://www.happyfoodstube.com/wp-content/uploads/2016/03/homemade-sushi-image.jpg',
      },
      {
        reviewId: 2,
        reviewUrl: 'https://dailybreadmiami.com/wp-content/uploads/daily-bread-miami-middle-east-kitchen-market-scaled.jpg',
      },
      {
        reviewId: 3,
        reviewUrl: 'https://miro.medium.com/v2/resize:fit:1400/0*oTfm1pTXLxitHHFy.jpg',
      },
      {
        reviewId: 4,
        reviewUrl: 'https://www.jocooks.com/wp-content/uploads/2018/12/creamy-tomato-chicken-pasta-1-20.jpg',
      },
      {
        reviewId: 5,
        reviewUrl: 'https://insanelygoodrecipes.com/wp-content/uploads/2022/10/Homemade-Vegan-Mexican-Beef-Tacos-with-Herbs.jpg',
      },
      {
        reviewId: 6,
        reviewUrl: 'https://images.everydayhealth.com/images/diabetes/type-2-diabetes/is-the-mediterranean-diet-best-for-diabetes-1440x810.jpg',
      },
      {
        reviewId: 7,
        reviewUrl: 'https://www.caravankebab.com/wp-content/uploads/2020/01/IMG_2454.jpg',
      },
      {
        reviewId: 8,
        reviewUrl: 'https://minimalistbaker.com/wp-content/uploads/2016/07/The-Ultimate-Mediterranean-Bowl-SQUARE.jpg',
      },
      {
        reviewId: 9,
        reviewUrl: 'https://cdn.travelatelier.com/wp-content/uploads/2017/06/story-turkish-food.jpg',
      },
      {
        reviewId: 10,
        reviewUrl: 'https://ozlemsturkishtable.com/files/2020/03/Ozlem_Shot_38_0331_-700x559.jpg',
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
