import React, { useEffect, useState,useContext } from 'react'
import { Link } from "react-router-dom"
import '../../Css/QuizCard.css'
function gettime(start,end)
{
  let endhr=Math.floor((end/60));
  let endmin=end-endhr*60;
  let hrst= Number(start.substring(11, 13));
  let minst=Number(start.substring(14, 16));
  let secst = start.substring(17, 19);
  endmin=(endmin+minst);
  let flag=0;
  if(endmin>59)
  {
    flag=1;
    endmin-=60;
  }
   endhr=(((endhr+hrst+flag)!=24?(endhr+hrst+flag):0)).toString();
  if(Number(endhr)<10)
   endhr="0"+endhr;
  if(Number(endmin)<10)
   endmin="0"+endmin;
  return endhr+":"+endmin+":"+secst;
}

function QuizItem(props) {
    const { quiz_id, admin, quiz, start,end,subname, quizname, classs ,totalmarks} = props.quiz;
    const user=props.user
  const [enablebt,setenable]=useState(0);
  const [marks,setmarks]=useState(-1);
  let startda = start.substring(0, 10);
  let starttime = start.substring(11, 19)
  useEffect(async ()=>{
     if(start){
        let startdaa = startda + " " + starttime;
       let startdate = new Date(startdaa)
       let endti=gettime(start,end)
       let enda = startda + " " + endti;
       let enddate= new Date(enda)
       let countDown1= startdate.getTime();
       let countDown2 = enddate.getTime();
       const now = new Date().getTime();
       
      if(countDown1<=now&&now<=countDown2)//set enable button
        setenable(1);
      else
      setenable(0);
  
     }
     if( Object.keys(user).length !== 0){
       user.quiz.forEach((ele)=>{
       
        if(ele.quiz_id==quiz_id){
          setmarks(ele.marks)
        setenable(-1)
        }
        
      })
    }
  },[])

  return (
    <div style={{width:'25em'}}>
    <div className="card" id="card">
      <div className="card-body ">
        <div className="row">
          <div className="col-md-6">QuizName: {quizname}</div>
          <div className=" col-md-6 "> Teacher: {admin}</div>
        </div>

        <div className="row">
          <div className=" col-md-6 my-2">Subject: {subname}</div>
          <div className=" col-md-6 my-2">Class:{classs}</div>
        </div>


        <div className="row">
       
          <div className="col-6 col-md-6 my-2">Start Date: {startda}</div>
          <div className="col-6 col-md-6 my-2">Time Limit: {end} Minutes</div>
           </div>
           <div className="row">
           <div className="col-6 col-md-6 my-2">Start Time :{starttime}</div>
           <div className="col-6 col-md-6 my-2">Total Marks :{totalmarks}</div>
           </div>
            <div className="row">
              {(marks>=0)&&<div className=' col-md-8 my-2'>Marks Obtained:{marks}</div>}
           {(enablebt==1)?<Link className="col-md-4 my-2 "  to={{
            pathname: "/user/startquiz",
            state: { quiz_id, quiz, start, end }
          }}>Start Quiz</Link>:<Link className=" col-md-4 my-2 disabledCursor" to="#" onClick={(event) => event.preventDefault()} style={{ cursor: "default",color:"gray" }}>Start Quiz</Link>}
           </div>
      </div>

</div>
    </div>

  )
}

export default QuizItem