

module.exports = (sequelize,Datatype)=>{
    
     const Product = sequelize.define('Product',{
         id : {
             type : Datatype.INTEGER ,
             primaryKey : true,
             autoIncrement : true
          },
          name : {
             type :Datatype.STRING,
             len : [4,25],
             allowNull : false
          },
          description : {
            type :Datatype.STRING,
            allowNull : false
           
         },
          price : {
            type : Datatype.INTEGER ,
            allowNull:false
         },
         stock : {
            type : Datatype.INTEGER ,
            allowNull:false
         },
         image:{
            type : Datatype.STRING,
         }
       
        
    }
          
     );

   Product.associate = models=>{
    //Product.belongsToMany(models.Warehouse,{ through: models.Warehouse_Product , foreignKey:'ProductId' })
    Product.belongsTo(models.Warehouse,{
      //onDelete:'cascade',
      onUpdate:'cascade'
   })
}

     return Product;
 }