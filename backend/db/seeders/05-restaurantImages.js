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
        restaurantUrl: 'https://noburestaurants.com/assets/Downtown/Private-Events/Nobu-Downtown_DiningRoom_Eric-Laignel.jpg'
        // restaurantUrl: 'https://www.meatlovessalt.com/wp-content/uploads/2013/04/IMG_8958_630.jpg'
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
        restaurantUrl: 'https://www.newyorkbyrail.com/wp-content/uploads/2018/04/Eataly-in-Downtown-NYC.jpg'
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
        restaurantUrl: 'https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg?cs=srgb&dl=pexels-fariphotography-803963.jpg&fm=jpg'
      },
      {
        restaurantId: 2,
        restaurantUrl: 'https://thumbs.dreamstime.com/b/pizza-rustic-italian-mozzarella-cheese-basil-leaves-35669930.jpg'
      },
      {
        restaurantId: 2,
        restaurantUrl: 'https://d1ralsognjng37.cloudfront.net/f7eb2f5f-e44c-4ac3-aa4d-b20ad863c2bc.jpeg'
      },
      {
        restaurantId: 3,
        restaurantUrl: 'https://www.fsrmagazine.com/wp-content/uploads/2023/11/Rosa20Mexicano-1480x832.jpeg'
      },
      {
        restaurantId: 3,
        restaurantUrl: 'https://t3.ftcdn.net/jpg/01/08/74/94/360_F_108749462_n5gFesQla84wyfXTDUEG8zNochvWQXx4.jpg'
      },
      {
        restaurantId: 3,
        restaurantUrl: 'https://dailytaco.com/wp-content/uploads/2021/11/Home-Tacos.jpg'
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
        restaurantUrl: 'https://s3-media2.fl.yelpcdn.com/bphoto/LAvPyto3obvHvN7_1dPreA/l.jpg'
      },
      {
        restaurantId: 4,
        restaurantUrl: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Spanakopita-Pinwheels_EXPS_THMBRDS19_91125_C10_03_3b.jpg'
        // restaurantUrl: 'https://www.foodrepublic.com/img/gallery/7-things-you-didnt-know-about-hummus/l-intro-1686931598.jpg'
      },
      {
        restaurantId: 4,
        restaurantUrl: 'https://bigseventravel.com/wp-content/uploads/2020/07/Mediterranean-dishes.png'
        // restaurantUrl: 'https://t3.ftcdn.net/jpg/02/68/78/28/360_F_268782859_fmLoMazNerGOYNUwwLDZStYyaHOLQvyv.jpg'
      },
      {
        restaurantId: 4,
        restaurantUrl: 'https://glutenfreecuppatea.co.uk/wp-content/uploads/2018/05/gluten-free-stuffed-aubergine-recipe-low-fodmap-vegan-4.jpg'
      },
      {
        restaurantId: 4,
        restaurantUrl: 'https://www.pcrm.org/sites/default/files/Grilled%20Tofu%20with%20Smoky%20Barbecue%20Sauce_0.jpg'
      },
      {
        restaurantId: 4,
        restaurantUrl: 'https://610city.com/wp-content/uploads/2024/05/needed-mediterranean-dishes-you-have-to-tryjpg-9.jpg'
      },
      {
        restaurantId: 5,
        restaurantUrl: 'https://www.eatout.co.za/wp-content/uploads/2013/11/2023-01-08.jpeg'
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
      {
        restaurantId: 6,
        restaurantUrl: 'https://cititour.com/NYC_News/photos/Metropolis_by_Marcus_Samuelsson,_Restaurant,_NYC_1.jpg'
      },
      {
        restaurantId: 6,
        restaurantUrl: 'https://toriavey.com/images/2019/01/P1288273.jpg'
      },
      {
        restaurantId: 6,
        restaurantUrl: 'https://www.kitchensanctuary.com/wp-content/uploads/2021/05/Double-Cheeseburger-square-FS-42.jpg'
      },
      {
        restaurantId: 6,
        restaurantUrl: 'https://thelemonapron.com/wp-content/uploads/2016/07/IMG_9270-e1468000440784.jpg'
      },
      {
        restaurantId: 6,
        restaurantUrl: 'https://nishkitchen.com/wp-content/uploads/2012/09/Spinach-Omelette-1B-480x360.jpg'
      },
      {
        restaurantId: 6,
        restaurantUrl: 'https://www.shahrekado.com/blog/en/wp-content/uploads/2022/01/be176f4f5180cb24a4c2e8a706472a0b.jpeg'
      },
      {
        restaurantId: 7,
        restaurantUrl: 'https://i.pinimg.com/originals/1f/a5/fd/1fa5fdd48df454e596f982a0f1c7a258.jpg'
      },
      {
        restaurantId: 7,
        restaurantUrl: 'https://www.foodnetwork.com/content/dam/images/food/fullset/2019/1/07/0/KC1911_Bucatini-al-Limone_s4x3.jpg'
      },
      {
        restaurantId: 7,
        restaurantUrl: 'https://ordinaryvegan.net/wp-content/uploads/2014/06/thai-grilled-tofu-vegetables-shish-kebab.jpg'
      },
      {
        restaurantId: 7,
        restaurantUrl: 'https://cdn.pixabay.com/photo/2024/02/24/23/22/ai-generated-8594917_640.jpg'
      },
      {
        restaurantId: 7,
        restaurantUrl: 'https://img.freepik.com/premium-photo/fork-is-holding-fork-that-has-meat-it-word-spaghetti-it_25996-2451.jpg'
      },
      {
        restaurantId: 7,
        restaurantUrl: 'https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2017/08/25/0ecd2370fa024856bb28984f588811d6_Bomboloni.jpg'
      },
      {
        restaurantId: 8,
        restaurantUrl: 'https://usmenuguide.com/wp-content/uploads/2024/01/KellariTavernanewyorkhappyhour.jpg'
        // restaurantUrl: 'https://domesticfits.com/wp-content/uploads/2023/11/greek-food-Moussaka-640x427.jpeg'
      },
      {
        restaurantId: 8,
        restaurantUrl: 'https://www.unicornsinthekitchen.com/wp-content/uploads/2020/01/Chicken-souvlaki.jpg'
      },
      {
        restaurantId: 8,
        restaurantUrl: 'https://worldwildschooling.com/wp-content/uploads/2023/04/Lachanodolmades_378088267-1024x880.jpg'
      },
      {
        restaurantId: 8,
        restaurantUrl: 'https://cxgveiouca.cloudimg.io/familyhotelfinder.com/wp-content/uploads/Traditional-Greek-foods-to-try-in-Greece-SH-Souvlaki.jpg'
      },
      {
        restaurantId: 8,
        restaurantUrl: 'https://domesticfits.com/wp-content/uploads/2023/11/greek-food-gyros-640x427.jpeg'
      },
      {
        restaurantId: 8,
        restaurantUrl: 'https://www.tastingtable.com/img/gallery/the-historic-difference-between-ale-and-beer/intro-1664830467.jpg'
      },
      {
        restaurantId: 9,
        restaurantUrl: 'https://images.squarespace-cdn.com/content/v1/55fd7c6de4b0209899c56252/1459462473457-KZUSIF52JBB90Y71B7H9/image-asset.jpeg'
      },
      {
        restaurantId: 9,
        restaurantUrl: 'https://falasteenifoodie.com/wp-content/uploads/2022/11/Best-Fried-Lebanese-Kubbeh-Recipe.jpeg'
      },
      {
        restaurantId: 9,
        restaurantUrl: 'https://domesticfits.com/wp-content/uploads/2023/05/lebanese-food-ingredients-fresh-640x427.jpg'
      },
      {
        restaurantId: 9,
        restaurantUrl: 'https://www.willflyforfood.net/wp-content/uploads/2021/06/lebanese-food-falafel.jpg'
      },
      {
        restaurantId: 9,
        restaurantUrl: 'https://ourplantbasedworld.com/wp-content/uploads/2021/03/IMG_6639-1200x1200-1.jpg'
      },
      {
        restaurantId: 9,
        restaurantUrl: 'https://i.pinimg.com/736x/33/3e/e6/333ee6251138a76d1f4d0720ff1a5c5c.jpg'
      },
      {
        restaurantId: 10,
        restaurantUrl: 'https://media.timeout.com/images/105678124/image.jpg'
      },
      {
        restaurantId: 10,
        restaurantUrl: 'https://alldayidreamaboutfood.com/wp-content/uploads/2023/05/Death-by-Keto-Chocolate-Cake.jpg'
      },
      {
        restaurantId: 10,
        restaurantUrl: 'https://img.freepik.com/free-photo/fresh-coffee-steams-wooden-table-close-up-generative-ai_188544-8923.jpg'
      },
      {
        restaurantId: 10,
        restaurantUrl: 'https://www.lacademie.com/wp-content/uploads/2022/01/finger-bread-for-appetizer.jpg'
      },
      {
        restaurantId: 10,
        restaurantUrl: 'https://img.freepik.com/premium-photo/macro-photo-focaccia-bread-stone-rustic-pub-generative-ai_918839-5179.jpg'
      },
      {
        restaurantId: 10,
        restaurantUrl: 'https://assets.editorial.aetnd.com/uploads/2012/07/pizza-gettyimages-638790274.jpg'
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
