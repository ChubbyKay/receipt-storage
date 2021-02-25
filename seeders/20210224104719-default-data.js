'use strict';
const bcrypt = require('bcryptjs');
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', [
      {
        id: 1,
        account: "user1",
        password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
        email: "user1@example.com",
        name: "user1",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        account: "user2",
        password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
        email: "user2@example.com",
        name: "user2",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
    queryInterface.bulkInsert('Tags', [
      {
        id: 1,
        name: 'food',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        name: 'entertainment',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        name: 'home',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
    return queryInterface.bulkInsert('Receipts',
      Array.from({ length: 7 }).map((item, index) => ({
        id: index + 1,
        UserId: (index % 2) + 1,
        TagID: (index % 3) + 1,
        merchant: faker.company.companyName(),
        date: faker.date.past(),
        item: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: faker.random.number({ min: 1, max: 3 }),
        amount: faker.finance.amount(),
        payment: "cash",
        createdAt: new Date(),
        updatedAt: new Date()
      })), {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {})
    queryInterface.bulkDelete('Tags', null, {})
    return queryInterface.bulkDelete('Receipts', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
