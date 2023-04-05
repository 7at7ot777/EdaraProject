const express = require('express');
const db = require('./models');

//express new instance 
const app = express();

//setting ejs to render views 
app.set('view engine','ejs'); //look directly on views folder 

//to parse JSON requests
app.use(express.urlencoded({extended:true}))

//migrate db
db.sequelize.sync({alter:true}).then(()=>{
  
// listen to port number 
app.listen(3000,()=>console.log('server listing'));
});

//middleware and static files
app.use(express.static('public')); //to make css ,js and images which resides in public folder appear to user 



//if No Routes Found it will be redirected to a 404 page 
app.use((req,res)=>{
  //  res.status(404).render('404',{'title':'404'});
})
