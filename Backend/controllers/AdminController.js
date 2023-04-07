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
       ErrorMessageResponse(err,res);
    })
    
   
}

const getAllUsers = (req,res)=>{
     db.User.findAll({attributes:['id','name','email','phone','isActive']}).then((result)=>{
         res.json(result);
    });
}

const deleteUser = async (req,res) =>{
    id = req.params.id;
   // console.log(id);
    db.User.findByPk(id).then((result)=>{
       if(result instanceof db.User){
            result.destroy();
            res.json({'message':'user deleted succesfully'})
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
        res.status(200).json({'errors': errorList})
}
module.exports ={
    addUser,
    getAllUsers,
    deleteUser,
    getUser,
    updateUser
}