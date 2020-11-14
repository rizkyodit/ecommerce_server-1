'use strict';
const { Bcrypt } = require('../helpers/index')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@mail.com',
        password: Bcrypt.hashPassword('1234'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'cust@mail.com',
        password: Bcrypt.hashPassword('cust'),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
