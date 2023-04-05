const express = require('express');
const db = require('./models');
const AdminRouter = require('./routes/AdminRoutes')
const bp = require('body-parser')

//express new instance 
const app = express();

//migrate db
db.sequelize.sync({alter:true}).then(()=>{
  
// listen to port number 
app.listen(3000,()=>console.log('app is listening on port 3000'));

});

//very very important to convert request to dictionary to read 
app.use(express.urlencoded({extended:true}))
//app.use(express.json());             // for application/json
app.use(express.urlencoded());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.get('/',(req,res)=>{
  res.send('asdasdasd');
})
app.use(AdminRouter)



