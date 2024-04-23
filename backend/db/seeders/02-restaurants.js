'use strict';

const {Restaurant, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Restaurant.bulkCreate([
      {
        restaurantType: 'Dine-in',
        ownerId: 1,
        address: '40 W 57 Street',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        zipCode: 10019,
        phone: '(212) 757-3000',
        name: 'Nobu Fifty Seven',
        description: 'As the first uptown New York location for legendary chef Nobu Matsuhisa, we opened in 2005. ',
        cuisines: 'Japanese',
        locationMapUrl: '',
        dayClosed: 'Sunday',
        hoursOfOperation: 'Mon to Sat 6:30 pm to 10:30 pm',
        avgMealPrice: '$50 and over',
        parkingAvailability: 'Laz Parking on 57th Street',
        paymentOption: 'AMEX, Diners Club, Discover, Mastercard, Visa',
        dressCode: 'Smart Casual',
        executiveChef: 'Matt Hoyle',
        menuUrl: 'https://noburestaurants.com/fifty-seven/menus'
      },
      {
        restaurantType: 'Dine-in',
        ownerId: 2,
        address: '200 5th Ave',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        zipCode: 10010,
        phone: '(212) 229-2560 ext. 368',
        name: 'La Pizza & La Pasta - Eataly NYC Flatiron',
        description: 'At La Pizza & La Pasta, our expert chefs create dishes before your eyes.',
        cuisines: 'Italian',
        locationMapUrl: '',
        dayClosed: 'Sunday',
        hoursOfOperation: 'Mon to Sat 6:30 pm to 10:30 pm',
        avgMealPrice: '$30 and over',
        parkingAvailability: 'Parking Garages: (Hourly Rates Apply)Car Park 29LLC 724-732 located on 24th St.',
        paymentOption: 'AMEX, Mastercard, Visa',
        dressCode: 'Casual Dress',
        executiveChef: 'Gramercy Park',
        menuUrl: 'https://www.eataly.com/us_en/stores/nyc-flatiron/nyc-la-pizza-la-pasta/'
      },
      {
        restaurantType: 'Dine-in',
        ownerId: 3,
        address: '61 Columbus Ave',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        zipCode: 10023,
        phone: '(212) 977-7700',
        name: 'Rosa Mexicano by Lincoln Center',
        description: 'Rosa Mexicano is the ideal destination for dinner or a cocktail after the show.  ',
        cuisines: 'Mexican',
        locationMapUrl: '',
        dayClosed: 'Sunday',
        hoursOfOperation: 'Mon to Sat 6:30 pm to 10:30 pm',
        avgMealPrice: '$30 and under',
        parkingAvailability: 'The closest parking garage is at 61st and Columbus.',
        paymentOption: 'AMEX, Diners Club, Discover, Mastercard, Visa',
        dressCode: 'Smart Casual',
        executiveChef: 'Ishmael Lozano',
        menuUrl: 'https://rosamexicano.com/menus/'
      },
      {
        restaurantType: 'Dine-in',
        ownerId: 1,
        address: '303 Madison Ave',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        zipCode: 10017,
        phone: '(212) 878-6301',
        name: 'Pera Mediterranean Brasserie',
        description: 'Rated a Top 5 Newcomer by Zagat, Pera brings an authentic taste of eastern Mediterranean cuisine to Manhattan.',
        cuisines: 'Mediterranean ',
        locationMapUrl: '',
        dayClosed: 'Sunday',
        hoursOfOperation: 'Mon to Sat 6:30 pm to 10:30 pm',
        avgMealPrice: '$31 to $50',
        parkingAvailability: 'Free street parking is available.',
        paymentOption: 'AMEX, Diners Club, Discover, Mastercard, Visa',
        dressCode: 'Smart Casual',
        executiveChef: 'Sezai Celikbas',
        menuUrl: 'https://www.peranyc.com/menus'
      },
      {
        restaurantType: 'Dine-in/Takeout',
        ownerId: 1,
        address: '1417 2nd Ave',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        zipCode: 10021,
        phone: '(212) 744-2424',
        name: 'A La Turka Restaurant',
        description: 'The restaurant has been featured on Channel 4, showing how to grill kebabs on the roof of Rockefeller Center',
        cuisines: 'Turkish',
        locationMapUrl: '',
        dayClosed: 'Sunday',
        hoursOfOperation: 'Mon to Sat 6:30 pm to 10:30 pm',
        avgMealPrice: '$50 and under',
        parkingAvailability: 'Street Parking',
        paymentOption: 'AMEX, Discover, Mastercard, Visa',
        dressCode: 'Smart Casual',
        executiveChef: 'Ishmael',
        menuUrl: 'https://checkle.menu/alaturka_nyc'
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Restaurants";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6 ,7, 8, 9, 10] }
    }, {});
  }
};
