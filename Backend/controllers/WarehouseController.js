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
    const warehouse = await db.User.findByPk(req.body.userID)
    if(warehouse instanceof db.User){
        await WH.setUser(warehouse);
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

const getwarehouseNameAndID = async(req,res)=>
{
    var warehouses = await db.User.findAll({attributes : ['id','name']})
    res.status(200).json({warehouses})
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

const updateWarehouse = async(req,res)=>{
    var id = req.params.id;
    var Body = req.body;
    
    var warehouse = await db.Warehouse.findByPk(id,{
        include: {
          model: db.User,
          attributes: ['name','id']
        }})
    if(warehouse instanceof db.Warehouse){ //not null
                   // if request body is empty or null     ? keep old value  : update the value 
        
        warehouse.name =  (Body.name === null|| Body.name === '')? warehouse.name : Body.name ;
        warehouse.isActive =  (Body.isActive === null|| Body.isActive === '')? warehouse.isActive : Body.isActive ;
        warehouse.location =  (Body.location === null|| Body.location === '')? warehouse.location : Body.location ;
        warehouse.UserId =  (Body.UserId === null|| Body.UserId === '')? warehouse.UserId : Body.UserId ;

       
        
              await warehouse.save().then((res)=>{
                res.json({'message':'warehouse updated successfully'})

              }).catch((err)=>{res.json({'message':'warehouse updated successfully'})});
         

     
   }else{
    res.json({'message':'User Not Found'})

}}

module.exports = {
    addWarehouse,
    getwarehouseNameAndID,
    setInActive,
    setActive,
    getWarehouses,
    deleteWarehouse,
    updateWarehouse
}

