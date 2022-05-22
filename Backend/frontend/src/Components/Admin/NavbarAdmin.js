import React, { useContext } from 'react'
import { Link ,useLocation,useHistory} from "react-router-dom";
import '../../Css/Navbar.scss'
import userimg from '../../Images/user.png'
function Navbar({name}) {
  let history=useHistory();
  const logout=()=>{
    localStorage.removeItem('adtoken');
    document.title="Quizzing"
    history.push('/')
  }
  return (
    
    <nav className="nav">
      <Link to="#"><img src={userimg} height="30em" width="30em"/>{name}</Link>
      <Link to="/admin">Home</Link>
      <Link to={{pathname:"/admin/createquiz",state:{name:name}}} >Create Quiz</Link>
      <Link to="/" onClick={logout}>Sign Out</Link>
      <div className="animation start-home"></div>
    </nav>
    )
}

export default Navbar