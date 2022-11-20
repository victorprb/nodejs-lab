'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Vehicles', [
      {
        model: 'onix',
        brand: 'chevrolet',
        year: '2023',
        sold: true,
        description: "",
        createdAt: new Date("10/12/22"),
        updatedAt: new Date("10/12/22"),
      },
      {
        model: 'ka',
        brand: 'ford',
        year: '2015',
        sold: false,
        description: "",
        createdAt: new Date("10/12/22"),
        updatedAt: new Date("10/12/22"),
      },
      {
        model: 'corsa',
        brand: 'chevrolet',
        year: '2016',
        sold: true,
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: 'uno',
        brand: 'fiat',
        year: '2019',
        sold: true,
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: 'gol',
        brand: 'volkswagen',
        year: '2013',
        sold: false,
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Vehicles', null, {});
  }
};
