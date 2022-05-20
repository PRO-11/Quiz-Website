import React, { useEffect,useState,useContext } from 'react'
import Table from './Table';
import '../../Css/Result.css'
import {useLocation,useHistory} from 'react-router-dom';
function ViewResult() {
  const location = useLocation()
  let _id,classs 
  let history=useHistory()
    const [results,setresults]=useState([]);
    useEffect(async()=>{
      
        if(!localStorage.getItem('adtoken'))
        {
          history.push('../loginadmin')
        }
    else{
      _id=location.state._id;
      classs=location.state.classs
        const response1 = await fetch("https://vaishnavi-quiz-website.herokuapp.com/admin/viewresults", {
            method: 'POST',
            headers: {
                'auth-token':localStorage.getItem('adtoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "quizid": _id, "class": classs })
        })
        const json = await response1.json();
        json.sort((a, b) => a.name.localeCompare(b.name))
        setresults(json)
    }
    },[])
  return (
<section id="result">
      <h1>Results</h1><br/>
      <article>
           <table>
             <thead>
            <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>UserId</th>
            <th>Class</th>
            <th>Marks</th>
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
    </article>
    </section>

  )
}

export default ViewResult