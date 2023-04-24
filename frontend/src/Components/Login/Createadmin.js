import React ,{useState} from 'react'
import { useHistory ,Link} from "react-router-dom"
import userimg from '../../Images/user.png'
import lockimg from '../../Images/lock .png'
import Alert from '../../Alert'
import {baseurl} from '../../BASEURL'
function Createadmin(props) {
  let history = useHistory();
  const [credentials, setcred] = useState({ user_id: "", password: " ", name: ""})
  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(`${baseurl}/auth/createadmin`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: credentials.user_id, password: credentials.password, name: credentials.name })
      })
      const json = await response.json();
      if (json.success) {    
    localStorage.setItem('adtoken', json.authtoken);
    props.showalert("Success"," Resgistered Successful")
          history.push("/admin")
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
            <input type="text" name="name" placeholder='Enter Your Name'  onChange={onchange} id="name"  required />
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

export default Createadmin