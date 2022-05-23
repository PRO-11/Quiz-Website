const express=require('express');
const fetchadmin=require('../../Middleware/fetchadmin')
const quiz=require('../../Models/quiz');
const User=require('../../Models/User');
var timeout = require('connect-timeout')
const router=express.Router();

function changedate(startdate)
{
  let date=Number(startdate.substring(8,10));
  let mon=Number(startdate.substring(5,7));
  let year=Number(startdate.substring(0,4));
  date+=1;
 if(date>30){
   mon+=1;
   date=1;
 }
   if(date<10)
   date="0"+date
   if(mon<10)
   mon="0"+mon
   startdate=year+"-"+mon+"-"+date
  return startdate
}
function gettime(start,end)
{
   try{
 let endhr=Math.floor((end/60));
let endmin=end-endhr*60;
let hrst= Number(start.substring(0, 2));
let minst=Number(start.substring(3, 5));
let secst ="03"

endmin=(endmin+minst);
let flag=0;
if(endmin>59)
{
 flag=1;
 endmin-=60;
}
let dtchg=0;
  if(endhr+hrst+flag>23)
  dtchg=1
  endhr = ((endhr + hrst + flag)%24).toString();
  if (Number(endhr) < 10)
    endhr = "0" + endhr;
  if (Number(endmin) < 10)
    endmin = "0" + endmin;
  return {"end":endhr + ":" + endmin + ":" + secst,dtchg};
   }
   catch(e)
   {
      console.log(e);
   }
}
const calculate = (date) => {
   try{
   let str = "";
   for (let i = 0; i < date.length; i++) {
      if (date[i] == ',')
         break;
      str += date[i];
   }
   str = str.split('/')
   let ans = "";
   ans += str[2] + '-';
   if (Number(str[0]) < 10)
      str[0] = '0' + str[0];
   ans += str[0] + '-';
   if (Number(str[1]) < 10)
      str[1] = '0' + str[1];
   ans += str[1];
   return ans;
}
   catch(e)
   {
   console.log(e);;
   }
}



router.get('/',fetchadmin,async (req,res)=>{
  try{
    let userid=req.user.id;
  let userinfo=await User.findOne({_id:userid});
    let success=false;
    let user=await User.findOne({_id:userid}).select("class");
//fetch all quiz of class
   let allquiz=await quiz.find({class:user.class});
   
   let ans=new Array();
     let arr1=new Array();
   allquiz.forEach((element)=>{
    let arr1=new Array();
    element.quiz.forEach((element1)=>{
      let abc={ 
        "Ques":element1.Ques,
       "Option1":element1.Option1,
       "Option2":element1.Option2,
       "Option3":element1.Option3,
       "Option4":element1.Option4,
       "marks":element1.Marks
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
   res.json({userinfo,ans}); 
  }
  catch(e)
  {
    console.log(e)
  }
})
router.post('/submitquiz',fetchadmin,async (req,res)=>
{
  let quiz_id=req.body.id;
  let quizgiven=await quiz.findOne({_id:quiz_id});
    
  let start = quizgiven.start;
  let end=quizgiven.end;
 let start1 = start.toISOString().substring(0, 10);
 
 let date1 = new Date().toLocaleString();
 date1 = calculate(date1);
 let time1=gettime(start.toISOString().substring(11,19),end);
 let dtchg=time1.dtchg;
if(dtchg){
  start1=changedate(start1)
 }
 time1=time1.end
 let hour = new Date().getHours()
 let min = new Date().getMinutes()
 let sec = new Date().getSeconds()
 if (Number(min) < 10) {
    min = '0' + min;
  }
  if (Number(hour) < 10) {
     hour = '0' + hour;
  }
  if (Number(sec) < 10) {
     sec = '0' + sec;
  }
  let time2 = hour + ":" + min + ":" + sec;
  console.log(start1,date1,time1,time2)
   if(start1!=date1||((start1==date1)&&time1<time2))
   {
     let marks="Delay"
    res.json({marks});
   }

  else{
  let ans=new Array();
  let correct=new Array();
  let k=0,marks=0;
     let quizres=req.body.quiz;
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
    }
})



module.exports=router
