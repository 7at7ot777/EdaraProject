const bcrypt = require('bcrypt')

module.exports = {
    up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);

      return queryInterface.bulkInsert('Products', [{
        name: 'Maadi Stock',
        description: 0,
       price: 70,
       stock: 50,
       image:'abcedfgh',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Product',
        description: 1,
       price: 70,
       stock: 50,
       image:'abcedfgh',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
    }
  };