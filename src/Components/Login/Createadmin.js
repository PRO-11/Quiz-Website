import React ,{useState} from 'react'
import { useHistory } from "react-router-dom"
function Createadmin() {
  let history = useHistory();
  const [credentials, setcred] = useState({ user_id: "", password: " ", name: ""})
  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/auth/createadmin", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: credentials.user_id, password: credentials.password, name: credentials.name })
      })
      const json = await response.json();
      if (json.success) {
          
          localStorage.setItem('token', json.authtoken);
          history.push("/admin")
      }
  }
  const onchange = (e) => {
      setcred({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="user_id" className="form-label">UserId</label>
              <input type="text" name="user_id" className="form-control" onChange={onchange} id="user_id" aria-describedby="emailHelp" minLength={7} required />
          </div>
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" name="name" className="form-control" onChange={onchange} id="name" required />
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" name="password" className="form-control" onChange={onchange} id="password" minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  )
}

export default Createadmin