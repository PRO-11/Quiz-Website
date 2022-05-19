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
router.post('/viewquiz',fetchadmin,async(req,res)=>{
  try{
    const quiz_id=req.body.quiz_id;
    const ans=await quiz.findOne({_id:quiz_id});
    res.json(ans);
  }
  catch(e)
  {
    console.log(e)
  }
})
router.post('/updatedate',fetchadmin,async(req,res)=>{
  try{
    const quiz_id=req.body.quiz_id;
     const start=req.body.start;
     const end=req.body.end;
    const ans=await quiz.updateOne({_id:quiz_id}, {$set:{"start":start,"end":end}})
    console.log(ans)
    res.json("success");
  }
  catch(e)
  {
    console.log(e)
  }
})
router.post('/updateques',fetchadmin,async(req,res)=>{
  try{
    const quiz_id=req.body.quiz_id;
    const ques_id=req.body.ques_id
    const up_quiz=req.body.quiz
    const ques=up_quiz.Ques;
    const Op1=up_quiz.Option1
    const Op2=up_quiz.Option2
    const Op3=up_quiz.Option3
    const Op4=up_quiz.Option4
    const corr=up_quiz.Correct
    const marks=Number(up_quiz.Marks)
    let oldmarks=0;
    let oldquiz=await quiz.findOne({_id:quiz_id})
    oldquiz.quiz.forEach((element)=>{
      if((element._id)==ques_id)
      oldmarks=Number(element.Marks);
    })
    let totalmarks=Number(oldquiz.totalmarks);
    totalmarks=totalmarks-oldmarks+marks;
    const updatettmarks=await quiz.updateOne({_id:quiz_id},{$set:{"totalmarks":Number(totalmarks)}});
    const ans=await quiz.updateOne({"quiz._id":ques_id}, {$set:{"quiz.$.Ques":ques,"quiz.$.Option1":Op1,
    "quiz.$.Option2":Op2,"quiz.$.Option3":Op3,"quiz.$.Option4":Op4,"quiz.$.Correct":corr,"quiz.$.Marks":marks}})
    console.log(ans)
    res.json("success");
  }
  catch(e)
  {
    console.log(e)
  }
})
module.exports=router;