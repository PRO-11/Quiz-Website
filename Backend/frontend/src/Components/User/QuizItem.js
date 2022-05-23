import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom"
import '../../Css/QuizCard.css'
function QuizItem(props) {
  const { quiz_id, admin, quiz, start, end, subname, quizname, classs, totalmarks } = props.quiz;
  const gettime = props.gettime;
  const disab=props.disab
  const changedate = props.changedate;
  const user = props.user
  const [enablebt, setenable] = useState(0);
  const [marks, setmarks] = useState(-1);
  let startda = start.substring(0, 10);
  let starttime = start.substring(11, 19)
  useEffect(async () => {
    if (start) {
         
      let startdaa = startda + " " + starttime;
      let startdate = new Date(startdaa)
      let endti = gettime(start, end)
      let dtchg = endti.dtchg;
      if (dtchg) {
        startda = changedate(startda)
      }
      endti = endti.end
      let enda = startda + " " + endti;
      let enddate = new Date(enda)
      let countDown1 = startdate.getTime();
      let countDown2 = enddate.getTime();
      const now = new Date().getTime();
      if (countDown1 <= now && now <= countDown2)//set enable button
        setenable(1);
      else
        setenable(0);

    }
    if (Object.keys(user).length !== 0) {
      user.quiz.forEach((ele) => {
        if (ele.quiz_id == quiz_id) {
          setmarks(ele.marks)

          setenable(-1)
        }

      })
      if(disab===1)
      {
      setenable(0)
      }
    }
  }, [])

  return (
    <div className='container' >
      <div className="card" id="card">
        <div className="card-body " style={{ "fontSize": "1.3em" }}>
          <div className="container">
            <div className="d-flex justify-content-between my-3">
              <div >QuizName: {quizname}</div>
              <div > Teacher: {admin}</div>
            </div>
          </div>
          <div className="container">
            <div className="d-flex justify-content-between my-3">
              <div >Subject: {subname}</div>
              <div >Class:{classs}</div>
            </div>
          </div>

          <div className="container">
            <div className="d-flex justify-content-between my-3">
              <div >Start Date: {startda}</div>
              <div >Total Marks :{totalmarks}</div>
            </div>
          </div>
          <div className="container">
            <div className="d-flex justify-content-between my-3">
              <div >Start Time :{starttime}</div>
              <div >Time Limit: {end} Min</div>
            </div>
          </div>
          <div className="container">
            <div className="d-flex justify-content-between my-3">
              {(marks != -1) && <div >Marks Obtained:{marks}</div>}
              {(enablebt == 1) ? <Link to={{
                pathname: "/user/startquiz",
                state: { quiz_id, quiz, start, end }
              }} style={{ "border": "2px solid black", "background": "red", "color": "cornsilk", "borderRadius": "3px", "textDecoration": "none", "textAlign": "center" }}>Start Quiz</Link> :
               <Link className="disabledCursor" to="#" onClick={(event) => event.preventDefault()} style={{ "border": "2px solid black", "background": "red", "color": "grey", "borderRadius": "3px", "textDecoration": "none", "textAlign": "center" }}>Start Quiz</Link>}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default QuizItem