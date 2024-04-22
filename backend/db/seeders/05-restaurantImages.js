'use strict';

const {RestaurantImage, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await RestaurantImage.bulkCreate([
      {
        restaurantId: 1,
        restaurantUrl: 'https://www.meatlovessalt.com/wp-content/uploads/2013/04/IMG_8958_630.jpg'
      },
      {
        restaurantId: 1,
        restaurantUrl: 'https://miro.medium.com/v2/resize:fit:1200/1*pvsZ4cxZzniGgBCyyiItXA.png'
      },
      {
        restaurantId: 1,
        restaurantUrl: 'https://pg.world/upl/ckeditor4_files/904e4e9ce648ba13dcab83feceb3c4e2.jpeg'
      },
      {
        restaurantId: 1,
        restaurantUrl: 'https://resizer.otstatic.com/v2/photos/xlarge/1/63936232.jpg'
      },
      {
        restaurantId: 1,
        restaurantUrl: 'https://www.tastingtable.com/img/gallery/20-japanese-dishes-you-need-to-try-at-least-once/l-intro-1664219638.jpg'
      },
      {
        restaurantId: 1,
        restaurantUrl: 'https://s1.it.atcdn.net/wp-content/uploads/2013/05/Tokyo-by-tastebuds.jpg'
      },
      {
        restaurantId: 2,
        restaurantUrl: 'https://www.deliciousmagazine.co.uk/wp-content/uploads/2020/02/Best-Pizza-Restaurants-London-768x960.jpg'
      },
      {
        restaurantId: 2,
        restaurantUrl: 'https://t3.ftcdn.net/jpg/05/89/13/00/360_F_589130009_p1yBuSyHWbt8bXx6s54LbeJIfLs86955.jpg'
      },
      {
        restaurantId: 2,
        restaurantUrl: 'https://img.freepik.com/premium-photo/delicious-pizza-table_218381-27722.jpg?size=626&ext=jpg'
      },
      {
        restaurantId: 2,
        restaurantUrl: 'https://www.rayspizza.com/wp-content/uploads/2019/10/mushroom-olive-pizza.jpg'
      },
      {
        restaurantId: 2,
        restaurantUrl: 'https://popmenucloud.com/cdn-cgi/image/width=1200,height=630,format=auto,fit=cover/igrmdqve/faf6fd65-a01e-4b0c-b0cb-94ad6a5084f0.jpg'
      },
      {
        restaurantId: 2,
        restaurantUrl: 'https://d1ralsognjng37.cloudfront.net/f7eb2f5f-e44c-4ac3-aa4d-b20ad863c2bc.jpeg'
      },
      {
        restaurantId: 3,
        restaurantUrl: 'https://t3.ftcdn.net/jpg/01/08/74/94/360_F_108749462_n5gFesQla84wyfXTDUEG8zNochvWQXx4.jpg'
      },
      {
        restaurantId: 3,
        restaurantUrl: 'https://i0.wp.com/culturalfoodies.com/wp-content/uploads/2021/03/San-Pancho14.jpg?resize=1140%2C760&ssl=1https://www.elrincontx.com/wp-content/uploads/2023/07/tacos.jpg'
      },
      {
        restaurantId: 3,
        restaurantUrl: 'https://png.pngtree.com/background/20230611/original/pngtree-collection-of-mexican-food-dishes-picture-image_3168000.jpg'
      },
      {
        restaurantId: 3,
        restaurantUrl: 'https://png.pngtree.com/background/20230528/original/pngtree-restaurant-picture-image_2779734.jpg'
      },
      {
        restaurantId: 3,
        restaurantUrl: 'https://t3.ftcdn.net/jpg/05/99/98/20/360_F_599982035_3EeoKUxe7ani9ZmqWIwLNds6l2sbpXsE.jpg'
      },
      {
        restaurantId: 4,
        restaurantUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGWwFeDIFeOKhfJl7_2f_3O7NcMmy7OGPS30S7Z4wyZSuiYWMIHwS9cHdGKbW9xOjLGVY&usqp=CAUhttps://s3-media0.fl.yelpcdn.com/bphoto/R5uVwvXIQ7QCPxmvyBaHdA/1000s.jpg'
      },
      {
        restaurantId: 4,
        restaurantUrl: 'https://t3.ftcdn.net/jpg/02/68/78/28/360_F_268782859_fmLoMazNerGOYNUwwLDZStYyaHOLQvyv.jpg'
      },
      {
        restaurantId: 4,
        restaurantUrl: 'https://resizer.otstatic.com/v2/photos/wide-medium/1/30088829.png'
      },
      {
        restaurantId: 4,
        restaurantUrl: 'https://phoenicianrestaurant.com/wp-content/uploads/2024/02/lambs.png'
      },
      {
        restaurantId: 5,
        restaurantUrl: 'https://nomadsunveiled.com/wp-content/uploads/2022/02/turkish-kebab-meat.jpg'
      },
      {
        restaurantId: 5,
        restaurantUrl: 'https://t4.ftcdn.net/jpg/03/06/90/39/360_F_306903929_2Rve2F3EHSQlIs7y5pjMsbgflmDMhbDa.jpg'
      },
      {
        restaurantId: 5,
        restaurantUrl: 'https://www.177milkstreet.com/assets/site/turkish_minced_meat_kebabs_v.jpg'
      },
      {
        restaurantId: 5,
        restaurantUrl: 'https://cdn.pixabay.com/photo/2020/05/11/15/06/food-5158702_1280.jpg'
      },
      {
        restaurantId: 5,
        restaurantUrl: 'https://idsb.tmgrup.com.tr/ly/uploads/images/2020/09/04/56013.jpg'
      },
      {
        restaurantId: 5,
        restaurantUrl: 'https://i.pinimg.com/736x/de/c6/e2/dec6e2c5c3faeffd4ef92982011b03ad.jpg'
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'RestaurantImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      restaurantId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
