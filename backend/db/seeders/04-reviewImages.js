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
      {
        reviewId: 11,
        reviewUrl: 'https://recipes.net/wp-content/uploads/2024/01/how-to-eat-burgers-in-restaurants-1706245153.jpg',
      },
      {
        reviewId: 12,
        reviewUrl: 'https://www.carolynscooking.com/wp-content/uploads/2024/01/Loaded-Bacon-Cheese-Fries-3.jpg',
      },
      {
        reviewId: 13,
        reviewUrl: 'https://www.chefspencil.com/wp-content/uploads/Gnocchi-1.jpg',
      },
      {
        reviewId: 14,
        reviewUrl: 'https://www.bonappetour.com/blog/wp-content/uploads/2015/03/1426576690-7820792-1030x521.jpeg',
      },
      {
        reviewId: 15,
        reviewUrl: 'https://www.rd.com/wp-content/uploads/2018/03/13-Foods-Worth-Trying-at-a-Greek-Restaurant.jpg',
      },
      {
        reviewId: 16,
        reviewUrl: 'https://s3-media0.fl.yelpcdn.com/bphoto/RM-YmRsnc06C9EF-75MyfQ/1000s.jpg',
      },
      {
        reviewId: 17,
        reviewUrl: 'https://tastet.ca/wp-content/uploads/2020/04/restaurant-sumac-montreal-st-henri-13.jpg',
      },
      {
        reviewId: 18,
        reviewUrl: 'https://www.nogarlicnoonions.com/images/article_images/2018-07/knafeh-platter-lebanese-food-desert-with-cheese-and-syrup-maureen-abood-12018-07-12-09-37-33.jpg',
      },
      {
        reviewId: 19,
        reviewUrl: 'https://robbadamatti.com/wp-content/uploads/2015/02/pasta-03.jpg',
      },
      {
        reviewId: 20,
        reviewUrl: 'https://static8.depositphotos.com/1005629/806/i/450/depositphotos_8068134-stock-photo-pasta-with-olives-and-parsley.jpg',
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
    }, {});
  }
};
