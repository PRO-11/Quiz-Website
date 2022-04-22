import React, { useState ,useContext} from 'react'
import { useHistory,useLocation } from 'react-router-dom'
import QuizContext from '../../Context/QuizContext';
function Createquiz() {
    const context=useContext(QuizContext);
    let {ans}=context;
    const location = useLocation()
  const { clsub } = location.state
    let history=useHistory()
    const [newquiz,setquiz]=useState({})
    const [total,settm]=useState(0)
    const handlesubmit=(e)=>{
        e.preventDefault()
        e.target.reset()
          ans.push(newquiz)
          settm(total+Number(newquiz.Marks));
    }
   const handlecreate=async()=>
   {
       let obj={
        class:clsub.class,
        sub_name:clsub.subject,
        start:clsub.start,
        end:clsub.end,
        quizname:clsub.quizname,
        totalmarks:total,
        quiz:ans    
       }
       const response = await fetch("http://localhost:5000/admin/createquiz", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify(obj)
        })
        let json = await response.json();
        ans=[];
        history.push('/admin');
   }
    const handlechg=(e)=>{
    setquiz({...newquiz,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <form onSubmit={handlesubmit} >
  <div className="mb-3">
   <textarea rows="7" cols="100" placeholder='Enter Your Ques' onChange={handlechg} name="Ques" id="Ques"></textarea>
  </div>
  <div className='d-flex flex-column bd-highlight mb-3'>
      Option1:<input type='text' name="Option1" id="Option1" onChange={handlechg} required/>
      Option2:<input type='text' name="Option2" id="Option2" onChange={handlechg} required/>
      Option3:<input type='text' name="Option3" id="Option3" onChange={handlechg} required/>
      Option4:<input type='text' name="Option4" id="Option4" onChange={handlechg} required/>
      Correct:<input type='text' name="Correct" id="Correct" onChange={handlechg} required/>
      Marks:<input type='text' name="Marks" id="Marks" onChange={handlechg} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
<div className='d-flex flex-row-reverse'>
<button className='btn btn-primary my-3 ' onClick={handlecreate}>Create Quiz</button>
</div>
    </div>
  )
}

export default Createquiz