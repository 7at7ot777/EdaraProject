

module.exports = (sequelize,Datatype)=>{
    // const seq = require('sequelize');
     const Warehouse = sequelize.define('Warehouse',{
         id : {
             type : Datatype.INTEGER ,
             primaryKey : true,
             autoIncrement : true
          },
          name : {
             type :Datatype.STRING,
             len : [4,25],
             allowNull : false
          },
          isActive:{
             type: Datatype.BOOLEAN,
             defaultValue:false,
          },
          location : {
            type :Datatype.STRING,
            len : [4,25],
            allowNull : false
         },
    
          
     });

    
     Warehouse.associate = models=>{
        Warehouse.belongsTo(models.User,{
           onDelete:'cascade',
           onUpdate:'cascade'
        })
        Warehouse.belongsToMany(models.Product,{ through: models.Warehouse_Product,foreignKey:'WarehousId' })
      }

     return Warehouse;
 }