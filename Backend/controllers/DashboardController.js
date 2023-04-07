const db = require('../models')
const { Op } = require("sequelize");
const DashboardDataForAdmin = async (req,res)=>{
    const Warehouse = await db.Warehouse.count({where:{isActive:true}})
    const SuperVisors = await db.User.count({where:{isActive:true,isAdmin:false}})
    const Product = await db.Product.count({where:{stock:{[Op.ne]:0}}});


     res.status(200).json({'warehouse': Warehouse,SuperVisors,Product});

}

module.exports ={
    DashboardDataForAdmin,

}