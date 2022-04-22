import './App.css';
import  React from 'react'
import Navbar from './Components/Navbar';
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
import {
  BrowserRouter,
 Switch,
  Route
} from "react-router-dom";
import QuizState from './Context/QuizState';
import Home from './Components/Home';
const App = () => {
  return (
    <div>
      <QuizState>
      <BrowserRouter> 
    <Navbar/>
    
     <div className='container'>
       <Switch> 
       <Route exact path="/">
          <Home/>
          </Route>
          <Route exact path="/loginuser">
          <Loginuser/>
          </Route>
          <Route exact path="/loginadmin">
          <Loginadmin/>
          </Route>
          <Route exact path="/createuser">
          <Createuser/>
          </Route>
          <Route exact path="/createadmin">
          <Createadmin/>
          </Route>
          <Route exact path="/user">
          <User/>
          </Route>
          <Route exact path="/admin">
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
