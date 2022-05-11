
import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import AdQuizItem from './AdQuizItem';
import NavbarAdmin from './NavbarAdmin';
import '../../Css/adminhomepg.css'
import Alert from '../../Alert';
function gettime(start, end) {
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
  endhr = (((endhr + hrst + flag) != 24 ? (endhr + hrst + flag) : 0)).toString();
  if (Number(endhr) < 10)
    endhr = "0" + endhr;
  if (Number(endmin) < 10)
    endmin = "0" + endmin;
  return endhr + ":" + endmin + ":" + secst;
}
function check1(start, end) {
  if (start) {
    let startdate = start.substring(0, 10);
    let starttime = gettime(start, end)
    let anss = startdate + " " + starttime;
    let startt = new Date(anss)
    let date = new Date();
    if (startt < date)
      return 1;

  }
}
function check(start, end) {
  if (start) {
    let startdate = start.substring(0, 10);
    let starttime = gettime(start, end)
    let anss = startdate + " " + starttime;
    let startt = new Date(anss)
    let date = new Date();
    if (startt > date) {
      return 1;
    }

  }

}
function Admin(props) {
  let history = useHistory();
  const [adquiz, setadquiz] = useState([]);
  const [adname, setadname] = useState("null")
  useEffect(async () => {
    if (localStorage.getItem('token')) {
      const response = await fetch("http://localhost:5000/admin", {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      })
      const json = await response.json();
      setadname(json.admin.name)
      setadquiz(json.ans);
    }
    else {
      history.push('./loginadmin')
    }
  }, []);
  return (
<>
      <NavbarAdmin name={adname} />
      <Alert alert={props.alert} page="userhome" />
      <div class="bg"></div>
    
      <div className='container ' style={{ "marginTop": "60px" }}>
          <h2 style={{"color":"white"}}>Upcoming Quizes</h2>
          <div className='container'>
            <div className='row'>
              {adquiz.map((quiz) => {
                {
                  return check(quiz.start, quiz.end) && <div className="col md-4 my-2" key={quiz._id}>
                    <AdQuizItem quiz={quiz} />
                  </div>
                }
              })}
            </div>
          </div>
          <h2 style={{"color":"white"}}>Past Quizes</h2>
          <div className='container'>
            <div className='row'>
              {adquiz.map((quiz) => {
                {
                  return check1(quiz.start, quiz.end) && <div className="col md-4 my-2" key={quiz._id}>
                    <AdQuizItem quiz={quiz} />
                  </div>
                }
              })}
            </div>
          </div>
        </div>


      <div class="star-field">
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="layer"></div>
        </div>
        
      </>
      )
}

      export default Admin