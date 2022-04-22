import React, { useEffect, useContext ,useState} from 'react'
import { useLocation, useHistory,Link } from 'react-router-dom'
// import QuizContext from '../../Context/QuizContext';
import Clock from './Clock'

import Startquizques from './Startquizques'
function Startquiz() {
  // const context=useContext(QuizContext);
  const location = useLocation()
  const { quiz_id, quiz, start, end } = location.state

  let time = new Date().toString();
  let s = end.substring(0, 10);
  let b = end.substring(11, 19)
  let anss = s + " " + b;
  let endd = new Date(anss)
  const history = useHistory();
  let ans = new Array();
  
  useEffect(async () => {
    let isMounted = true;
    if(isMounted){
    window.onpopstate = function (event ) {
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
      history.push('/finished')
    }
  }
  return () => {
    isMounted = false;
    };   
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
    <>
    <Clock end={endd} submit={handlesub}/>
      {quiz.map((element, index) => {
        return <div className="container my-20" key={index}>
          <Startquizques quiz={element} index={index} handleclk={handleclk} />
        </div>
      })
      }
      
      <Link className="btn btn-primary" to ="/users" onClick={handlesub} >SubmitQuiz</Link>
    </>
  )
}

export default Startquiz;