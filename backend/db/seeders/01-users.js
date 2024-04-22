'use strict';

const {User, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up (queryInterface, Sequelize) {
        await User.bulkCreate([
        {
          email: 'demo@user.io',
          firstName: 'Demo',
          lastName: 'User',
          username: 'Demo-lition',
          hashedPassword: bcrypt.hashSync('password'),
          profileImg: 'https://t4.ftcdn.net/jpg/02/60/09/61/360_F_260096182_zCnz6bGN1680iGIEIo26MHDBWk1V3a0t.jpg'
        },
        {
          email: 'user1@user.io',
          firstName: 'Fake1',
          lastName: 'User1',
          username: 'FakeUser1',
          hashedPassword: bcrypt.hashSync('password'),
          profileImg: 'https://www.shutterstock.com/image-vector/chinese-folklore-dragon-suitable-new-600nw-2311376525.jpg'
        },
        {
          email: 'user2@user.io',
          firstName: 'Fake2',
          lastName: 'User2',
          username: 'FakeUser2',
          hashedPassword: bcrypt.hashSync('password'),
          profileImg: 'https://img.freepik.com/free-photo/beautiful-shot-white-british-shorthair-kitten_181624-57681.jpg'
        },
        {
          email: 'user3@user.io',
          firstName: 'Fake3',
          lastName: 'User3',
          username: 'FakeUser3',
          hashedPassword: bcrypt.hashSync('password'),
          profileImg: 'https://st2.depositphotos.com/2222024/5819/i/450/depositphotos_58199841-stock-photo-beautiful-sitting-reddish-havanese-puppy.jpg'
        },
        {
          email: 'user4@user.io',
          firstName: 'Fake4',
          lastName: 'User4',
          username: 'FakeUser4',
          hashedPassword: bcrypt.hashSync('password'),
          profileImg: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg'
        }
        
      ], { validate: true });
    },

    async down (queryInterface, Sequelize) {
      options.tableName = "Users";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        username: {[Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4']}
      }, {});
    }
  };
