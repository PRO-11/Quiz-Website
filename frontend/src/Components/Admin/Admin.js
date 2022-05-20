
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
function check1(start, end) {
  if (start) {
    let startdate = start.substring(0, 10);
    let starttime = gettime(start, end)
    let dtchg=starttime.dtchg;
    if(dtchg){
      startdate=changedate(startdate)
     }
     starttime=starttime.end
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
    let dtchg=starttime.dtchg;
    if(dtchg){
     startdate=changedate(startdate)
    }

    starttime=starttime.end
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
    if (localStorage.getItem('adtoken')) {
      const response = await fetch("https://vaishnavi-quiz-website.herokuapp.com/admin", {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('adtoken')
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
      <div className="bg"></div>
    
      <div className='container ' style={{ "marginTop": "60px" }}>
          <h2 style={{"color":"white"}}>Upcoming Quizes</h2>
          <div className='container'>
            <div className='row'>
              {adquiz.map((quiz) => {
                {
                  return check(quiz.start, quiz.end) && <div className="col md-4 my-2" key={quiz._id}>
                    <AdQuizItem quiz={quiz}  changedate={changedate} gettime={gettime}  name={adname}/>
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
                    <AdQuizItem quiz={quiz} changedate={changedate} gettime={gettime}  name={adname}/>
                  </div>
                }
              })}
            </div>
          </div>
        </div>


      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        </div>
        
      </>
      )
}

      export default Admin