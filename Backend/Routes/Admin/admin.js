const express=require('express');
const router=express.Router();
const Admin=require('../../Models/admin')
const User=require('../../Models/User');
const fetchadmin=require('../../Middleware/fetchadmin')
const quiz=require('../../Models/quiz');
router.post('/createquiz',fetchadmin,async (req,res)=>{
    try{
const userId=req.user.id;
let user=await Admin.findOne({_id:userId}).select("user_id")
let abc=await quiz.create({
   admin:user.user_id,
   quiz:req.body.quiz,
   class:req.body.class,
   sub_name:req.body.sub_name,
   start:req.body.start,
   end:req.body.end ,
   quizname:req.body.quizname,
   totalmarks:req.body.totalmarks
})
res.status(200).json("Succesfully Created")
    }
    catch(e)
    {
      console.log(e)
    }
})
router.get('/',fetchadmin,async(req,res)=>{
  try{
    const userId=req.user.id;
    let user=await Admin.findOne({_id:userId}).select("user_id")
    const ans=await quiz.find({admin:user.user_id});
    let admin=await Admin.findOne({_id:userId}).select("name")
    res.json({ans,admin});
  }
  catch(e)
  {
    console.log(e)
  }
})
router.post('/viewresults',fetchadmin,async(req,res)=>{
    try{
    const userId=req.user.id;
    let classs=req.body.class;
    let quizid=req.body.quizid;
    let user=await User.find({class:classs});
    let marks;
    let arr=new Array();
    user.forEach((element)=>{
        marks=0;
        element.quiz.forEach((element1)=>{
            if(element1.quiz_id==quizid)
             marks=element1.marks;
        })
        let obj={
   "name":element.name,
   "userid":element.user_id,
   "marks":marks,
   "class":classs
        }
        arr.push(obj);
       
    })

    res.json(arr);
}
catch(e)
  {
    console.log(e)
  }
})
module.exports=router;