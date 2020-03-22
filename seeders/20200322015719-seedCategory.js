'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let categories = [
      {
        name: 'makanan',
        createdAt: 'now()',
        updatedAt: 'now()'
      },
      {
        name: 'minuman',
        createdAt: 'now()',
        updatedAt: 'now()'
      },
      {
        name: 'perlengkapan rumah tangga',
        createdAt: 'now()',
        updatedAt: 'now()'
      }
    ]
    return queryInterface.bulkInsert('Categories', categories, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Categories', null, {})
  }
}
