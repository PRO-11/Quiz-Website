import React, { useEffect ,useState} from 'react'
import '../../Css/QuizCard.css'
import { Link } from 'react-router-dom';
import '../../Css/enablebt.css'
function AdQuizItem(props) {
    let classs=props.quiz.class
    const {admin,sub_name,start,end,quizname,_id,totalmarks}=props.quiz;
    let startda = start.substring(0, 10);
    let starttime = start.substring(11, 19)
    const [enablebt,setenable]=useState(0);
    const [enableview,setenableview]=useState(0);
    function changedate(startdate)
{
  let date=Number(startdate.substring(8,10));
  let mon=Number(startdate.substring(5,7));
  let year=Number(startdate.substring(0,4));
  date+=1;
 if(date>30){
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
    useEffect(async ()=>{
      if(start){
        let startdaa = startda + " " + starttime;
        let startdate = new Date(startdaa)
        let endti=gettime(start,end)
        let dtchg=endti.dtchg;
        if(dtchg){
          startdate=changedate(startdate)
         }
         endti=endti.end
        let enda = startda + " " + endti;
        let enddate= new Date(enda)
        let countDown2 = enddate.getTime();
        const now = new Date().getTime();
        if(now>=countDown2)
        setenableview(1);
    }
    },[])
  
  return (
    <div style={{width:'25em'}}>
<div className="card" id="card">
  <div className="card-body ">
<div className="row">
  <div className="col-md-6">Quizname: {quizname}</div>
  <div className="col-md-6 my-2">Class:{classs}</div>
</div>

<div className="row">
  <div className="col-md-6 my-2">Subject:{ sub_name}</div>
       <div className="col-md-6 my-2">Time Limit: {end} Minutes</div>
</div>

    <div className="row">   
       <div className="col-md-6 my-2">Start Date: {startda}</div>
<div className="col-md-6 my-2">Start Time :{starttime}</div>
        </div>
<div className="row">
<div className="col-md-6 my-2">Total Marks: {totalmarks}</div>
  {(enableview==1)&&<Link className="col-md-4 my-2" id="resultbt" to={{
    pathname: "/admin/viewresults",
    state: { _id,classs }
  }}>View Results</Link>}
</div>
    </div>
     
  </div> 
  </div>

 )
}

export default AdQuizItem