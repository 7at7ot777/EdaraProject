const express = require('express');
const db = require('./models');
const AdminRouter = require('./routes/Admin/AdminRoutes')
const DashBoardRouter = require('./routes/Admin/DashboardRoutes')
const AuthRouter = require('./routes/Admin/AuthRoutes')
const WarehouseRouter = require('./routes/Admin/WarehouseRoute')
const ProductRouter = require('./routes/Admin/ProductRoute')
const RequestRouter = require('./routes/RequestsRoute')
//const fileUpload = require('express-fileupload');


const bp = require('body-parser')
const cors=require("cors");

//express new instance 
const app = express();

//migrate db
db.sequelize.sync(/*{force:true}*/).then(()=>{
  
// listen to port number 
app.listen(8000,()=>console.log('app is listening on port 8000'));

});

//allow website to access images
app.use(express.static('upload'))

//very very important to convert request to dictionary to read 
app.use(express.urlencoded({extended:true}))
//app.use(express.json());             // for application/json
app.use(express.urlencoded());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//app.use(fileUpload());


const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


app.get('/',(req,res)=>{
  res.send('asdasdasd');
})
app.use(AdminRouter);
app.use(DashBoardRouter);
app.use(AuthRouter);
app.use(WarehouseRouter);
app.use(ProductRouter);
app.use(RequestRouter);







