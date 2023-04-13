
module.exports = (sequelize,Datatype)=>{
    // const seq = require('sequelize');
     const Request = sequelize.define('Request',{
         id : {
             type : Datatype.INTEGER ,
             primaryKey : true,
             autoIncrement : true
          },
          quantity : {
            type :Datatype.INTEGER,
            defaultValue:0
         },
        
          isAcitve:{
             type: Datatype.BOOLEAN,
             defaultValue:false, //not proceeded
          },
          isIncrease:{
             type: Datatype.BOOLEAN,
             defaultValue:false,
          },
          isAccepted:{
            type: Datatype.BOOLEAN,
            defaultValue:false,
         },
         
        
          
     });
 
     Request.associate = models=>{
       Request.belongsTo(models.User,{
        //  onDelete:'cascade',
          onUpdate:'cascade'
       })
       Request.belongsTo(models.Product,{
         //onDelete:'cascade',
         onUpdate:'cascade'
      })
   }
     
 
 
     return Request;
 }