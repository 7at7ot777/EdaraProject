const db = require('../models');

const isRequest =  (Request)=>{return Request instanceof db.Request}
const makeRequest = async (req,res)=>{
    var body = req.body;
    var Request = db.Request.build({
        UserId : body.SupervisorID,
        ProductId :body.ProductID,
        quantity : body.quantity,
        isIncrease : body.isIncrease,
      

    })

    if(isRequest(Request))
    {
        await Request.save();
        res.json({'message':'request is done Successfully'})
    }else{
        res.json({'error':'An error has occured'})
    }

}

const isStockIncrease = (Request)=>{ return Request.isIncrease}

const processAceeptRequest = async (Request)=>{
    var Request = await db.Request.findByPk(Request.RequestId)
    if(isStockIncrease(Request))
    {
        Request.stock += Request.quantity;
        Request.isActive = 1 ; //Process is done
    }else{
        Request.stock -= Request.quantity;
        Request.isActive = 1 ; //Process is done
    }
    Request.isAccepted = 1; //Accepted
    await Request.save();
    await Request.save();
    

}
const acceptRequest = async(req,res)=>{
    var requestID = req.headers.requestid;
    var Request = await db.Request.findByPk(requestID);
    if(isRequest(Request))
    {
        processAceeptRequest(Request)
        res.json({'message':'Request is Proceeded Successfully'})
    }
    else{
        res.json({'error':'request not found'})
    }
}
const rejectRequest = async (req,res)=>{
    var requestID = req.headers.requestid;
  //  res.json(req.headers.requestid)
    var Request = await db.Request.findByPk(requestID);
    if(isRequest(Request))
    {
       Request.isActive = 1;
       Request.isAccepted = 0;
       await Request.save();
        res.json({'message':'Request is Proceeded Successfully'})
    }
    else{
        res.json({'error':'request not found'})
    }
}

const getAllRequestsForAdmin = (res)=>{
    db.Request.findAll().then((result)=>{
             res.json(result) 
            }) 
        
    
}
const getRequestsForUser = (id,res)=>{
    db.Request.findAll({where:{'UserId':id}}).then((result)=>{
         res.json(result) 
        
    })
}

const getRequests= async (req,res)=>{
    var user = await db.User.findByPk(req.headers.userid)
    if(user instanceof db.User)
    {
        if(user.isAdmin == 1)
        {
            getAllRequestsForAdmin(res);
        }
        else {
            getRequestsForUser(user.id,res)
        }
    }
    else{
        res.json({'error':'an error has occured'})
    }
}

const deleteRequest = async (req,res)=>{
    var Request = await db.Request.findByPk(req.params.requestID);
    if(isRequest(Request))
    {
       Request.destroy().then(()=>{
        res.json({'message':'Request deleted sucessfully'})
       })
    }
    else{
        res.json({'error':'Request Not Found'})
    }
}




module.exports = {
    makeRequest,
    acceptRequest,
    rejectRequest,
    getRequests,
    deleteRequest,
}