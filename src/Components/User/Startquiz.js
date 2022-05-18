import React, { useEffect, useContext, useState } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import QuizContext from '../../Context/QuizContext';
import Clock from './Clock'
import Startquizques from './Startquizques'
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
function Startquiz(props) {
  const context = useContext(QuizContext);
  const location = useLocation()
  const { quiz_id, quiz, start, end } = location.state
  const { ans } = context
  let startdate=start.substring(0,10)
  let starttime=gettime(start,end)
  let dtchg=starttime.dtchg;
  if(dtchg){
    startdate=changedate(startdate)
   }
   starttime=starttime.end;
  let anss = startdate + " " + starttime;
  let now=Date.now()
  let endd = new Date(anss)
  let endd2= Date.parse(endd)
  endd2=endd2-now;
  const history = useHistory();

  useEffect(async () => {
    if (localStorage.getItem('token')) {
      let isMounted = true;
      if (isMounted) {
        window.onpopstate = function (event) {
          history.go(1)
        };
        const response = await fetch("http://localhost:5000/user/startTimer", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"end": endd2 })
        })
        const json = await response.json();
        if (json == "stop") {
          props.showalert("Success","Quiz submitted Successfully");
          history.push('/user')
        }
      }
    }
    else {

      history.push('/loginuser')
    }

  }, []);
  const handlesub = async () => {
    const response = await fetch("http://localhost:5000/user/submitquiz", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ "id": quiz_id, "quiz": ans })
    })
    props.showalert("Success","Quiz submitted Successfully");
    history.push('/user')

  }
  const handleclk = (e, index) => {
    ans[index] = e.target.value
  }
  return (
    <section style={{"position":"absolute","top":"0","left":"0px", "width":"100%","minHeight": "100vh", background:"linear-gradient(#e66465, #9198e5)"}} >
      <Clock end={endd} submit={handlesub} />
      <br/>
      <br/>
      <br/>

      {quiz.map((element, index) => {
        return <div className="container my-2" key={index}>
          <Startquizques quiz={element} index={index} handleclk={handleclk} />
        </div>
      })
      }

      <Link className="btn btn-primary" to="/users" onClick={handlesub} style={{
        "position": "fixed",
        "top": "0px",
        "right": "25px"
      }} >SubmitQuiz</Link>
    </section>
  )
}

export default Startquiz;