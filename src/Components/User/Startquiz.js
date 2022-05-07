import React, { useEffect, useContext, useState } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import QuizContext from '../../Context/QuizContext';
import Clock from './Clock'
import Startquizques from './Startquizques'
function Startquiz() {
  const context = useContext(QuizContext);
  const location = useLocation()
  const { quiz_id, quiz, start, end } = location.state
  const { ans } = context
  let time = new Date().toString();
  let s = end.substring(0, 10);
  let b = end.substring(11, 19)
  let anss = s + " " + b;
  let endd = new Date(anss)
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
          body: JSON.stringify({ "start": time, "end": end })
        })
        const json = await response.json();
        if (json == "stop") {
          history.push('/')
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