const db = require('../models')
const { Op } = require("sequelize");

const DashboardDataForAdmin = async (req,res)=>{
    const Warehouse = await db.Warehouse.count({where:{isActive:true}})
    const SuperVisors = await db.User.count({where:{isActive:true,isAdmin:false}})
    const Requests = await db.Request.count({where:{status : false}});


     res.status(200).json({Warehouse,SuperVisors,Requests});

}

module.exports ={
    DashboardDataForAdmin,

}