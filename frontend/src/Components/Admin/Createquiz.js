import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import '../../Css/createquiz1.css'
import QuizContext from '../../Context/QuizContext';
import Alert from '../../Alert';
import Navbar from './NavbarAdmin';
function Createquiz(props) {
  const context = useContext(QuizContext);
  let { ans } = context;
  const location = useLocation()
  const { clsub ,name} = location.state
  let history = useHistory()
  const [newquiz, setquiz] = useState({"Correct":"1","Marks":"1"})
  const [total, settm] = useState(0)
  const handlesubmit = (e) => {
    e.preventDefault()
    e.target.reset()
    ans.push(newquiz)
    settm(total + Number(newquiz.Marks));
   
  }
  useEffect(()=>{
    if(!localStorage.getItem('adtoken'))
    {
      history.push('../loginadmin')
    }
  },[])
  const handlecreate = async () => {
    if(ans.length===0)
    {
      props.showalert("Error","Write atleast one Ques")
    return
    }
    if(!clsub.start.includes(":00.000Z"))
    clsub.start= clsub.start+":00.000Z"
    let obj = {
      class: clsub.class,
      sub_name: clsub.subject,
      start: clsub.start,
      end: clsub.end,
      quizname: clsub.quizname,
      totalmarks: total,
      quiz: ans
    }
    
    const response = await fetch("https://pro-quizz.herokuapp.com/adminbackend/createquiz", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('adtoken')
      },
      body: JSON.stringify(obj)
    })
    let json = await response.json();
    ans = [];
     props.showalert("Success","Created Quiz Successfully")
    history.push('/admin');
  }
  const handlechg = (e) => {
    setquiz({ ...newquiz, [e.target.name]: e.target.value })
  }
  return (
    <div  className="d-flex flex-column bd-highlight mb-3" style={{ "position": "absolute","top":"0","left":"0","width":"100%" }} >
      <Navbar name={name}/>
      <Alert alert={props.alert} page="userhome"/>
    <div id="admincreate" className='"d-flex justify-content-center"'>
      <div className="bgadmin"></div>
      <div className="d-flex justify-content-center row my-1">
        <div className="container">
          <div className="border">
            <div className="question  p-3 border-bottom" style={{"background":"burlywood"}}>
              <div className="d-flex flex-row justify-content-between align-items-center mcq">
                <h4>MCQ Quiz</h4>
              </div>
            </div>
             <form  onSubmit={handlesubmit} className="question  p-3 border-bottom" style={{"background":"burlywood"}}>
              <div className="d-flex flex-row align-items-center question-title">
                <h3 className="text-danger">Q.</h3>
                <textarea className="form-control"  rows="3"  placeholder='Enter Your Ques' onChange={handlechg} name="Ques" id="Ques" required></textarea>
              </div>
              <div className="ans ml-2 my-3">
                <label className="radio"> Option 1: <input type='text' name="Option1" id="Option1" onChange={handlechg} required /></label>
              </div>
              <div className="ans ml-2 my-3">
                <label className="radio">Option 2: <input type='text' name="Option2" id="Option2" onChange={handlechg} required />
                </label>
              </div>
              <div className="ans ml-2 my-3">
                <label className="radio">Option 3: <input type='text' name="Option3" id="Option3" onChange={handlechg} required />
                </label>
              </div>
              <div className="ans ml-2  my-3">
                <label className="radio">Option 4: <input type='text' name="Option4" id="Option4" onChange={handlechg} required />
                </label>
              </div>
              <div className="ans ml-2  my-3">
                <label className="radio">Correct Option:
                  <select name="Correct" onChange={handlechg} className='mx-2' style={{background:"burlywood"}} required>
                    <option value="1" defaultChecked>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </label>
              </div>
              <div className="ans ml-2  my-3">
                <label className="radio">Marks:
                  <select name="Marks" onChange={handlechg} className='mx-2' style={{background:"burlywood"}} required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </label>
              </div>
            <div className='d-flex justify-content-end' style={{"background":"burlywood"}}>
            <button type="submit" className="w-25 bg-info" >Next</button>
            </div>
            </form> 
          </div>
        </div>
      <button className='btn btn-warning my-3 w-50 ' onClick={handlecreate}>Create Quiz</button>
      </div>
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        </div>
        
    </div>
    </div>
  )
}

export default Createquiz