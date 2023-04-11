
const encryption = require('bcrypt')
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
            unique: {
               msg: 'This email is already taken.'
           },

            validate: { 
               isEmail: {args: true ,msg : 'please enter valid email'},
                 max : {args:3 ,msg:'maximum Email size is 50'},
                 isUnique(value) {
          
                  return User.findOne({where:{email:value}})
                    .then((name) => {
                      if (name) {
                        throw new Error('email already exist');
                      }
                    })
                }
                 ,

             },
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
            validate: {len:{
               args:[8,15],
               msg:'phone must be 8 numbers at least and 15 number maximum'
            },} ,

           

         },
            
         password:{
            type:Datatype.STRING,
            allowNull:false,        
         },
         token:{
            type:Datatype.STRING,
         }

         
    });

    User.associate = models=>{
      User.hasMany(models.Warehouse,{
        // onDelete:'cascade',
         onUpdate:'cascade'
      })
      User.hasMany(models.Request,{
         onDelete:'cascade',
         onUpdate:'cascade'
      })
    }


    return User;
}