import React,{useEffect,useContext, useState} from 'react'
import { useHistory} from "react-router-dom";
import AdQuizItem from './AdQuizItem';
function Admin() {
  let history=useHistory();
    const [adquiz,setadquiz]=useState([]);
    const handleclick=()=>{
      history.push('/admin/createquiz');
    }
useEffect(async () => {
        const response = await fetch("http://localhost:5000/admin", {
            method: 'GET',
            headers: {
                'auth-token':localStorage.getItem('token')
            }  
        })
        const json = await response.json();
        setadquiz(json);
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
      <button className="btn btn-primary my-3" onClick={handleclick}>Create New Quiz</button>
      </div>

      </>
  )
}

export default Admin