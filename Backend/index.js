require('dotenv').config()
const connectToMongo = require('./db')
connectToMongo();
const express = require("express")
const User = require('./Models/User');
const quiz = require('./Models/quiz');
const app = express();
var cors = require('cors');

app.use(cors())
app.use(express.json())
app.use('/auth', require('./Routes/Auth/auth'));
app.use('/admin', require('./Routes/Admin/admin'));
app.use('/user', require('./Routes/User/user'))
const PORT=process.env.PORT ||5000;
app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`);
})
const updatee=async(id,quizid)=>{
   await User.updateOne({ _id:id }, { $push: { quiz: { "quiz_id": quizid, "marks": 0 } } });
}
const setquizmarks = async(id, classs) => {
   
   let user = await User.find({ class: classs });
   user.forEach((element) => {
      let flag = 0;
      element.quiz.forEach((element1) => {
         if ((element1.quiz_id )=== id) {
            flag = 1;
         }
      })
      if (!flag) {
          updatee(element.id,id);
      }
   })
};
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
let secst = start.substring(6, 8);

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
const checkquiz = async () => {
   try{
   let allquiz = await quiz.find();
   allquiz.forEach((element) => {
      let start = element.start;
      let end=element.end;
     let start1 = start.toISOString().substring(0, 10);
     
     let date1 = new Date().toLocaleString();
     date1 = calculate(date1);
     
     let time1=gettime(start.toISOString().substring(11,19),end);
     let dtchg=time1.dtchg;
    if(dtchg){
      start1=changedate(start1)
     }
     time1=time1.end
   //   console.log(time1);
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
      if(element.quizname=="Motion")
      if (start1 == date1&&time1 == time2) {
         id=JSON.stringify(element._id)
         setquizmarks(id, element.class);
         }
   })
  }
  catch(e){
     console.log(e);
  }
}

setInterval(() => {
   checkquiz();

}, 1000)


