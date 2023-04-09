const db = require('../models')
const Warehouse = require('../models/Warehouse')
const ErrorMessage = require('./ErrorsController')
require

const addWarehouse = async(req,res)=>
{

    var WH = await db.Warehouse.build({
        name : req.body.name , 
        location : req.body.location ,
        User : [{id : req.body.userID}]
    }) 
        
return WH.validate()
.then(async (data)=>{
    const Supervisor = await db.User.findByPk(req.body.userID)
    if(Supervisor instanceof db.User){
        await WH.setUser(Supervisor);
        await WH.save();
        res.status(200).json({'message' : 'Warehouse is added successfully'})
    }
    else(
        res.json({'message':'Error in insertion of data'})
    )
  
}).catch((err)=>{
    console.log(err);
ErrorMessage.ErrorMessageResponse(err,res);
})

}

const getSupervisorNameAndID = async(req,res)=>
{
    Supervisors = await db.User.findAll({attributes : ['id','name']})
    res.status(200).json({Supervisors})
}

const setInActive = (req,res)=>
{
    id = req.params.id;
     db.Warehouse.findByPk(id).then(async (warehouse)=>{
        if(warehouse instanceof db.Warehouse){
            warehouse.isActive = false;
            await warehouse.save();
             res.json({'message':`Warehouse ${warehouse.name} is disabled`})
        }
        else{

            res.json({'message':'Not Found'})
        }
 
       
     }).catch((err)=>{
         console.log(err);
     });
}

const setActive = (req,res)=>{
    id = req.params.id;
    db.Warehouse.findByPk(id).then(async (warehouse)=>{
       if(warehouse instanceof db.Warehouse){
           warehouse.isActive = true;
           await warehouse.save();
            res.json({'message':`Warehouse ${warehouse.name} is Acitvatied!!`})
       }
       else{

           res.json({'message':'Not Found'})
       }

      
    }).catch((err)=>{
        console.log(err);
    });
}


const getWarehouses =async (req,res)=>
{
   const warehouse = await db.Warehouse.findAll({include:{model :db.User , attributes:['name','id']}});
    res.json(warehouse);

}


const deleteWarehouse = async(req,res)=>
{   
    const warehouse  = await db.Warehouse.findByPk(req.params.id)
        if(warehouse instanceof db.Warehouse){
         await warehouse.destroy();
         res.json({'message':'Warehouse deleted'})

        }
        else{
 
            res.json({'message':'Not Found'})
        }
}


module.exports = {
    addWarehouse,
    getSupervisorNameAndID,
    setInActive,
    setActive,
    getWarehouses,
    deleteWarehouse,
}

