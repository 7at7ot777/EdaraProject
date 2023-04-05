
module.exports = (sequelize,Datatype)=>{
    // const seq = require('sequelize');
     const Request = sequelize.define('Request',{
         id : {
             type : Datatype.INTEGER ,
             primaryKey : true,
             autoIncrement : true
          },
          product_id : {
            type :Datatype.INTEGER,
            allowNull : false
         },
          quantity : {
            type :Datatype.INTEGER,
            defaultValue:0
         },
        
          status:{
             type: Datatype.BOOLEAN,
             defaultValue:false,
          },
          isIncrease:{
             type: Datatype.BOOLEAN,
             defaultValue:false,
          },
         
        
          
     });
 
     Request.associate = models=>{
       Request.belongsTo(models.User,{
          onDelete:'cascade',
          onUpdate:'cascade'
       }
        
       )
     }
 
 
     return Request;
 }