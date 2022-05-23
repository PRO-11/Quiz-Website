import React, { useState } from 'react'
import { useHistory ,Link} from "react-router-dom"
import userimg from '../../Images/user.png'
import Alert from '../../Alert'
import lockimg from '../../Images/lock .png'
function Createuser(props) {
    let history = useHistory();
    const [credentials, setcred] = useState({ user_id: "", password: " ", name: "", class: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://pro-quizz.herokuapp.com/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: credentials.user_id, password: credentials.password, name: credentials.name, class: credentials.class })
        })
        const json = await response.json();
        if (json.success) {
            
            localStorage.setItem('token', json.authtoken);
            props.showalert("Success","Registered is Successful")
            history.push("/user")
        }
        else{
            props.showalert("Failed","Incorrect Credentials")
        }
    }
    const onchange = (e) => {
        setcred({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <section   id="login">
             <Alert  alert={props.alert}/>
        <div className="box">
          <div className="form">
            <h2>REGISTER</h2>
        <form onSubmit={handleSubmit}>
           <div className="inputBx">
                <label htmlFor="user_id"  >UserId</label>
                <input type="text" name="user_id" placeholder='UserId' onChange={onchange} id="user_id" aria-describedby="emailHelp" minLength={7} required/>
               <img src={userimg} />
                </div>
                <div className="inputBx">
                <label htmlFor="name" >Name</label>
                <input type="text" name="name" placeholder='Enter Your Name'  onChange={onchange} id="name" required />
                 </div>
                 <div className="inputBx">
                     <label style={{"fontSize":"18px"}}>Class</label>
                 <select name="class" id="class" onChange={onchange} required>
                     <option value="1" default>I</option>
                     <option value="2">II</option>
                     <option value="3">III</option>
                     <option value="4">IV</option>
                     <option value="5">V</option>
                     <option value="6">VI</option>
                     <option value="7">VII</option>
                     <option value="8">VIII</option>
                     <option value="9">IX</option>
                     <option value="10">X</option>
                     <option value="11">XI</option>
                     <option value="12">XII</option>
                 </select>
                 </div>
                <div className="inputBx">
                <label htmlFor="exampleInputPassword1" >Password</label>
                <input type="password" placeholder="Password" name="password" required onChange={onchange} id="password" minLength={5} />
                <img src={lockimg}/>
            </div>
            <div className="inputBx">
            <input type="submit" value="Submit"/>
            </div>
        </form>
        </div>
        </div>
 </section>
    )
}

export default Createuser