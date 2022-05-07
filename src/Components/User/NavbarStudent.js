import React, { useContext } from 'react'
import { Link ,useLocation,useHistory} from "react-router-dom";
import QuizContext from '../../Context/QuizContext';
import '../../Css/Navbar.scss'
function NavbarStudent() {
  const context=useContext(QuizContext)
  const {setuser}=context
  let history=useHistory();
  const logout=()=>{
    localStorage.removeItem('token');
    setuser('false')
    history.push('/')
  }
  return (
    <div className="site">
	
    <nav className="nav">
      <div className="nav__title">Pro Quiz</div>
      <ul className="nav__list">
        <li className="nav__item"><Link to="/">Home</Link></li>
        <li className="nav__item"><Link to="/" onClick={logout}>Sign Out</Link></li>
      </ul>
    </nav>
  </div>
  )
}

export default NavbarStudent