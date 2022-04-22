import React, { useEffect,useState,useContext } from 'react'
import Table from './Table';
import QuizContext from '../../Context/QuizContext';
import {useLocation} from 'react-router-dom';
function ViewResult() {
  const location = useLocation()
  const {_id,classs } = location.state
  const context=useContext(QuizContext);
    const {results,setresults}=context;
    useEffect(async()=>{
        const response1 = await fetch("http://localhost:5000/admin/viewresults", {
            method: 'POST',
            headers: {
                'auth-token':localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "quizid": _id, "class": classs })
        })
        const json = await response1.json();
        json.sort((a, b) => a.name.localeCompare(b.name))
        setresults(json)
    },[])
  return (
    <table className="table">
  <thead>
    <tr>
    <th scope="col">S.NO</th>
      <th scope="col">Name</th>
      <th scope="col">UserId</th>
      <th scope="col">Class</th>
      <th scope="col">Marks</th>
    </tr>
  </thead>
  <tbody>
  {results.map((res,index)=>{
     return  <tr key={res.userid}>
     <Table res={res} index={index+1}/>
    </tr>
    })} 
  </tbody>
</table>

  )
}

export default ViewResult