const User = require('../models')
const addUser = (req,res)=>
{
    console.log(req.body.name)

    //name //phone //email //password
    User['User'].create({name:req.body.name , phone:req.body.phone , email:req.body.email , password:req.body.password})
    .then(()=>{
         res.status(201).json({'message' : 'Added Successfully'})
       

    }).catch((err)=>{console.log(err)
        res.status(400).json({'message':'problem in inserting data'})
    })
    
   
}


module.exports ={
    addUser,
}