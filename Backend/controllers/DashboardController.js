const db = require('../models')
const { Op } = require("sequelize");

const DashboardDataForAdmin = async (req,res)=>{
    const Warehouse = await db.Warehouse.count({where:{isActive:true}})
    const SuperVisors = await db.User.count({where:{isAdmin:false}})
    const Requests = await db.Request.count({where:{isAcitve : true}});


     res.status(200).json({'warehouse':Warehouse,'supervisors':SuperVisors,'requests':Requests});

}

const DashboardDataForSupervisor = async (req,res)=>{ 
    const UID =  req.headers.userid;
    const WarehouseIdentfication = await db.Warehouse.
        findOne({where:{UserId :UID},attributes:['id']})   
    
        const Requests = await db.Request.count({where:{
        UserId :UID,
        isAcitve :true
    }})
      if(WarehouseIdentfication){

          const Products = await db.Product.count({where:{
              WarehouseId : WarehouseIdentfication?.id}}
              )  
         
    res.status(200).json({'Products':Products,'Requests':Requests,WarehouseIdentfication})
            }
            else{
                res.status(200).json({Requests,WarehouseIdentfication})
            }
       
  
}

module.exports ={
    DashboardDataForAdmin,
    DashboardDataForSupervisor,

}