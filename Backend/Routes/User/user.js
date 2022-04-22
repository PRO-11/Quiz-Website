const express=require('express');
const fetchadmin=require('../../Middleware/fetchadmin')
const quiz=require('../../Models/quiz');
const User=require('../../Models/User');
const router=express.Router();
router.get('/',fetchadmin,async (req,res)=>{
    let userid=req.user.id;
    let success=false;
    let user=await User.findOne({_id:userid}).select("class");
//fetch all quiz of class
   let allquiz=await quiz.find({class:user.class});
   
   let ans=new Array();
     let arr1=new Array();
   allquiz.forEach((element)=>{
    let arr1=new Array();
    element.quiz.forEach((element1)=>{
      let abc={ "Ques":element1.Ques,
       "Option1":element1.Option1,
       "Option2":element1.Option2,
       "Option3":element1.Option3,
       "Option4":element1.Option4
          }
      arr1.push(abc);
     })
    let quizes={
      "quiz_id":element._id,
        "admin": element.admin,
        "quiz":arr1,
        "classs":element.class,
        "subname":element.sub_name,
        "start":element.start,
        "quizname":element.quizname,
        "end":element.end,
        "totalmarks":element.totalmarks
    }
    ans.push(quizes);
   })
   success=true;
   res.json({success,ans}); 
})
router.post('/submitquiz',fetchadmin,async (req,res)=>
{
  let ans=new Array();
  let correct=new Array();
  let k=0,marks=0;
     let quiz_id=req.body.id;
     let quizres=req.body.quiz;
     let quizgiven=await quiz.findOne({_id:quiz_id});
     quizgiven.quiz.forEach((element)=>{
         ans.push(element.Correct);
         correct.push(element.Marks);
     })
     quizres.forEach((element)=>{
      if(element!=="-1")
      {
        if(element==ans[k])
        marks=marks+correct[k];
      }
      k++;
     })
     let user=await User.updateOne({_id:req.user.id}, {$push:{quiz:{"quiz_id":quiz_id ,"marks":marks }} });
     res.json(JSON.stringify(marks));
})
router.get('/getuser',fetchadmin,async (req,res)=>{
  let userid=req.user.id;
  let user=await User.findOne({_id:userid});
  res.json(user);
})
router.post('/startTimer',(req,res)=>{
  let start= req.body.start
  let end=req.body.end
  let s=end.substring(0,10);
  let b=end.substring(11,19)
  let ans=s+" "+b;
  start=Date.parse(start);
  end=Date.parse(ans);
  let diff=(end-start);
  setTimeout(() => {
      res.json("stop");
  }, diff);
})
module.exports=router
