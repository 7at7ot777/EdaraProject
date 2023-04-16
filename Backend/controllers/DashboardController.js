const db = require('../models')
const { Op } = require("sequelize");

const DashboardDataForAdmin = async (req,res)=>{
    const Warehouse = await db.Warehouse.count({where:{isActive:true}})
    const SuperVisors = await db.User.count({where:{isAdmin:false}})
    const Requests = await db.Request.count({where:{isAccepted : false}});


     res.status(200).json({'warehouse':Warehouse,'supervisors':SuperVisors,'requests':Requests});

}

const DashboardDataForSupervisor = async (req,res)=>{
    const Products = await db.Products.count({where:{
        WarehouseId : req.body.WarehouseId,}}
        )
    const Requests = await db.Request.count({where:{
        UserId : req.body.UserId,
        isActive : req.body.isActive
    }})
    res.status(200).json({'Products':Products,'Requests':Requests})
}

module.exports ={
    DashboardDataForAdmin,
    DashboardDataForSupervisor,

}