import React,{useEffect,useContext, useState} from 'react'
import { useHistory} from "react-router-dom";
import AdQuizItem from './AdQuizItem';
function Admin() {
  let history=useHistory();
    const [adquiz,setadquiz]=useState([]);
useEffect(async () => {
  if(localStorage.getItem('token')){
        const response = await fetch("http://localhost:5000/admin", {
            method: 'GET',
            headers: {
                'auth-token':localStorage.getItem('token')
            }  
        })
        const json = await response.json();
        setadquiz(json);
      }
      else{
        history.push('./loginadmin')
      }
      },[]);
  return (
    <>
    <div className='container my-3'>
    <div  className='container my-3'>
        <h2>Quizes</h2>
        {adquiz.map((quiz)=>{
         return   <div className="container my-3" key={quiz._id} >
         <AdQuizItem quiz={quiz}/>
        </div>
        })} 
        </div>
      
      </div>

      </>
  )
}

export default Admin