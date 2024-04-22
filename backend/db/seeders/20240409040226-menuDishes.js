'use strict';

const {MenuDish, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
options.tableName = 'MenuDishes';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "MenuDishes"; 
    return queryInterface.bulkInsert(options, [
      
      {
        restaurantId: 3,
        dishCategory: 'DIPS & MEZES',
        dishName: 'HUMMUS',
        dishIngredients: 'toasted garbanzo beans, tahini, garlic, cumin & sumac',
        dishPrice: 10,
        dishCalories: 50,
        dishAllergies: 'nuts'
      },
      {
        restaurantId: 3,
        dishCategory: 'DIPS & MEZES',
        dishName: 'SMOKED EGGPLANT WITH GARLIC YOGHURT',
        dishIngredients: 'smoky roasted eggplant, labne, garlic, parsley flakes, sumac',
        dishPrice: 10,
        dishCalories: 80,
        dishAllergies: 'nuts'
      },
      {
        restaurantId: 3,
        dishCategory: 'DIPS & MEZES',
        dishName: 'PERA DIP TRIO',
        dishIngredients: 'hummus, smoked eggplant and spicy pepper “muammara” ',
        dishPrice: 17,
        dishCalories: 120,
        dishAllergies: 'nuts'
      },
      {
        restaurantId: 3,
        dishCategory: 'SALADS',
        dishName: 'VILLAGE SALAD',
        dishIngredients: 'cherry tomato, cucumber, parsley, onion, kalamata olives, feta cheese, red wine vinaigrette',
        dishPrice: 17,
        dishCalories: 150,
        dishAllergies: 'none'
      },
      {
        restaurantId: 3,
        dishCategory: 'SALADS',
        dishName: 'WATERMELON & FETA',
        dishIngredients: 'fresh basil, freshly-pressed grape “saba”, extra virgin olive oil',
        dishPrice: 17,
        dishCalories: 150,
        dishAllergies: 'none'
      },
      {
        restaurantId: 3,
        dishCategory: 'MAIN PLATES',
        dishName: 'PERA ORGANIC BEEF BURGER',
        dishIngredients: 'calabrian chili aioli, Turkish slaw, Brick City Brioche bun, Mediterranean fries / add Kasseri cheese +2',
        dishPrice: 21,
        dishCalories: 350,
        dishAllergies: 'nuts, soy'
      },
      {
        restaurantId: 3,
        dishCategory: 'MAIN PLATES',
        dishName: 'PAN-ROASTED SALMON',
        dishIngredients: 'butternut squash risotto, fennel pollen yoghurt and sage',
        dishPrice: 29,
        dishCalories: 280,
        dishAllergies: 'nuts, soy'
      },
      {
        restaurantId: 3,
        dishCategory: 'MAIN PLATES',
        dishName: 'WINTER KALE GNOCCHI',
        dishIngredients: 'creamy kale pesto, roasted black walnuts, aged Parmigiano Reggiano',
        dishPrice: 24,
        dishCalories: 380,
        dishAllergies: 'nuts, soy'
      },
      {
        restaurantId: 2,
        dishCategory: 'PASTA',
        dishName: 'LASAGNE EMILIANE',
        dishIngredients: 'Housemade Lasagna Sheets, Pork and Beef Ragù alla Bolognese,Bechamel',
        dishPrice: 24,
        dishCalories: 350,
        dishAllergies: 'nuts'
      },
      {
        restaurantId: 2,
        dishCategory: 'PASTA',
        dishName: 'GNOCCHI AL PESTO',
        dishIngredients: 'Housemade Potato Gnocchi, Basil Pesto',
        dishPrice: 26,
        dishCalories: 480,
        dishAllergies: 'nuts'
      },
      {
        restaurantId: 2,
        dishCategory: 'PASTA',
        dishName: 'BUCATINI CACIO E PEPE',
        dishIngredients: 'Afeltra Bucatini, Genuine Fulvi Pecorino Romano DOP, Freshly Ground Black Pepper ',
        dishPrice: 29,
        dishCalories: 340,
        dishAllergies: 'nuts'
      },
      {
        restaurantId: 2,
        dishCategory: 'PIZZA',
        dishName: 'MARGHERITA VERACE TSG',
        dishIngredients: 'San Marzano Tomato Sauce, Buffalo Mozzarella, Basil, Extra Virgin Olive Oil',
        dishPrice: 20,
        dishCalories: 590,
        dishAllergies: 'none'
      },
      {
        restaurantId: 2,
        dishCategory: 'PIZZA',
        dishName: 'QUATTRO FORMAGGI',
        dishIngredients: 'Buffalo Mozzarella, Pecorino Romano DOP, Gorgonzola Dolce DOP, Grana Padano DOP, Basil, Extra Virgin Olive Oil',
        dishPrice: 22,
        dishCalories: 680,
        dishAllergies: 'none'
      },
      {
        restaurantId: 2,
        dishCategory: 'PIZZA',
        dishName: 'DELICATA',
        dishIngredients: 'Yellow Squash Purée, Buffalo Mozzarella, Yellow Squash Chips, Shaved Pecorino Romano, Basil, Extra Virgin Olive Oil',
        dishPrice: 25,
        dishCalories: 840,
        dishAllergies: 'nuts, soy'
      },
      
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'MenuDishes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      restaurantId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
