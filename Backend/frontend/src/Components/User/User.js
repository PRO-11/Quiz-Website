import React,{useEffect,useState,useContext} from 'react'
import QuizItem from './QuizItem';
import NavbarStudent from './NavbarStudent'
import Alert from '../../Alert'
import '../../Css/userhomepg.scss'
import {useHistory} from "react-router-dom"
function User(props) {
  let history=useHistory()
  const [userquiz,setuserquiz]=useState([]);
   const [user,setuser]=useState({});
   function gettime(start,end)
   {
    let endhr = Math.floor((end / 60));
    let endmin = end - endhr * 60;
    let hrst = Number(start.substring(11, 13));
    let minst = Number(start.substring(14, 16));
    let secst = start.substring(17, 19);
    endmin = (endmin + minst);
    let flag = 0;
    if (endmin > 59) {
      flag = 1;
      endmin -= 60;
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
   const month=[31,28,31,30,31,30,31,31,30,31,30,31];

   
   function changedate(startdate)
{
  let date=Number(startdate.substring(8,10));
  let mon=Number(startdate.substring(5,7));
  let year=Number(startdate.substring(0,4));
  date+=1;
 if(date>month[mon-1]){
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
   function check1(start,end,quiz,id)
   {
    if(start){
        let startdate = start.substring(0, 10);
        let starttime=gettime(start,end)
        let dtchg=starttime.dtchg;
    if(dtchg){
      startdate=changedate(startdate)
     }
     starttime=starttime.end
  let anss = startdate + " " + starttime;
        let startt = new Date(anss)
        let date=new Date();
        let flag=1;
        quiz.forEach((element)=>{
          if(element.quiz_id===id){
             flag=0
           return 1;
           }
        })
        if(startt<date||flag==0)
        return 1;
        
      }
   }
   function check(start,end,quiz,id)
   {
    if(start){
      let startdate = start.substring(0, 10);
      let starttime=gettime(start,end)
      let dtchg=starttime.dtchg;
    if(dtchg){
      startdate=changedate(startdate)
     }
     starttime=starttime.end
let anss = startdate + " " + starttime;
      let startt = new Date(anss)
      let date=new Date();
      let flag=1;
      quiz.forEach((element)=>{
        if(element.quiz_id===id){
           flag=0
         return 0;
         }
      })
      if(startt>date&&flag){
      return 1;
       }
      
    }
      
   }
useEffect(async () => {

 if(localStorage.getItem('token')){
 
  const response1 = await fetch("https://vaishnavi-quiz-website.herokuapp.com/userbackend", {
      method: 'GET',
      headers: {
          'auth-token':localStorage.getItem('token')
      }  
  })
  
  const json = await response1.json();
  setuser(json.userinfo);
   setuserquiz(json.ans); 
   document.title="Quizzing-Student"
}
else{
history.push('/loginuser')
}

return()=>{
  
}
      },[]);
  return (
    <div  className="d-flex flex-column bd-highlight mb-3" style={{ "position": "absolute","top":"0","left":"0","width":"100%" }} >
 
    {/* <div className="d-flex flex-column" style={{"flexWrap":"wrap"}}> */}
  <NavbarStudent name={user.name}/>
  <Alert alert={props.alert} page="userhome"/>
  <div className='container ' style={{ "marginTop": "60px","marginLeft":"30px" }}>
          <h2 style={{"color":"white"}}>Upcoming Quizes</h2>
          <div className='container'>
            <div className='row'>
    {userquiz.map((quiz)=>{
     {return  check(quiz.start,quiz.end,user.quiz,quiz.quiz_id)&& <div className="col md-4 my-2"  key={quiz.quiz_id}>
     <QuizItem  quiz={quiz} user={user} changedate={changedate} gettime={gettime}/>
    </div>}
    })} 
    </div>
          </div>
    <h2 style={{"color":"white"}} className="my-5">Past Quizes</h2>
    <div className='container'>
            <div className='row'>
    {userquiz.map((quiz)=>{
     {return  check1(quiz.start,quiz.end,user.quiz,quiz.quiz_id)&& <div className="col md-4 my-2"  key={quiz.quiz_id}>
     <QuizItem  quiz={quiz} user={user}  changedate={changedate} gettime={gettime}/>
    </div>}
    })} 
    </div>
    </div>
  {/* </div> */}
  <section id="userhmpg">
  <div className="stars">
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
  <div className="star"></div>
</div>
    </section>
    </div>

 
  </div>
  )
}

export default User