import React, { useEffect ,useState} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
function AdQuizItem(props) {
    let classs=props.quiz.class
    const {admin,sub_name,start,end,quizname,_id}=props.quiz;
    const [diff,setdiff]=useState(-1);
    const viewquiz=()=>{
           
    }
    useEffect(async ()=>{
      if(start){
      let s = start.substring(0, 10);
      let b = start.substring(11, 19)
      let anss = s + " " + b;
      let startt = new Date(anss)
      let countDown = startt.getTime();
      const now = new Date().getTime();
      setdiff(now-countDown);
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
  <div className="col-6 col-md-4">Subject:{sub_name}</div>
  <div className="col-6 col-md-4">Start:{start}</div>
</div>


<div className="row">
  <div className="col-6 col-md-4">Class:{classs}</div>
  <div className="col-6 col-md-4">End:{end}</div>
  <button className="col-6 col-md-4" onClick={viewquiz} >view Quiz</button>
  {diff>=0&&<Link className="col-3"to={{
            pathname: "/admin/viewresults",
            state: { _id,classs }
          }}>View Results</Link>}
</div>
    </div>
     
  </div> 

 )
}

export default AdQuizItem