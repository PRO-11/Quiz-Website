const connectToMongo = require('./db')
connectToMongo();


const express = require("express")
const User = require('./Models/User');
const quiz = require('./Models/quiz');
const app = express();
var cors = require('cors');
const { update } = require('./Models/User');
app.use(cors())
app.use(express.json())
app.use('/auth', require('./Routes/Auth/auth'));
app.use('/admin', require('./Routes/Admin/admin'));
app.use('/user', require('./Routes/User/user'))
app.listen(5000, () => {
   console.log(`http://localhost:5000`);
})
const updatee=async(id,quizid)=>{
   await User.updateOne({ _id:id }, { $push: { quiz: { "quiz_id": quizid, "marks": 0 } } });
}
const setquizmarks = async(id, classs) => {
   
   let user = await User.find({ class: classs });
   user.forEach((element) => {
      let flag = 0;
      element.quiz.forEach((element1) => {
         
         if (JSON.stringify(element1.quiz_id )=== id) {
            flag = 1;
         }
      })
      if (!flag) {
          updatee(element.id,id);
      }
   })
};
const calculate = (date) => {
   let str = "";
   for (let i = 0; i < date.length; i++) {
      if (date[i] == ',')
         break;
      str += date[i];
   }
   // console.log(str)
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
const abc = async () => {
   let allquiz = await quiz.find();
   allquiz.forEach((element) => {
      let end = element.end;
      end1 = end.toISOString().substring(0, 10);
      let date1 = new Date().toLocaleString();
      date1 = calculate(date1);
      let time1 = end.toISOString().substring(11, 19);
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
      if (end1 === date1 && time1 === time2) {
         id=JSON.stringify(element._id)
         setquizmarks(id, element.class);
      }

   })
}

setInterval(() => {
   abc();
}, 1000)


