import React, { useEffect ,useState} from 'react'
import '../../Css/QuizCard.css'
import { Link } from 'react-router-dom';
import '../../Css/enablebt.css'
function AdQuizItem(props) {
    let classs=props.quiz.class
    const {admin,sub_name,start,end,quizname,_id,totalmarks}=props.quiz;
    const gettime=props.gettime;
    const adname=props.name;
    const changedate=props.changedate
    let startda = start.substring(0, 10);
    let starttime = start.substring(11, 19)
    const [enableview,setenableview]=useState(0);
    useEffect(async ()=>{
      if(start){
        let endti=gettime(start,end)
        let dtchg=endti.dtchg;
        if(dtchg){
          startda=changedate(startda)
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
</div>
<div className="row">
<Link className="col-md-4 my-2" id="resultbt" to={{pathname:"/admin/viewquiz",state:{id:_id,name:adname}}} >View Quiz</Link>
  {(enableview==1)&&<Link className="col-md-4 my-2 mx-5" id="resultbt" to={{
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