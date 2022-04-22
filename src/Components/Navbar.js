import React, { useContext } from 'react'
import { Link ,useLocation,useHistory} from "react-router-dom";
function Navbar() {
  let history=useHistory();
  const logout=()=>{
    localStorage.removeItem('token');
    history.push('/')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>

          </ul>
        {!localStorage.getItem('token')?<form className='d-flex'>
          <Link className="btn btn-primary mx-1" to='/loginuser' role="button">LogIn User</Link>
        <Link className="btn btn-primary mx-1" to='/loginadmin' role="button">LogIn Admin</Link> 
        </form>: <button className="btn btn-primary mx-1" onClick={logout}  >Sign Out</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar