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
        description: 'As the first uptown New York location for legendary chef Nobu Matsuhisa, we opened with much anticipation in the summer of 2005. The restaurant showcases our signature new style Japanese cuisine with classic dishes such as Tiradito Nobu Style and Black Cod Miso. ',
        cuisines: 'Japanese',
        locationMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.923604461663!2d-73.97882012334362!3d40.76370497138586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258fa09627e3d%3A0x9ca4f60708c02900!2sNobu%20Fifty%20Seven!5e0!3m2!1sen!2sus!4v1713494239604!5m2!1sen!2sus',
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
        description: 'At La Pizza & La Pasta, enjoy our seasonal selection just steps away from where our expert pasta chefs and dough-slinging pizzaioli (pizza makers) create dishes before your eyes. ',
        cuisines: 'Italian',
        locationMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9105808099353!2d-73.99251062334454!3d40.74199307138913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a4167415e9%3A0xc1c6b3e228a90be1!2sLa%20Pizza%20%26%20La%20Pasta!5e0!3m2!1sen!2sus!4v1713495062721!5m2!1sen!2sus',
        dayClosed: 'Sunday',
        hoursOfOperation: 'Mon to Sat 6:30 pm to 10:30 pm',
        avgMealPrice: '$30 and over',
        parkingAvailability: 'Parking Garages: (Hourly Rates Apply)Car Park 29LLC 724-732 located on 24th St. and 6th Ave: 212-627-0667Impark (covered parking on 24th and 6th)',
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
        description: 'Located directly across the street from Lincoln Center, Rosa Mexicano is the ideal destination for dinner before a performance, or a cocktail after the show.  ',
        cuisines: 'Mexican',
        locationMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.584779793131!2d-73.98568472334333!3d40.77115637138483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2585f60006a2b%3A0xdc1f14aefd06f368!2sRosa%20Mexicano!5e0!3m2!1sen!2sus!4v1713495223455!5m2!1sen!2sus',
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
        description: 'Rated a Top 5 Newcomer by Zagat, Pera brings an authentic taste of eastern Mediterranean cuisine to Manhattan. Large group accommodations, private dining, special events, catering and delivery services are available. Please email events@peranyc.com.',
        cuisines: 'Mediterranean ',
        locationMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.4409007629615!2d-73.98200262334413!3d40.75232647138757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25901a9736f5b%3A0xa0a05b0794c4cc06!2sPera%20Mediterranean%20Brasserie!5e0!3m2!1sen!2sus!4v1713495318392!5m2!1sen!2sus',
        dayClosed: 'Sunday',
        hoursOfOperation: 'Mon to Sat 6:30 pm to 10:30 pm',
        avgMealPrice: '$31 to $50',
        parkingAvailability: 'Free street parking is available on Madison Avenue and all side streets after 7PM Monday - Saturday and all day on Sunday.',
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
        description: 'The restaurant has been featured on Channel 4, showing how to grill kebabs on the roof of Rockefeller Center, as well as how to make salt-baked fish, and on Fox5 where Dave Price has showcased its Saturday Night kebab buffet, belly dancers and live music.  ',
        cuisines: 'Turkish',
        locationMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.631713746654!2d-73.96030102334342!3d40.77012427138499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258c069f33a75%3A0xb9430252c3e331e8!2sA%20la%20Turka!5e0!3m2!1sen!2sus!4v1713495440388!5m2!1sen!2sus',
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
