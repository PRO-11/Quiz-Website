import React,{useContext, useState,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import Alert from '../../Alert'
import { useHistory } from 'react-router-dom'
import '../../Css/createquiz.css'
import NavbarAdmin from './NavbarAdmin';
export default function Createquiz1(props) {
  const location=useLocation();
  const name=location.state.name;
    const [clsub,setclsub]=useState({"class":"1","subject":"Maths"})
    let history=useHistory()
    const onchange=(e)=>{
        setclsub({...clsub,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
      if(!localStorage.getItem('adtoken'))
      {
        history.push('../loginadmin')
      }
    },[])
    const handlesub=(e)=>{
      e.preventDefault();
      let date=new Date().getTime();
      let temp=new Date(clsub.start).getTime()
      if(temp<date){
        props.showalert("Failed","Date and time should be greater than now")
      return ;
      }
      if(!Number.isInteger(Number(clsub.end)))
      {
        props.showalert("Failed","Time should be in Integer")
        return
      }
      else{
      history.push({
         pathname: '/admin/createquiz2',
      search: '?query=abc',
      state: {clsub,name} 
    });
  }
    }
  return (
  <div className='d-flex flex-column'  style={{ "position": "absolute","top":"0","left":"0","width":"100%" ,"height":"100vh"}}>
     <div className="bgadmin"></div>
    <NavbarAdmin name={name}/>
      <Alert  alert={props.alert} page="loginusr"/>
      <div class="d-flex justify-content-center">
     <section id="createquiz">
        <div className="box my-5 ">
          <div className="form">
            <h2>QUIZ DETAILS</h2>
        <form onSubmit={handlesub}>
           <div className="inputBx">
                <label htmlFor="quizname"  >QuizName</label>
                <input type="text" className="pad0" name="quizname" placeholder='Enter Quiz Name' onChange={onchange} id="quizname" required/>
                </div>
                <div className="inputBx">
                <label htmlFor="subject" >Subject</label>
                <input type="text" className="pad0" name="subject" placeholder='Enter Subject'  onChange={onchange} id="subject" required />
                 </div>
                 <div className="inputBx">
                     <label style={{"fontSize":"1.2em"}}>Class</label>
                 <select name="class" id="class" onChange={onchange} required>
                     <option value="1" default>I</option>
                     <option value="2">II</option>
                     <option value="3">III</option>
                     <option value="4">IV</option>
                     <option value="5">V</option>
                     <option value="6">VI</option>
                     <option value="7">VII</option>
                     <option value="8">VIII</option>
                     <option value="9">IX</option>
                     <option value="10">X</option>
                     <option value="11">XI</option>
                     <option value="12">XII</option>
                 </select>
                 </div>
                 <div className="inputBx">
                <label htmlFor="start" >Start</label>
                <input  type="datetime-local" className="pad0" name="start"   required onChange={onchange} id="start" />
            </div>
                <div className="inputBx">
                <label htmlFor="End" >Time Limit In Minutes</label>
                <input  type="text" className="pad0" name="end"   required onChange={onchange} id="end"  />
            </div>
            <div className="inputBx">
            <input type="submit" value="Next"/>
            </div>
        </form>
        </div>
 
 </div>
   </section>
   </div>
        <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        </div>
   </div>
  )
}
