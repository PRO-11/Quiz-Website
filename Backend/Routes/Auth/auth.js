const express=require('express');
const Admin=require('../../Models/admin')
const User=require('../../Models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const fetchadmin=require('../../Middleware/fetchadmin')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const jwt_SECRET="QuizeSite#123"



//  Admin Authentication
router.post('/createadmin',
body('user_id','Enter valid username').isLength({min:7}),
body('password','Enter correct credentials').isLength({ min: 5 }),
async (req, res) => {
    const errors = validationResult(req);
     try{
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); 
}

  let user=await Admin.findOne({user_id:req.body.user_id});
  if(user)
  return res.status(400).json({msg:" UserId Exist"});
  
  const salt=await bcrypt.genSalt(10)
const secpass=await bcrypt.hash(req.body.password,salt);
user=await Admin.create({
    user_id:req.body.user_id,
    name:req.body.name,
    password:secpass
  })
  const data=await {
    user:
    {
      id:user.id
    }
  }
  const authtoken=jwt.sign(data,jwt_SECRET)
  let success=JSON.stringify("SUUCESS");
  res.json({success,authtoken}) 
}
catch(err){
res.status(401).send("Internal Server Error");
}
})

// login
router.post('/admin/login',
body('user_id','Enter valid username').isLength({min:7}),
body('password','Enter correct credentials').isLength({ min: 5 }),
async (req, res) => {
    const errors = validationResult(req);
    
    //  try{
  if (!errors.isEmpty()) 
    return res.status(400).json({ errors: errors.array() });
    let user=await Admin.findOne({user_id:req.body.user_id});
  if(!user)
  return res.status(400).json({error:"Please try to login with correct credentials "});
  const passcmp=await bcrypt.compare(req.body.password,user.password);
  if(!passcmp){
  return res.status(400).json({error:"Please try to login with correct credentials "});
  }
  const data={
    user:{
      id:user.id
    }
  }
  const authtoken=jwt.sign(data,jwt_SECRET)
  let success=JSON.stringify("SUUCESS");
  res.json({success,authtoken}) 
//      }
// catch(err){
//   res.status(401).send("Internal Server Error");
//   }
  })
  router.get('/getadmin',fetchadmin,async (req,res)=>{
    try{
    let userId=req.user.id;
    let user=await Admin.findOne({_id:userId}).select("-password");
    res.send(user);
    }
    catch{
      res.status(401).send("Internal Server Error");
    }
  })




//User Authentication

router.post('/createuser',
body('user_id','Enter valid userId').isLength({min:7}),
body('password','Enter correct credentials').isLength({ min: 5 }),
async (req, res) => {
    const errors = validationResult(req);
    let success=false;
     try{
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); 
}

  let user=await User.findOne({user_id:req.body.user_id});
  if(user)
  return res.status(400).json({msg:" UserId Exist"});
  
  const salt=await bcrypt.genSalt(10)
const secpass=await bcrypt.hash(req.body.password,salt);
user=await User.create({
    user_id:req.body.user_id,
    name:req.body.name,
    password:secpass,
    class:req.body.class,
    quiz:[]
  })
  const data=await {
    user:
    {
      id:user.id
    }
  }
  const authtoken=jwt.sign(data,jwt_SECRET)
  success=true;
  res.json({success,authtoken}) 
}
catch(err){
res.status(401).send("Internal Server Error");
}
})
// login
router.post('/user/login',
body('user_id','Enter valid username').isLength({min:7}),
body('password','Enter correct credentials').isLength({ min: 5 }),
async (req, res) => {
    const errors = validationResult(req);
     try{
       let success=false;
  if (!errors.isEmpty()) 
    return res.status(400).json({ errors: errors.array() });
    let user=await User.findOne({user_id:req.body.user_id});
  if(!user){
  return res.status(400).json({success,error:"Please try to login with correct credentials "});
  }
  const passcmp=await bcrypt.compare(req.body.password,user.password);
  if(!passcmp){
  return res.status(400).json({success,error:"Please try to login with correct credentials "});
  }
  const data={
    user:{
      id:user.id
    }
  }
  const authtoken=jwt.sign(data,jwt_SECRET)
 success=true;
  res.json({success,authtoken}) 
     }
catch(err){
  res.status(401).send("Internal Server Error");
  }
  })
  router.get('/getuser',fetchadmin,async (req,res)=>{
    try{
    let userId=req.user.id;
    let user=await User.findOne({id:userId}).select("-password");
    res.send(user);
    }
    catch{
      res.status(401).send("Internal Server Error");
    }
  })
module.exports=router