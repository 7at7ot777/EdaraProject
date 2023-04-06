var db = require('../models')
const addUser = (req,res)=>
{
   // console.log(req.body.name)
    //var err = db.User.validate

    //name //phone //email //password
    var use = db.User.build({name:req.body.name , phone:req.body.phone , email:req.body.email , password:req.body.password})
    return use.validate()
    .then((data)=>{
        use.save();
         res.status(201).json({'message' : 'data is inserted successfully'})
       

    }).catch((err)=>{
        console.log(err)
        ErrorMsgs = err.errors;
        var errorList = []
        Object.keys(ErrorMsgs).forEach(element => {
            errorList.push(ErrorMsgs[element].message)
            console.log(ErrorMsgs[element].message)
           
        });
        res.status(200).json({'err': errorList})
    })
    
   
}

const getAllUsers = (req,res)=>{
     db.User.findAll({attributes:['name','email','phone','isActive']}).then((result)=>{
         res.json(result);
    });
   
}


module.exports ={
    addUser,
    getAllUsers,
}