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
        reviewUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/02/01/5628457_Cantonese-Lobster-Tail_s4x3.jpg.rend.hgtvcom.616.462.suffix/1612202405678.jpeg',
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
        reviewUrl: 'https://www.eatthis.com/wp-content/uploads/sites/4/2019/01/vegetarian-grilled-mexican-style-corn.jpg?quality=82&strip=1https://www.tasteofhome.com/wp-content/uploads/2023/11/TOHcom23_273591_DR_06_29_7b-mexican-street-corn-TMB-studio-SQ.jpg',
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
        reviewUrl: 'https://www.seriouseats.com/thmb/EZN3Vqlkeh_-ZxsFV1_TiVvlIVw=/450x300/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2014__09__20140903-turkish-sweets-baklava-robyn-lee-10-bc9b8a4dd4884d4fa465469548c19437.jpg',
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
