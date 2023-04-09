var db = require('../models')
const encryption = require('bcrypt')


const login = async(req,res)=>
{
    const requestBody = req.body;
   
  
    const USER = await db.User.findOne({ where: { 
    email : requestBody.email}})
   
    if (USER === null) {
        res.status(404).json({'message':'user not found'})
      } else {
       encryption.compare(requestBody.password,USER.password,(error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            { 
             delete USER.dataValues.password;
             delete USER.dataValues.createdAt;
             delete USER.dataValues.updatedAt;


                res.status(200).json({'user':USER})}
        }
        else {
            // response is OutgoingMessage object that server response http request
             res.status(400).json({message: 'passwords do not match'});
          }
       })
      
      }
}


module.exports =
{
    login
}