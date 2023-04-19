const db = require('../models')
const { Op } = require("sequelize");

const DashboardDataForAdmin = async (req,res)=>{
    const Warehouse = await db.Warehouse.count({where:{isActive:true}})
    const SuperVisors = await db.User.count({where:{isAdmin:false}})
    const Requests = await db.Request.count({where:{isAcitve : true}});


     res.status(200).json({'warehouse':Warehouse,'supervisors':SuperVisors,'requests':Requests});

}

const DashboardDataForSupervisor = async (req,res)=>{ 
    const WarehouseIdentfication = await db.Warehouse.
        findOne({where:{UserId : req.headers.userid},attributes:['id']})
      
    const Products = await db.Product.count({where:{
        WarehouseId : WarehouseIdentfication}}
        )
       
    const Requests = await db.Request.count({where:{
        UserId : req.headers.userid,
        isAcitve :true
    }})
    res.status(200).json({'Products':Products,'Requests':Requests,WarehouseIdentfication})
}

module.exports ={
    DashboardDataForAdmin,
    DashboardDataForSupervisor,

}