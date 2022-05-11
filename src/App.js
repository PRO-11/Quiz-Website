import  React, { useContext,useState } from 'react'
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
         
          <Loginuser showalert={showalert} alert={alert}/>
          </Route>
          <Route exact path="/loginadmin" >
            
          <Loginadmin showalert={showalert}  alert={alert} />
          </Route>
          <Route exact path="/createuser">
            
          <Createuser showalert={showalert}  alert={alert}/>
          </Route>
          <Route exact path="/createadmin">
           
          <Createadmin showalert={showalert}  alert={alert}/>
          </Route>
          <Route exact path="/user">
          <User  alert={alert}/>
          </Route>
          <Route exact path="/admin">
          <Admin alert={alert}/>
          </Route>
          <Route exact path="/admin/createquiz">
           <Createquiz1  showalert={showalert} alert={alert}/>
          </Route>
          <Route exact path="/admin/viewresults">
           <ViewResult />
          </Route>
          <Route exact path="/admin/createquiz2">
           <Createquiz showalert={showalert} alert={alert}/>
          </Route>
          <Route exact path="/user/startquiz">
           <Startquiz showalert={showalert} />
          </Route>
        </Switch> 
        </div>
        </BrowserRouter> 
        </QuizState>
    </div>
  )
}

export default App
