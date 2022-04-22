import React,{useEffect,useState,useContext} from 'react'
import QuizContext from '../../Context/QuizContext';
import QuizItem from './QuizItem';
function User() {
  const [userquiz,setuserquiz]=useState([]);
   const [user,setuser]=useState({});
useEffect(async () => {
  
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