import React,{useContext, useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import '../../Css/createquiz.css'
export default function Createquiz1() {
  
    const [clsub,setclsub]=useState({"class":"1","subject":"Maths"})
    let history=useHistory()
    const onchange=(e)=>{
        setclsub({...clsub,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
      if(!localStorage.getItem('token'))
      {
        history.push('../loginadmin')
      }
    },[])
    const handlesub=(e)=>{
      e.preventDefault();
      if(!Number.isInteger(Number(clsub.end)))
      {
        alert('Time Limit Should Be In Integer')
        return
      }
      else{
      history.push({
         pathname: '/admin/createquiz2',
      search: '?query=abc',
      state: {clsub} 
    });
  }
    }
  return (
//      <form onSubmit={handlesub} class>
//        <label htmlFor="class" required>Select class:</label>
//       <select name="class" id="class" onChange={handlechg} required>
//   <option value="1">1</option>
//   <option value="2">2</option>
//   <option value="3">3</option>
//   <option value="4">4</option>
//   <option value="5">5</option>
//   <option value="6">6</option>
//   <option value="7">7</option>
//   <option value="8">8</option>
// </select>
//        <label htmlFor="subject">Select Subject:</label>
//       <select name="subject" id="subject" onChange={handlechg} required>
//   <option value="Maths">Maths</option>
//   <option value="Science">Science</option>
//   <option value="English">English</option>
//   <option value="Social Science">Social Science</option>
// </select>
// Quizname:<input type="text" name="quizname" onChange={handlechg} required></input>
// Start:<input type="datetime-local" name='start' onChange={handlechg} required></input>
// End:<input type="datetime-local" name="end"  onChange={handlechg} required ></input>
// <button type='submit'>Next</button>
// {/* <Link  to={{
//     pathname: "/admin/createquiz2",
//     state: { clsub }}}>Next</Link> */}
// </form>
   <section   id="createquiz">
        <div className="box">
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
                     <label style={{"fontSize":"18px"}}>Class</label>
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
   
  )
}
