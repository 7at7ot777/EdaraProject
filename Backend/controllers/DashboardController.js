const db = require('../models')
const { Op } = require("sequelize");

const DashboardDataForAdmin = async (req,res)=>{
    const Warehouse = await db.Warehouse.count({where:{isActive:true}})
    const SuperVisors = await db.User.count({where:{isAdmin:false}})
    const Requests = await db.Request.count({where:{status : false}});


     res.status(200).json({'warehouse':Warehouse,'supervisors':SuperVisors,'requests':Requests});

}

module.exports ={
    DashboardDataForAdmin,

}