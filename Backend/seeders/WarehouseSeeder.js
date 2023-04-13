module.exports = {
    up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Warehouses', [{
        id:1,
        name: 'Maadi Stock',
        isActive: 0,
       location:'maadi',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id:2,
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