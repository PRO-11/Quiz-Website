import React,{useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import QuizContext from '../../Context/QuizContext';
export default function Createquiz1() {
    
    const [clsub,setclsub]=useState({"class":"1","subject":"Maths"})
    let history=useHistory()
    const handlechg=(e)=>{
        setclsub({...clsub,[e.target.name]:e.target.value})
    }
    const handlesub=(e)=>{
      e.preventDefault();
      history.push({
         pathname: '/admin/createquiz2',
      search: '?query=abc',
      state: {clsub} 
    });
      console.log(clsub)
    }
  return (
     <form onSubmit={handlesub}>
       <label htmlFor="class" required>Select class:</label>
      <select name="class" id="class" onChange={handlechg} required>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
</select>
       <label htmlFor="subject">Select Subject:</label>
      <select name="subject" id="subject" onChange={handlechg} required>
  <option value="Maths">Maths</option>
  <option value="Science">Science</option>
  <option value="English">English</option>
  <option value="Social Science">Social Science</option>
</select>
Quizname:<input type="text" name="quizname" onChange={handlechg} required></input>
Start:<input type="datetime-local" name='start' onChange={handlechg} required></input>
End:<input type="datetime-local" name="end"  onChange={handlechg} required ></input>
<button type='submit'>Next</button>
{/* <Link  to={{
    pathname: "/admin/createquiz2",
    state: { clsub }}}>Next</Link> */}
</form>

   
  )
}
