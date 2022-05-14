import React, { useContext } from 'react'
import { Link ,useLocation,useHistory} from "react-router-dom";
import '../../Css/Navbar.scss'
function Navbar({name}) {
  let history=useHistory();
  const logout=()=>{
    localStorage.removeItem('adtoken');
    history.push('/')
  }
  return (
    
    <nav className="nav">
      <div className="nav__title">Welcome {name}</div>
      <ul className="nav__list">
        <li className="nav__item"><Link to="/">Home</Link></li>
        <li className="nav__item"><Link to="/admin/createquiz">Create Quiz</Link></li>
        <li className="nav__item"><Link to="/" onClick={logout}>Sign Out</Link></li>
      </ul>
    </nav>
    )
}

export default Navbar