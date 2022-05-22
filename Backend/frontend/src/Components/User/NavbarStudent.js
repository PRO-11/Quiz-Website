import React, { useContext } from 'react'
import { Link ,useLocation,useHistory} from "react-router-dom";
import QuizContext from '../../Context/QuizContext';
import '../../Css/NavbarStudent.scss'
import userimg from '../../Images/user.png'
function NavbarStudent({name}) {
 
  const context=useContext(QuizContext)
  const {setuser}=context
  let history=useHistory();
  const logout=()=>{
    localStorage.removeItem('token');
    document.title="Quizzing"
    history.push('/')
  }
  return (
  
    <nav className="navst">
        <Link to="#"><img src={userimg} height="30em" width="30em"/>{name}</Link>
      <Link to="/">Home</Link>
      <Link to="/" onClick={logout}>Sign Out</Link>
      <div className="animation start-home"></div>
    </nav>
  

	
  )
}

export default NavbarStudent