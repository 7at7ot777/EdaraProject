const db = require('../models');
const fs = require('fs');
const {resolve} = require('path');




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

const isProduct = (Product)=> { return Product instanceof db.Product}

const getProduct = async (req,res)=>{
    var Product = await db.Product.findByPk(req.params.id);
    if(isProduct(Product))
    {
        var absolutePath = resolve('./upload/'+Product.image);
        Product.image = absolutePath;
        res.json( Product)
    }
    else{
        res.json({'error':'Product Not Found'})
    }
}

const getAllProduct = async (req,res)=>{
       var  Products = await db.Product.findAll({where:{WarehouseId : req.params.WarehouseId}})
        if(isProduct(Products[0]))
        {
            Products.forEach(element => {
                var absolutePath = resolve('./upload/'+element.image);
                 element.image = absolutePath;
            });
            res.json(Products)
        }
        res.json({'error':'There are no products in this warehouse'});
}

const deleteProduct=async (req,res)=>{
    var Product = await db.Product.findByPk(req.params.id);
    if(isProduct(Product))
    {
       fs.unlinkSync('./upload/'+Product.image)
       Product.destroy().then(()=>{
        res.json({'message':'Product deleted sucessfully'})
       })
    }
    else{
        res.json({'error':'Product Not Found'})
    }
}

const updateProduct= async (req,res)=>{
    var Product = await db.Product.findByPk(req.params.id);
    var body = req.body;
    if(isProduct(Product))
    {
      if(req.body.name)
      {
       Product.name = body.name
      }
      if(req.body.price)
      {
       Product.price = body.price
      }
      if(req.body.stock)
      {
       Product.stock = body.stock
      }
      if(req.body.description)
      {
       Product.description = body.description
      }
      if(req.file)
      {
        fs.unlinkSync('./upload/'+Product.image)
       Product.image = req.file.filename
      }

      await Product.save();
      res.json({'message':'Product updated sucessfully'})
     
       
    }
    else{
        res.json({'error':'Product Not Found'})
    }
}
module.exports = {
    addNewProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}