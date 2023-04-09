var db = require('../models')
const encryption = require('bcrypt')
const crypto = require('crypto');
const addUser = async(req,res)=>
{   
    //name //phone //email //password
    var use = await db.User.build({name : req.body.name , 
                                  phone : req.body.phone , 
                                  email : req.body.email , 
                                  password : req.body.password,
                                  token : crypto.randomBytes(16).toString('hex')})
    return use.validate()
    .then(async (data)=>{
     console.log(use.password)
        encryption.hash(use.password,10,async (error,hash)=>{
            use.password = hash;
            await use.save();
            delete use.password;
            res.status(201).json({'message' : 'data is inserted successfully','UserData':use})

        });
    }).catch((err)=>{
       // console.log(err)
       ErrorMessageResponse(err,res);
    })
    
   
}

const getAllUsers = (req,res)=>{
     db.User.findAll({attributes:['id','name','email','phone','isActive'],where:{isAdmin:0}}).then((result)=>{
         res.json(result);
    });
}

const setInActive = async (req,res) =>{
    id = req.params.id;
   // console.log(id);
    db.User.findByPk(id).then((result)=>{
       if(result instanceof db.User){
            result.isActive = false;
            result.save();
            res.json({'message':'Supervisor Account is now inActive'})
       }
       res.json({'message':'Not Found'})

      
    }).catch((err)=>{
        console.log(err);
    });
  }

  const setActive = async (req,res) =>{
    id = req.params.id;
   // console.log(id);
    db.User.findByPk(id).then(async (result)=>{
       if(result instanceof db.User){
            result.isActive = true;
           await  result.save();
            res.json({'message':'Supervisor Account is Acivatied!'})
       }
       res.json({'message':'Not Found'})

      
    }).catch((err)=>{
        console.log(err);
    });
  }

  const getUser = (req,res)=>
  {
    id = req.params.id;
    // console.log(id);
     db.User.findByPk(id).then((result)=>{
        if(result instanceof db.User){ //not null
             res.json({'user':result})
        }
        res.json({'message':'User Not Found'})
 
       
     }).catch((err)=>{
         console.log(err);
     });

  }
 const updateUser = (req,res)=>{
    id = req.params.id;
    body = req.body;
    
     db.User.findByPk(id).then(async (result)=>{
        if(result instanceof db.User){ //not null
             result.name = (body.name || (body.name ==='' ? result.name: body.name)) ??  result.name ;
             result.email = (body.email || (body.email ==='' ? result.email: body.email)) ?? result.email;
             result.phone = (body.phone || (body.phone ==='' ? result.phone: body.phone)) ?? result.phone ;
             result.password = (body.password || (body.password ==='' ? result.password: body.password)) ?? result.password;
             result.isActive = (body.isActive || (body.isActive ==='' ? result.isActive: body.isActive)) ??  result.isActive ;
            await result.save();
             res.json({'message':'User updated successfully'})
        }
        res.json({'message':'User Not Found'})
 
       
     }).catch((err)=>{
         console.log(err);
         ErrorMessageResponse(err,res)
     });
  }
const ErrorMessageResponse = (err,res)=>{
    console.log(err)
        ErrorMsgs = err.errors;
        var errorList = []
        Object.keys(ErrorMsgs).forEach(element => {
            errorList.push(ErrorMsgs[element].message)
            console.log(ErrorMsgs[element].message)
           
        });
        res.status(400).json({'errors': errorList})
}
module.exports ={
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    setInActive,
    setActive
}