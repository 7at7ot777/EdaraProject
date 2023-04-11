module.exports = {
    up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Warehouses', [{
        name: 'Maadi Stock',
        isActive: 0,
       location:'maadi',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Warehouse',
        isActive: 1,
       location:'In your dreams',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Warehouses', null, {});
    }
  };