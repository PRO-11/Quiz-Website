import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import {useHistory} from "react-router-dom"
import QuizContext from '../../Context/QuizContext';
function Loginadmin() {
    const context=useContext(QuizContext);
    let history=useHistory()
const [credentials,setcred]=useState({user_id:"",password:" "})
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/auth/admin/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({user_id:credentials.user_id,password:credentials.password})
        })
        const json = await response.json();
   if(json.success)
   {
       localStorage.setItem('token',json.authtoken);
       history.push("/admin")
   }
   else{
       alert('Wrong Credentials')
   }
    }
     const onchange=(e)=>{
         setcred({...credentials,[e.target.name]:e.target.value})
     }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">UserId</label>
                <input type="text" name="user_id" className="form-control" onChange={onchange} id="user_id" aria-describedby="emailHelp" minLength={7} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" onChange={onchange} id="password" minLength={5}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link className="my-3" to="/createadmin">Create New Admin</Link>
        </>
    )
}

export default Loginadmin;