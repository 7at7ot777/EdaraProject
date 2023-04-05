
module.exports = (sequelize,Datatype)=>{
   // const seq = require('sequelize');
    const User = sequelize.define('User',{
        id : {
            type : Datatype.INTEGER ,
            primaryKey : true,
            autoIncrement : true
         },
         name : {
            type :Datatype.STRING,
            len : [4,25],
            allowNull : false,
            notEmpty:true
         },
         email:{
            type :Datatype.STRING,
            isEmail : true,
            allowNull : false,
            max : 50,
            },
         isAdmin:{
            type: Datatype.BOOLEAN,
            defaultValue:false,
         },
         isActive:{
            type: Datatype.BOOLEAN,
            defaultValue:false,
         },
         phone:{
            type:Datatype.STRING,
            allowNull:false,
            len:[8,15],
         },
         password:{
            type:Datatype.STRING,
            allowNull:false,
            len:[8,25]
         }
         
    });

    User.associate = models=>{
      User.hasOne(models.Warehouse,{
         onDelete:'cascade',
         onUpdate:'cascade'
      })
      User.hasMany(models.Request,{
         onDelete:'cascade',
         onUpdate:'cascade'
      })
    }


    return User;
}