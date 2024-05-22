'use strict';

const {MenuDish, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await MenuDish.bulkCreate([
      
      {
        restaurantId: 3,
        dishCategory: 'DIPS & MEZES',
        dishName: 'HUMMUS',
        dishIngredients: 'toasted garbanzo beans, tahini, garlic, cumin & sumac',
        dishPrice: 10,
        dishCalories: 50,
        dishAllergies: 'nuts',
        spiceLevel: 1
      },
      { 
        restaurantId: 3,
        dishCategory: 'DIPS & MEZES',
        dishName: 'SMOKED EGGPLANT WITH GARLIC YOGHURT',
        dishIngredients: 'smoky roasted eggplant, labne, garlic, parsley flakes, sumac',
        dishPrice: 10,
        dishCalories: 80,
        dishAllergies: 'nuts',
        spiceLevel: 1
      },
      {
        restaurantId: 3,
        dishCategory: 'DIPS & MEZES',
        dishName: 'PERA DIP TRIO',
        dishIngredients: 'hummus, smoked eggplant and spicy pepper “muammara” ',
        dishPrice: 17,
        dishCalories: 120,
        dishAllergies: 'nuts',
        spiceLevel: 1
      },
      {
        restaurantId: 3,
        dishCategory: 'SALADS',
        dishName: 'VILLAGE SALAD',
        dishIngredients: 'cherry tomato, cucumber, parsley, onion, kalamata olives, feta cheese, red wine vinaigrette',
        dishPrice: 17,
        dishCalories: 150,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 3,
        dishCategory: 'SALADS',
        dishName: 'WATERMELON & FETA',
        dishIngredients: 'fresh basil, freshly-pressed grape “saba”, extra virgin olive oil',
        dishPrice: 17,
        dishCalories: 150,
        dishAllergies: 'none',
        spiceLevel: 1  
      },
      {
        restaurantId: 3,
        dishCategory: 'MAIN PLATES',
        dishName: 'PERA ORGANIC BEEF BURGER',
        dishIngredients: 'calabrian chili aioli, Turkish slaw, Brick City Brioche bun, Mediterranean fries / add Kasseri cheese +2',
        dishPrice: 21,
        dishCalories: 350,
        dishAllergies: 'nuts, soy',
        spiceLevel: 3
      },
      {
        restaurantId: 3,
        dishCategory: 'MAIN PLATES',
        dishName: 'PAN-ROASTED SALMON',
        dishIngredients: 'butternut squash risotto, fennel pollen yoghurt and sage',
        dishPrice: 29,
        dishCalories: 280,
        dishAllergies: 'nuts, soy',
        spiceLevel: 1
      },
      {
        restaurantId: 3,
        dishCategory: 'MAIN PLATES',
        dishName: 'WINTER KALE GNOCCHI',
        dishIngredients: 'creamy kale pesto, roasted black walnuts, aged Parmigiano Reggiano',
        dishPrice: 24,
        dishCalories: 380,
        dishAllergies: 'nuts, soy',
        spiceLevel: 1
      },
      {
        restaurantId: 2,
        dishCategory: 'PASTA',
        dishName: 'LASAGNE EMILIANE',
        dishIngredients: 'Housemade Lasagna Sheets, Pork and Beef Ragù alla Bolognese,Bechamel',
        dishPrice: 24,
        dishCalories: 350,
        dishAllergies: 'nuts',
        spiceLevel: 2
      },
      {
        restaurantId: 2,
        dishCategory: 'PASTA',
        dishName: 'GNOCCHI AL PESTO',
        dishIngredients: 'Housemade Potato Gnocchi, Basil Pesto',
        dishPrice: 26,
        dishCalories: 480,
        dishAllergies: 'nuts',
        spiceLevel: 2
      },
      {
        restaurantId: 2,
        dishCategory: 'PASTA',
        dishName: 'BUCATINI CACIO E PEPE',
        dishIngredients: 'Afeltra Bucatini, Genuine Fulvi Pecorino Romano DOP, Freshly Ground Black Pepper ',
        dishPrice: 29,
        dishCalories: 340,
        dishAllergies: 'nuts',
        spiceLevel: 1
      },
      {
        restaurantId: 2,
        dishCategory: 'PIZZA',
        dishName: 'MARGHERITA VERACE TSG',
        dishIngredients: 'San Marzano Tomato Sauce, Buffalo Mozzarella, Basil, Extra Virgin Olive Oil',
        dishPrice: 20,
        dishCalories: 590,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 2,
        dishCategory: 'PIZZA',
        dishName: 'QUATTRO FORMAGGI',
        dishIngredients: 'Buffalo Mozzarella, Pecorino Romano DOP, Gorgonzola Dolce DOP, Grana Padano DOP, Basil, Extra Virgin Olive Oil',
        dishPrice: 22,
        dishCalories: 680,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 2,
        dishCategory: 'PIZZA',
        dishName: 'DELICATA',
        dishIngredients: 'Yellow Squash Purée, Buffalo Mozzarella, Yellow Squash Chips, Shaved Pecorino Romano, Basil, Extra Virgin Olive Oil',
        dishPrice: 25,
        dishCalories: 840,
        dishAllergies: 'nuts, soy',
        spiceLevel: 3
      },
      {
        restaurantId: 10,
        dishCategory: 'PASTA',
        dishName: 'LASAGNE EMILIANE',
        dishIngredients: 'Housemade Lasagna Sheets, Pork and Beef Ragù alla Bolognese,Bechamel',
        dishPrice: 24,
        dishCalories: 350,
        dishAllergies: 'nuts',
        spiceLevel: 2
      },
      {
        restaurantId: 10,
        dishCategory: 'PASTA',
        dishName: 'GNOCCHI AL PESTO',
        dishIngredients: 'Housemade Potato Gnocchi, Basil Pesto',
        dishPrice: 26,
        dishCalories: 480,
        dishAllergies: 'nuts',
        spiceLevel: 1
      },
      {
        restaurantId: 10,
        dishCategory: 'PASTA',
        dishName: 'BUCATINI CACIO E PEPE',
        dishIngredients: 'Afeltra Bucatini, Genuine Fulvi Pecorino Romano DOP, Freshly Ground Black Pepper ',
        dishPrice: 29,
        dishCalories: 340,
        dishAllergies: 'nuts',
        spiceLevel: 2
      },
      {
        restaurantId: 10,
        dishCategory: 'PIZZA',
        dishName: 'MARGHERITA VERACE TSG',
        dishIngredients: 'San Marzano Tomato Sauce, Buffalo Mozzarella, Basil, Extra Virgin Olive Oil',
        dishPrice: 20,
        dishCalories: 590,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 10,
        dishCategory: 'PIZZA',
        dishName: 'QUATTRO FORMAGGI',
        dishIngredients: 'Buffalo Mozzarella, Pecorino Romano DOP, Gorgonzola Dolce DOP, Grana Padano DOP, Basil, Extra Virgin Olive Oil',
        dishPrice: 22,
        dishCalories: 680,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 10,
        dishCategory: 'PIZZA',
        dishName: 'DELICATA',
        dishIngredients: 'Yellow Squash Purée, Buffalo Mozzarella, Yellow Squash Chips, Shaved Pecorino Romano, Basil, Extra Virgin Olive Oil',
        dishPrice: 25,
        dishCalories: 840,
        dishAllergies: 'nuts, soy',
        spiceLevel: 1
      },
      {
        restaurantId: 7,
        dishCategory: 'Piccoli Morsi',
        dishName: 'Eggplant & Zucchini Crisps',
        dishIngredients: 'Organic eggplants and zucchini, Shaved Pecorino Romano, Basil, Extra Virgin Olive Oil',
        dishPrice: 23,
        dishCalories: 840,
        dishAllergies: 'nuts, soy',
        spiceLevel: 1
      },
      {
        restaurantId: 7,
        dishCategory: 'Piccoli Morsi',
        dishName: 'Whipped Ricotta',
        dishIngredients: 'Organic Ricotta cheese, milk, crea of tartar, thyme, Extra Virgin Olive Oil',
        dishPrice: 18,
        dishCalories: 100,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 7,
        dishCategory: 'Piccoli Morsi',
        dishName: 'Polpette',
        dishIngredients: 'Meatballs, cabbage, beans, carrots, coirander paste, Extra Virgin Olive Oil',
        dishPrice: 21,
        dishCalories: 150,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 7,
        dishCategory: 'Verdura',
        dishName: 'Caesar',
        dishIngredients: 'Kale, sesame, nori, focaccia, parmigiano-reggiano',
        dishPrice: 20,
        dishCalories: 150,
        dishAllergies: 'Sesame seeds',
        spiceLevel: 1
      },
      {
        restaurantId: 7,
        dishCategory: 'Verdura',
        dishName: 'Insalata',
        dishIngredients: 'Petite lettuce, fennel, cherry tomato, radish, vinaigrette (pb, v, gf)',
        dishPrice: 19,
        dishCalories: 260,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 7,
        dishCategory: 'Morsi',
        dishName: 'Burrata',
        dishIngredients: 'Beets, pesto, pignoli, tomato (v, gf)',
        dishPrice: 19,
        dishCalories: 120,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 7,
        dishCategory: 'Morsi',
        dishName: 'Artichokes',
        dishIngredients: 'Pecorino, toasted garlic, ciabatta crumbs (v)',
        dishPrice: 21,
        dishCalories: 150,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 7,
        dishCategory: 'Morsi',
        dishName: 'Fritto Misto',
        dishIngredients: 'Calamari, cherry peppers, arrabbiata (gf)',
        dishPrice: 27,
        dishCalories: 550,
        dishAllergies: 'nuts',
        spiceLevel: 2
      },
      {
        restaurantId: 7,
        dishCategory: 'Morsi',
        dishName: 'Arancini',
        dishIngredients: 'calabrian chili aioli (v)',
        dishPrice: 14,
        dishCalories: 250,
        dishAllergies: 'nuts',
        spiceLevel: 3
      },
      {
        restaurantId: 7,
        dishCategory: 'Pizza',
        dishName: 'Fig & Prosciutto pizza',
        dishIngredients: 'arguula, goat cheese',
        dishPrice: 28,
        dishCalories: 550,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 7,
        dishCategory: 'Pizza',
        dishName: 'Forest Mushroom pizza',
        dishIngredients: 'truffle, scallions, fontina (v)',
        dishPrice: 29,
        dishCalories: 520,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 7,
        dishCategory: 'Pizza',
        dishName: 'Palermo pizza',
        dishIngredients: 'tomato passata, oregano, pecorino',
        dishPrice: 20,
        dishCalories: 480,
        dishAllergies: 'nuts',
        spiceLevel: 1
      },
      {
        restaurantId: 7,
        dishCategory: 'Pizza',
        dishName: 'Carbone',
        dishIngredients: 'spicy sausage, broccoli rabe, smoked mozzarella, calabrian honey',
        dishPrice: 28,
        dishCalories: 690,
        dishAllergies: 'nuts, honey',
        spiceLevel: 2
      },
      {
        restaurantId: 7,
        dishCategory: 'Pasta',
        dishName: 'Gnocchi',
        dishIngredients: 'Lamb sugo, squash, scamorza',
        dishPrice: 39,
        dishCalories: 650,
        dishAllergies: 'nuts',
        spiceLevel: 1
      },
      {
        restaurantId: 7,
        dishCategory: 'Pasta',
        dishName: 'Squid Ink Pappardelle pasta',
        dishIngredients: 'shrimp, arrabbiata, pangrattato',
        dishPrice: 37,
        dishCalories: 610,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 7,
        dishCategory: 'Pasta',
        dishName: 'Tagliatelle pasta',
        dishIngredients: 'bolognese, extra virgin olive oil, goat cheese, tomatoes',
        dishPrice: 33,
        dishCalories: 620,
        dishAllergies: 'none',
        spiceLevel: 3
      }, 
      {
        restaurantId: 7,
        dishCategory: 'Pasta',
        dishName: 'Linguine',
        dishIngredients: 'cacio e pepe (v), extra virgin olive oil, goat cheese, tomatoes',
        dishPrice: 29,
        dishCalories: 520,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 7,
        dishCategory: 'Pasta',
        dishName: 'Bucatini',
        dishIngredients: 'carbonara, extra virgin olive oil, goat cheese, tomatoes',
        dishPrice: 31,
        dishCalories: 500,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 1,
        dishCategory: 'Pasta',
        dishName: 'Agnolotti',
        dishIngredients: 'butternut squash, brown butter, sage (v)',
        dishPrice: 33,
        dishCalories: 410,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 1,
        dishCategory: 'Grandi Morsi',
        dishName: 'Chicken Scarpariello',
        dishIngredients: 'sweet sausage, agro dolce',
        dishPrice: 35,
        dishCalories: 360,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 1,
        dishCategory: 'Grandi Morsi',
        dishName: 'Salmon Saltimbocca',
        dishIngredients: 'prosciutto di parma, sage',
        dishPrice: 38,
        dishCalories: 460,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 1,
        dishCategory: 'Grandi Morsi',
        dishName: 'Salmon Saltimbocca',
        dishIngredients: 'prosciutto di parma, sage',
        dishPrice: 38,
        dishCalories: 460,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 1,
        dishCategory: 'Grandi Morsi',
        dishName: 'Striped Bass Piccata',
        dishIngredients: 'lemon, capers',
        dishPrice: 38,
        dishCalories: 490,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 1,
        dishCategory: 'Grandi Morsi',
        dishName: 'New York Strip',
        dishIngredients: 'Black pepper crust',
        dishPrice: 52,
        dishCalories: 690,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 1,
        dishCategory: 'Grandi Morsi',
        dishName: 'Veal Chop Milanese',
        dishIngredients: 'burrata, wild greens, preserved lemon aioli',
        dishPrice: 72,
        dishCalories: 720,
        dishAllergies: 1,
        spiceLevel: 1
      },
      {
        restaurantId: 1,
        dishCategory: 'Contorni',
        dishName: 'Broccoli Rabe',
        dishIngredients: 'garlic, chilies, pine nuts',
        dishPrice: 15,
        dishCalories: 120,
        dishAllergies: 'nuts',
        spiceLevel: 2
      },
      {
        restaurantId: 1,
        dishCategory: 'Contorni',
        dishName: 'Wild Shrooms',
        dishIngredients: 'truffle',
        dishPrice: 18,
        dishCalories: 110,
        dishAllergies: 'nuts',
        spiceLevel: 2
      },
      {
        restaurantId: 1,
        dishCategory: 'Contorni',
        dishName: 'Herb Roasted Potatoes',
        dishIngredients: 'parmigiano-reggiano',
        dishPrice: 14,
        dishCalories: 310,
        dishAllergies: 'nuts',
        spiceLevel: 3
      },
      {
        restaurantId: 1,
        dishCategory: 'Bevereges',
        dishName: 'Tre Fiore',
        dishIngredients: 'empress 1908 gin, elderflower, chamomile, lavender, honey, lemon',
        dishPrice: 19,
        dishCalories: 310,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 1,
        dishCategory: 'Bevereges',
        dishName: 'Il Giardino',
        dishIngredients: 'tito vodka, st. germain, rosemary, basil, lime, peach bitters, froth',
        dishPrice: 19,
        dishCalories: 310,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 1,
        dishCategory: 'Bevereges',
        dishName: 'Spicy Marg',
        dishIngredients: 'milagro tequila, disaronno amaretto, orange, calabrian chilies',
        dishPrice: 18,
        dishCalories: 320,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 1,
        dishCategory: 'Bevereges',
        dishName: 'Vecchio Stile',
        dishIngredients: 'four roses bourbon, angelus orange liqueur, bitters, smoked cedar',
        dishPrice: 19,
        dishCalories: 350,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 1,
        dishCategory: 'Bevereges',
        dishName: 'Paloma Italiana',
        dishIngredients: 'casamigos mezcal, campari, ancho reyes, grapefruit, chili salt',
        dishPrice: 21,
        dishCalories: 360,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 1,
        dishCategory: 'Bevereges',
        dishName: 'Limoncello Spritz',
        dishIngredients: 'house made limoncello, prosecco, ginger honey, lemon lime soda',
        dishPrice: 18,
        dishCalories: 350,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 1,
        dishCategory: 'Bevereges',
        dishName: 'Cappuccino Martini',
        dishIngredients: 'van gogh double espresso, mr. black, baileys, ancho reyes, espresso',
        dishPrice: 22,
        dishCalories: 390,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 4,
        dishCategory: 'Pasta',
        dishName: 'Agnolotti',
        dishIngredients: 'butternut squash, brown butter, sage (v)',
        dishPrice: 33,
        dishCalories: 410,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 4,
        dishCategory: 'Grandi Morsi',
        dishName: 'Chicken Scarpariello',
        dishIngredients: 'sweet sausage, agro dolce',
        dishPrice: 35,
        dishCalories: 360,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 4,
        dishCategory: 'Grandi Morsi',
        dishName: 'Salmon Saltimbocca',
        dishIngredients: 'prosciutto di parma, sage',
        dishPrice: 38,
        dishCalories: 460,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 4,
        dishCategory: 'Grandi Morsi',
        dishName: 'Salmon Saltimbocca',
        dishIngredients: 'prosciutto di parma, sage',
        dishPrice: 38,
        dishCalories: 460,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 4,
        dishCategory: 'Grandi Morsi',
        dishName: 'Striped Bass Piccata',
        dishIngredients: 'lemon, capers',
        dishPrice: 38,
        dishCalories: 490,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 4,
        dishCategory: 'Grandi Morsi',
        dishName: 'New York Strip',
        dishIngredients: 'Black pepper crust',
        dishPrice: 52,
        dishCalories: 690,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 4,
        dishCategory: 'Grandi Morsi',
        dishName: 'Veal Chop Milanese',
        dishIngredients: 'burrata, wild greens, preserved lemon aioli',
        dishPrice: 72,
        dishCalories: 720,
        dishAllergies: 1,
        spiceLevel: 1
      },
      {
        restaurantId: 4,
        dishCategory: 'Contorni',
        dishName: 'Broccoli Rabe',
        dishIngredients: 'garlic, chilies, pine nuts',
        dishPrice: 15,
        dishCalories: 120,
        dishAllergies: 'nuts',
        spiceLevel: 1
      },
      {
        restaurantId: 4,
        dishCategory: 'Contorni',
        dishName: 'Wild Shrooms',
        dishIngredients: 'truffle',
        dishPrice: 18,
        dishCalories: 110,
        dishAllergies: 'nuts',
        spiceLevel: 2
      },
      {
        restaurantId: 4,
        dishCategory: 'Contorni',
        dishName: 'Herb Roasted Potatoes',
        dishIngredients: 'parmigiano-reggiano',
        dishPrice: 14,
        dishCalories: 310,
        dishAllergies: 'nuts',
        spiceLevel: 1
      },
      {
        restaurantId: 4,
        dishCategory: 'Bevereges',
        dishName: 'Tre Fiore',
        dishIngredients: 'empress 1908 gin, elderflower, chamomile, lavender, honey, lemon',
        dishPrice: 19,
        dishCalories: 310,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 4,
        dishCategory: 'Bevereges',
        dishName: 'Il Giardino',
        dishIngredients: 'tito vodka, st. germain, rosemary, basil, lime, peach bitters, froth',
        dishPrice: 19,
        dishCalories: 310,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 4,
        dishCategory: 'Bevereges',
        dishName: 'Spicy Marg',
        dishIngredients: 'milagro tequila, disaronno amaretto, orange, calabrian chilies',
        dishPrice: 18,
        dishCalories: 320,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 4,
        dishCategory: 'Bevereges',
        dishName: 'Vecchio Stile',
        dishIngredients: 'four roses bourbon, angelus orange liqueur, bitters, smoked cedar',
        dishPrice: 19,
        dishCalories: 350,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 4,
        dishCategory: 'Bevereges',
        dishName: 'Paloma Italiana',
        dishIngredients: 'casamigos mezcal, campari, ancho reyes, grapefruit, chili salt',
        dishPrice: 21,
        dishCalories: 360,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 4,
        dishCategory: 'Bevereges',
        dishName: 'Limoncello Spritz',
        dishIngredients: 'house made limoncello, prosecco, ginger honey, lemon lime soda',
        dishPrice: 18,
        dishCalories: 350,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 4,
        dishCategory: 'Bevereges',
        dishName: 'Cappuccino Martini',
        dishIngredients: 'van gogh double espresso, mr. black, baileys, ancho reyes, espresso',
        dishPrice: 22,
        dishCalories: 390,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 9,
        dishCategory: 'Pasta',
        dishName: 'Agnolotti',
        dishIngredients: 'butternut squash, brown butter, sage (v)',
        dishPrice: 33,
        dishCalories: 410,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 9,
        dishCategory: 'Grandi Morsi',
        dishName: 'Chicken Scarpariello',
        dishIngredients: 'sweet sausage, agro dolce',
        dishPrice: 35,
        dishCalories: 360,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 9,
        dishCategory: 'Grandi Morsi',
        dishName: 'Salmon Saltimbocca',
        dishIngredients: 'prosciutto di parma, sage',
        dishPrice: 38,
        dishCalories: 460,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 9,
        dishCategory: 'Grandi Morsi',
        dishName: 'Salmon Saltimbocca',
        dishIngredients: 'prosciutto di parma, sage',
        dishPrice: 38,
        dishCalories: 460,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 9,
        dishCategory: 'Grandi Morsi',
        dishName: 'Striped Bass Piccata',
        dishIngredients: 'lemon, capers',
        dishPrice: 38,
        dishCalories: 490,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 9,
        dishCategory: 'Grandi Morsi',
        dishName: 'New York Strip',
        dishIngredients: 'Black pepper crust',
        dishPrice: 52,
        dishCalories: 690,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 9,
        dishCategory: 'Grandi Morsi',
        dishName: 'Veal Chop Milanese',
        dishIngredients: 'burrata, wild greens, preserved lemon aioli',
        dishPrice: 72,
        dishCalories: 720,
        dishAllergies: 2,
        spiceLevel: 1
      },
      {
        restaurantId: 9,
        dishCategory: 'Contorni',
        dishName: 'Broccoli Rabe',
        dishIngredients: 'garlic, chilies, pine nuts',
        dishPrice: 15,
        dishCalories: 120,
        dishAllergies: 'nuts',
        spiceLevel: 1
      },
      {
        restaurantId: 9,
        dishCategory: 'Contorni',
        dishName: 'Wild Shrooms',
        dishIngredients: 'truffle',
        dishPrice: 18,
        dishCalories: 110,
        dishAllergies: 'nuts',
        spiceLevel: 2
      },
      {
        restaurantId: 9,
        dishCategory: 'Contorni',
        dishName: 'Herb Roasted Potatoes',
        dishIngredients: 'parmigiano-reggiano',
        dishPrice: 14,
        dishCalories: 310,
        dishAllergies: 'nuts',
        spiceLevel: 3
      },
      {
        restaurantId: 9,
        dishCategory: 'Bevereges',
        dishName: 'Tre Fiore',
        dishIngredients: 'empress 1908 gin, elderflower, chamomile, lavender, honey, lemon',
        dishPrice: 19,
        dishCalories: 310,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 9,
        dishCategory: 'Bevereges',
        dishName: 'Il Giardino',
        dishIngredients: 'tito vodka, st. germain, rosemary, basil, lime, peach bitters, froth',
        dishPrice: 19,
        dishCalories: 310,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 9,
        dishCategory: 'Bevereges',
        dishName: 'Spicy Marg',
        dishIngredients: 'milagro tequila, disaronno amaretto, orange, calabrian chilies',
        dishPrice: 18,
        dishCalories: 320,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 9,
        dishCategory: 'Bevereges',
        dishName: 'Vecchio Stile',
        dishIngredients: 'four roses bourbon, angelus orange liqueur, bitters, smoked cedar',
        dishPrice: 19,
        dishCalories: 350,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 9,
        dishCategory: 'Bevereges',
        dishName: 'Paloma Italiana',
        dishIngredients: 'casamigos mezcal, campari, ancho reyes, grapefruit, chili salt',
        dishPrice: 21,
        dishCalories: 360,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 9,
        dishCategory: 'Bevereges',
        dishName: 'Limoncello Spritz',
        dishIngredients: 'house made limoncello, prosecco, ginger honey, lemon lime soda',
        dishPrice: 18,
        dishCalories: 350,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 9,
        dishCategory: 'Bevereges',
        dishName: 'Cappuccino Martini',
        dishIngredients: 'van gogh double espresso, mr. black, baileys, ancho reyes, espresso',
        dishPrice: 22,
        dishCalories: 390,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 6,
        dishCategory: 'Pasta',
        dishName: 'Agnolotti',
        dishIngredients: 'butternut squash, brown butter, sage (v)',
        dishPrice: 33,
        dishCalories: 410,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 6,
        dishCategory: 'Grandi Morsi',
        dishName: 'Chicken Scarpariello',
        dishIngredients: 'sweet sausage, agro dolce',
        dishPrice: 35,
        dishCalories: 360,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 6,
        dishCategory: 'Grandi Morsi',
        dishName: 'Salmon Saltimbocca',
        dishIngredients: 'prosciutto di parma, sage',
        dishPrice: 38,
        dishCalories: 460,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 6,
        dishCategory: 'Grandi Morsi',
        dishName: 'Salmon Saltimbocca',
        dishIngredients: 'prosciutto di parma, sage',
        dishPrice: 38,
        dishCalories: 460,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 6,
        dishCategory: 'Grandi Morsi',
        dishName: 'Striped Bass Piccata',
        dishIngredients: 'lemon, capers',
        dishPrice: 38,
        dishCalories: 490,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 6,
        dishCategory: 'Grandi Morsi',
        dishName: 'New York Strip',
        dishIngredients: 'Black pepper crust',
        dishPrice: 52,
        dishCalories: 690,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 6,
        dishCategory: 'Grandi Morsi',
        dishName: 'Veal Chop Milanese',
        dishIngredients: 'burrata, wild greens, preserved lemon aioli',
        dishPrice: 72,
        dishCalories: 720,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 6,
        dishCategory: 'Contorni',
        dishName: 'Broccoli Rabe',
        dishIngredients: 'garlic, chilies, pine nuts',
        dishPrice: 15,
        dishCalories: 120,
        dishAllergies: 'nuts',
        spiceLevel: 2
      },
      {
        restaurantId: 6,
        dishCategory: 'Contorni',
        dishName: 'Wild Shrooms',
        dishIngredients: 'truffle',
        dishPrice: 18,
        dishCalories: 110,
        dishAllergies: 'nuts',
        spiceLevel: 2
      },
      {
        restaurantId: 6,
        dishCategory: 'Contorni',
        dishName: 'Herb Roasted Potatoes',
        dishIngredients: 'parmigiano-reggiano',
        dishPrice: 14,
        dishCalories: 310,
        dishAllergies: 'nuts',
        spiceLevel: 1
      },
      {
        restaurantId: 6,
        dishCategory: 'Bevereges',
        dishName: 'Tre Fiore',
        dishIngredients: 'empress 1908 gin, elderflower, chamomile, lavender, honey, lemon',
        dishPrice: 19,
        dishCalories: 310,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 6,
        dishCategory: 'Bevereges',
        dishName: 'Il Giardino',
        dishIngredients: 'tito vodka, st. germain, rosemary, basil, lime, peach bitters, froth',
        dishPrice: 19,
        dishCalories: 310,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 6,
        dishCategory: 'Bevereges',
        dishName: 'Spicy Marg',
        dishIngredients: 'milagro tequila, disaronno amaretto, orange, calabrian chilies',
        dishPrice: 18,
        dishCalories: 320,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 6,
        dishCategory: 'Bevereges',
        dishName: 'Vecchio Stile',
        dishIngredients: 'four roses bourbon, angelus orange liqueur, bitters, smoked cedar',
        dishPrice: 19,
        dishCalories: 350,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 6,
        dishCategory: 'Bevereges',
        dishName: 'Paloma Italiana',
        dishIngredients: 'casamigos mezcal, campari, ancho reyes, grapefruit, chili salt',
        dishPrice: 21,
        dishCalories: 360,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 6,
        dishCategory: 'Bevereges',
        dishName: 'Limoncello Spritz',
        dishIngredients: 'house made limoncello, prosecco, ginger honey, lemon lime soda',
        dishPrice: 18,
        dishCalories: 350,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 6,
        dishCategory: 'Bevereges',
        dishName: 'Cappuccino Martini',
        dishIngredients: 'van gogh double espresso, mr. black, baileys, ancho reyes, espresso',
        dishPrice: 22,
        dishCalories: 390,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 5,
        dishCategory: 'Pasta',
        dishName: 'Agnolotti',
        dishIngredients: 'butternut squash, brown butter, sage (v)',
        dishPrice: 33,
        dishCalories: 410,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 5,
        dishCategory: 'Grandi Morsi',
        dishName: 'Chicken Scarpariello',
        dishIngredients: 'sweet sausage, agro dolce',
        dishPrice: 35,
        dishCalories: 360,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 5,
        dishCategory: 'Grandi Morsi',
        dishName: 'Salmon Saltimbocca',
        dishIngredients: 'prosciutto di parma, sage',
        dishPrice: 38,
        dishCalories: 460,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 5,
        dishCategory: 'Grandi Morsi',
        dishName: 'Salmon Saltimbocca',
        dishIngredients: 'prosciutto di parma, sage',
        dishPrice: 38,
        dishCalories: 460,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 5,
        dishCategory: 'Grandi Morsi',
        dishName: 'Striped Bass Piccata',
        dishIngredients: 'lemon, capers',
        dishPrice: 38,
        dishCalories: 490,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 5,
        dishCategory: 'Grandi Morsi',
        dishName: 'New York Strip',
        dishIngredients: 'Black pepper crust',
        dishPrice: 52,
        dishCalories: 690,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 5,
        dishCategory: 'Grandi Morsi',
        dishName: 'Veal Chop Milanese',
        dishIngredients: 'burrata, wild greens, preserved lemon aioli',
        dishPrice: 72,
        dishCalories: 720,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 5,
        dishCategory: 'Contorni',
        dishName: 'Broccoli Rabe',
        dishIngredients: 'garlic, chilies, pine nuts',
        dishPrice: 15,
        dishCalories: 120,
        dishAllergies: 'nuts',
        spiceLevel: 1
      },
      {
        restaurantId: 5,
        dishCategory: 'Contorni',
        dishName: 'Wild Shrooms',
        dishIngredients: 'truffle',
        dishPrice: 18,
        dishCalories: 110,
        dishAllergies: 'nuts',
        spiceLevel: 2
      },
      {
        restaurantId: 5,
        dishCategory: 'Contorni',
        dishName: 'Herb Roasted Potatoes',
        dishIngredients: 'parmigiano-reggiano',
        dishPrice: 14,
        dishCalories: 310,
        dishAllergies: 'nuts',
        spiceLevel: 1
      },
      {
        restaurantId: 5,
        dishCategory: 'Bevereges',
        dishName: 'Tre Fiore',
        dishIngredients: 'empress 1908 gin, elderflower, chamomile, lavender, honey, lemon',
        dishPrice: 19,
        dishCalories: 310,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 5,
        dishCategory: 'Bevereges',
        dishName: 'Il Giardino',
        dishIngredients: 'tito vodka, st. germain, rosemary, basil, lime, peach bitters, froth',
        dishPrice: 19,
        dishCalories: 310,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 5,
        dishCategory: 'Bevereges',
        dishName: 'Spicy Marg',
        dishIngredients: 'milagro tequila, disaronno amaretto, orange, calabrian chilies',
        dishPrice: 18,
        dishCalories: 320,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 5,
        dishCategory: 'Bevereges',
        dishName: 'Vecchio Stile',
        dishIngredients: 'four roses bourbon, angelus orange liqueur, bitters, smoked cedar',
        dishPrice: 19,
        dishCalories: 350,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      {
        restaurantId: 5,
        dishCategory: 'Bevereges',
        dishName: 'Paloma Italiana',
        dishIngredients: 'casamigos mezcal, campari, ancho reyes, grapefruit, chili salt',
        dishPrice: 21,
        dishCalories: 360,
        dishAllergies: 'none',
        spiceLevel: 2
      },
      {
        restaurantId: 5,
        dishCategory: 'Bevereges',
        dishName: 'Limoncello Spritz',
        dishIngredients: 'house made limoncello, prosecco, ginger honey, lemon lime soda',
        dishPrice: 18,
        dishCalories: 350,
        dishAllergies: 'none',
        spiceLevel: 3
      },
      {
        restaurantId: 5,
        dishCategory: 'Bevereges',
        dishName: 'Cappuccino Martini',
        dishIngredients: 'van gogh double espresso, mr. black, baileys, ancho reyes, espresso',
        dishPrice: 22,
        dishCalories: 390,
        dishAllergies: 'none',
        spiceLevel: 1
      },
      
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'MenuDishes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      restaurantId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] }
    }, {});
  }
};
