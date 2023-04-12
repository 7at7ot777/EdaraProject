const db = require('../models');
const fs = require('fs');

const addNewProduct = async (req,res)=>{
    var body = req.body
    var Product = db.Product.build({
        name:body.name,
        description: body.description,
        stock:body.stock,
        price:body.price,
        WarehouseId : req.params.WarehouseId,
        image: req.file.filename
    })

    await Product.save();
    res.json({'message':'Product uploadded sucessfully'})
}

const getProduct = (req,res)=>{

}

module.exports = {
    addNewProduct,
    getProduct,

   

}