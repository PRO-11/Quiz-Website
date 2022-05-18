import React, { useEffect, useState,useContext } from 'react'
import { Link } from "react-router-dom"
import '../../Css/QuizCard.css'
function QuizItem(props) {
    const { quiz_id, admin, quiz, start,end,subname, quizname, classs ,totalmarks} = props.quiz;
    const gettime=props.gettime;
    const changedate=props.changedate;
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
       let dtchg=endti.dtchg;
       if(dtchg){
         startda=changedate(startda)
        }
        endti=endti.end
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
          console.log(ele.marks)
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
              {(marks!=-1)&&<div className=' col-md-8 my-2'>Marks Obtained:{marks}</div>}
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