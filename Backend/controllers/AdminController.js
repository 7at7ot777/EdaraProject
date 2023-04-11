var db = require('../models')
const encryption = require('bcrypt')
const crypto = require('crypto');
const ErrorMessage = require('./ErrorsController')
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
       ErrorMessage.ErrorMessageResponse(err,res);
    })
    
   
}



const getAllUsers = (req,res)=>{
     db.User.findAll({attributes:['id','name','email','phone','isActive'],
                     where:{isAdmin:0} ,
                     include:{model :db.Warehouse,attributes:['name','id']}})
    .then((result)=>{
        var Supervisor = result
     
        res.json(Supervisor);
    });
}

const setInActive = async (req,res) =>{
    id = req.params.id;
   // console.log(id);
    db.User.findByPk(id).then((Supervisor)=>{
       if(Supervisor instanceof db.User){
            Supervisor.isActive = false;
            Supervisor.save();
            res.json({'message':'Supervisor Account is now inActive'})
       }
       res.json({'error':'Not Found'})

      
    }).catch((err)=>{
        console.log(err);
    });
  }

  const setActive = async (req,res) =>{
    id = req.params.id;
   // console.log(id);
    db.User.findByPk(id).then(async (Supervisor)=>{
       if(Supervisor instanceof db.User){
            Supervisor.isActive = true;
           await  Supervisor.save();
            res.json({'message':'Supervisor Account is Acivatied!'})
       }
       res.json({'error':'Not Found'})

      
    }).catch((err)=>{
        console.log(err);
    });
  }

  const getUser = (req,res)=>
  {
    id = req.params.id;
    // console.log(id);
     db.User.findByPk(id).then((Supervisor)=>{
        if(Supervisor instanceof db.User){ //not null
             res.json({'user':Supervisor})
        }
        res.json({'error':'User Not Found'})
 
       
     }).catch((err)=>{
         console.log(err);
     });

  }
 const updateUser = async (req,res)=>{
    id = req.params.id;
    Body = req.body;
    
    var Supervisor = await db.User.findByPk(id);
    if(Supervisor instanceof db.User){ //not null
                   // if request body is empty or null     ? keep old value  : update the value 
        Supervisor.name =  (Body.name === null|| Body.name === '')? Supervisor.name : Body.name ;
        if(Body.email != Supervisor.email)
        {
            Supervisor.email =  (Body.email === null|| Body.email === '')? Supervisor.email : Body.email ;
        }
        Supervisor.phone =  (Body.phone === null|| Body.phone === '')? Supervisor.phone : Body.phone ;
        Supervisor.isActive =  (Body.isActive === null|| Body.isActive === '')? Supervisor.isActive : Body.isActive ;

       /* await encryption.hash(Body.password,10,(err,hash)=>{
            Supervisor.password =  (Body.password === null|| Body.password === '')? Supervisor.password : hash ;

         });*/
         var newPassword = (Body.password === null|| Body.password === '')? Supervisor.password : 0 ;
         if(newPassword == 0){
           
            encryption.genSalt(10, (err, salt) =>
          encryption.hash(newPassword, salt, (error, hash) => {
           // if (error) throw error;
            Supervisor.password = hash;
            console.log('password changed')
          
          })
        );    
        
        }
            await Supervisor.save();

        res.json({'message':'User updated successfully',Body})

     
   }else{
    res.json({'error':'User Not Found'})

   }


  }

const deleteSupervisor = async(req,res)=>
{
    const user  = await db.User.findByPk(req.params.id)
    if(user instanceof db.User){
     await user.destroy();
     res.json({'message':'user deleted'})

    }
    else{

        res.json({'error':'Not Found'})
    }

}

const getInActiveSupervisors = async(req,res)=>{
    db.User.findAll({attributes:['id','name','email','phone','isActive'],where:{isAdmin:0 , isActive: 0}}).then((Supervisor)=>{
        res.json(Supervisor);})
    }
    
    

module.exports ={
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    setInActive,
    setActive,
    deleteSupervisor,
    getInActiveSupervisors,
}