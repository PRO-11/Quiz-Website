import React,{useEffect,useState,useContext} from 'react'
import QuizItem from './QuizItem';
import {useHistory} from "react-router-dom"
function User() {
  let history=useHistory()
  const [userquiz,setuserquiz]=useState([]);
   const [user,setuser]=useState({});
useEffect(async () => {
 if(localStorage.getItem('token')){
  const response1 = await fetch("http://localhost:5000/user/getuser", {
      method: 'GET',
      headers: {
          'auth-token':localStorage.getItem('token')
      }  
  })
  const json1 = await response1.json();
  setuser(json1);
  const response = await fetch("http://localhost:5000/user", {
      method: 'GET',
      headers: {
          'auth-token':localStorage.getItem('token')
      }  
  })
  const json = await response.json();
   setuserquiz(json.ans); 
}
else{
history.push('/loginuser')
}

return()=>{
  
}
      },[]);
  return (
  
    <div  className='container my-3'>
    <h2>Quizes</h2>
    {userquiz.map((quiz)=>{
     return   <div className="container my-3"  key={quiz.quiz_id}>
     <QuizItem  quiz={quiz} user={user}/>
    </div>
    })} 
    </div>
    
  )
}

export default User