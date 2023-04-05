module.exports = (sequelize,Datatype)=>{
    
     const Warehouse_Product = sequelize.define('Warehouse_Product',{
       
        ProductId : {
            type : Datatype.INTEGER ,
            foreignKey : true,
            
         },
         WarehouseId : {
            type : Datatype.INTEGER ,
            foreignKey : true,
            
         },
     })
    
    
    return Warehouse_Product;
    }