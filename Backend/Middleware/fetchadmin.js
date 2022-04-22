const jwt=require('jsonwebtoken');
const jwt_SECRET="QuizeSite#123"
const fetchadmin= (req,res,next)=>{
    //Get user from jwt token
    const token=req.header('auth-token');
    let success=false;
    if(!token){
    res.status(401).send({success,error:"Please authenticate using valid token"})
    }
    try{   
const data=jwt.verify(token,jwt_SECRET);
req.user=data.user;
next()  }
    catch(error)
    {
        res.status(401).send({success,error:"Please authenticate using valefid token"})
    }
}
module.exports=fetchadmin;
