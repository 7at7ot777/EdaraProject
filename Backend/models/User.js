
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
            allowNull : false,
            validate :{
               notEmpty:true,
               len : [4,25],

            }
         },
         email:{
            type :Datatype.STRING,
            allowNull : false,
             validate: { 
               isEmail: {message : 'please enter valid email'},
            max : 50,

             },
            },
         isAdmin:{
            type: Datatype.BOOLEAN,
            defaultValue:false,
         },
         isActive:{
            type: Datatype.BOOLEAN,
            defaultValue:true,
         },
         phone:{
            type:Datatype.STRING,
            allowNull:false,
            validate: {len:{
               args:[8,15],
               msg:'phone must be 8 numbers at least and 15 number maximum'
            },} 

         },
            
         password:{
            type:Datatype.STRING,
            allowNull:false,
            validate: {
               len:{
                  args:[8,25],
               msg:'password length must be between 8 and 25'}}
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