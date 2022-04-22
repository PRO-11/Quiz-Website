import React, { useEffect, useState,useContext } from 'react'
import { Link } from "react-router-dom"
function QuizItem(props) {
    const { quiz_id, admin, quiz, start,end,subname, quizname, classs } = props.quiz;
    const user=props.user
  const [diff,setdiff]=useState(0);
  const [diff1,setdiff1]=useState(0);
  const [marks,setmarks]=useState(-1);
  useEffect(async ()=>{
     if(start){
       let s = start.substring(0, 10);
       let b = start.substring(11, 19)
       let anss = s + " " + b;
       let startt = new Date(anss)
       let m = end.substring(0, 10);
       let n = end.substring(11, 19)
       let anse = m + " " + n;
       let endd = new Date(anse)
       let countDown = startt.getTime();
       let countDown2 = endd.getTime();
       const now = new Date().getTime();
       setdiff( now - countDown)//To enable quiz button
       setdiff1(countDown2 - now)
     }
     if( Object.keys(user).length !== 0){
      user.quiz.forEach((ele)=>{
        if(ele.quiz_id==quiz_id){
          setmarks(ele.marks)
        setdiff(-1)
       setdiff1(-1)
        }
        
      })
    }
  },[])

  return (
    <div className="card">
      <div className="card-body ">
        <div className="row">
          <div className="col-md-8">{quizname}</div>
          <div className="col-6 col-md-4 "> Teacher:{admin}</div>
        </div>

        <div className="row">
          <div className="col-6 col-md-4">Subject:{subname}</div>
          <div className="col-6 col-md-4">Start:{start}</div>
        </div>


        <div className="row">
          <div className="col-6 col-md-4">Class:{classs}</div>
          <div className="col-6 col-md-4">End:{end}</div>
         {(diff >= 0 && diff1 >= 0)?<Link className="col-6 col-md-4"  to={{
            pathname: "/user/startquiz",
            state: { quiz_id, quiz, start, end }
          }}>Start Quiz</Link>:<Link className="col-6 col-md-4 disabledCursor" to="#" onClick={(event) => event.preventDefault()} style={{ cursor: "default",color:"gray" }}>Start Quiz</Link>}
          {marks>=0&&<div className='col-6 col-md-4'>Marks Obtained:{marks}</div>}
           </div>
      </div>

    </div>

  )
}

export default QuizItem