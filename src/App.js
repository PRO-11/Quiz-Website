import  React, { useContext,useState } from 'react'
import Navbar from './Components/Admin/Navbar';
import NavbarStudent from './Components/User/NavbarStudent';
import Loginuser from './Components/Login/Loginuser'
import Loginadmin from './Components/Login/Loginadmin'
import Createuser from './Components/Login/Createuser';
import Createadmin from './Components/Login/Createadmin';
import Admin from './Components/Admin/Admin';
import User from './Components/User/User';
import Createquiz1 from './Components/Admin/Createquiz1'
import Createquiz from './Components/Admin/Createquiz'
import Startquiz from './Components/User/Startquiz'
import ViewResult from './Components/Admin/ViewResult'
import QuizContext from './Context/QuizContext';
import QuizState from './Context/QuizState';
import Home from './Components/Home';
import Alert from './Alert'
import {
  BrowserRouter,
 Switch,
  Route
} from "react-router-dom";
const App = () => {
  const [alert,setalert]=useState(null);
 const showalert=(type,msg)=>{
     setalert({
       type:type,
       msg:msg
     })
     setTimeout(() => {
       setalert(null)
     }, 3000);
  }
  const context=useContext(QuizContext);
  return (
    <div>
      <QuizState>
      <BrowserRouter> 
     <div className='container'>
       <Switch> 
       <Route exact path="/">
          <Home/>
          </Route>
          <Route exact path="/loginuser" >
          <Loginuser showalert={showalert}/>
          </Route>
          <Route exact path="/loginadmin" >
          <Loginadmin showalert={showalert} />
          </Route>
          <Route exact path="/createuser">
          <Createuser showalert={showalert}/>
          </Route>
          <Route exact path="/createadmin">
          <Createadmin showalert={showalert}/>
          </Route>
          <Route exact path="/user">
            <NavbarStudent/>
            <Alert alert={alert}/>
          <User/>
          </Route>
          <Route exact path="/admin">
            <Navbar/>
            <Alert  alert={alert}/>
          <Admin/>
          </Route>
          <Route exact path="/admin/createquiz">
           <Createquiz1/>
          </Route>
          <Route exact path="/admin/viewresults">
           <ViewResult/>
          </Route>
          <Route exact path="/admin/createquiz2">
           <Createquiz/>
          </Route>
          <Route exact path="/user/startquiz">
           <Startquiz/>
          </Route>
        </Switch> 
        </div>
        </BrowserRouter> 
        </QuizState>
    </div>
  )
}

export default App
