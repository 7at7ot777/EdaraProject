const bcrypt = require('bcrypt')

module.exports = {
    up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);

      return queryInterface.bulkInsert('users', [{
        name: 'John',
        isActive: 0,
        email: 'example2@example2.com',
      password: await bcrypt.hash('123456789',salt),
        phone: '01128995765',
        token :'asddaasmsodfoafonf',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Mohamed',
        isActive: 1,
        email: 'Momomo1@gmail.com',
      password: await bcrypt.hash('123456789',salt),
        phone: '01128995765',
        token :'asddaasmsod1foafonf',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
    }
  };