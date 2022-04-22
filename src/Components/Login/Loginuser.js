import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import {useHistory} from "react-router-dom"
import userimg from '../../Images/user.png'
import lockimg from '../../Images/lock .png'
import '../../Css/Login.css'
function Loginuser() {
    let history=useHistory()
const [credentials,setcred]=useState({user_id:"",password:" "})
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/auth/user/login", {
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
       history.push("/user")
   }
   else{
       alert('Wrong Credentials')
   }
    }
    
     const onchange=(e)=>{
         setcred({...credentials,[e.target.name]:e.target.value})
      
}
     
    return (
      <section>
        <div className="box">
          <div className="form">
            <h2>Login</h2>
        <form onSubmit={handleSubmit}>
           <div className="inputBx">
                <label htmlFor="exampleInputEmail1"  >UserId</label>
                <input type="text" name="user_id" placeholder='UserID' onChange={onchange} id="user_id" aria-describedby="emailHelp" minLength={7} />
               <img src={userimg} />
                </div>

                <div className="inputBx">
                <label htmlFor="exampleInputPassword1" >Password</label>
                <input type="password" placeholder="Password" name="password"  onChange={onchange} id="password" minLength={5}/>
                <img src={lockimg}/>
            </div>
            <div className="inputBx">
            <input type="submit" value="Login"/>
            </div>
        </form>
        <p>Need an <Link to="/createuser"> Account</Link></p>
        </div>
        </div>
 </section>
    )
}

export default Loginuser;