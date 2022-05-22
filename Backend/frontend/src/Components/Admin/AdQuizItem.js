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
    <div className='container'>
<div className="card"  id="card">
  <div className="card-body " style={{"fontSize":"1.3em"}}>
    <div className="container">
    <div className="d-flex justify-content-between my-3">
  <div >Quizname: {quizname}</div>
  <div >Class:{classs}</div>
</div>
</div>
<div className="container">
<div className="d-flex justify-content-between my-3">
  <div >Subject:{ sub_name}</div>
       <div >Time Limit: {end} Minutes</div>
</div>
</div>
<div className="container">
<div className="d-flex justify-content-between my-3">
       <div >Start Date: {startda}</div>
<div >Total Marks: {totalmarks}</div>
        </div>
        </div>
<div className="container">
<div className="d-flex justify-content-between my-3">
<div >Start Time :{starttime}</div>
</div>
</div>
<div className="container">
<div className="d-flex justify-content-between my-3">
<Link id="resultbt" to={{pathname:"/admin/viewquiz",state:{id:_id,name:adname}}} >View Quiz</Link>
  {(enableview==1)&&<Link  id="resultbt" to={{
    pathname: "/admin/viewresults",
    state: { _id,classs }
  }}>View Results</Link>}
  </div>
  </div>
    </div>
  </div> 
  </div>

 )
}

export default AdQuizItem