const express = require('express');
const db = require('./models');
const AdminRouter = require('./routes/AdminRoutes')
const DashBoardRouter = require('./routes/DashboardRoutes')
const bp = require('body-parser')
const cors=require("cors");

//express new instance 
const app = express();

//migrate db
db.sequelize.sync(/*{alter:true}*/).then(()=>{
  
// listen to port number 
app.listen(3000,()=>console.log('app is listening on port 3000'));

});

//very very important to convert request to dictionary to read 
app.use(express.urlencoded({extended:true}))
//app.use(express.json());             // for application/json
app.use(express.urlencoded());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


app.get('/',(req,res)=>{
  res.send('asdasdasd');
})
app.use(AdminRouter)
app.use(DashBoardRouter)




