import { queries } from '@testing-library/react'
import React, { useRef, useState } from 'react'
import '../../Css/showquiz.css'
function Viewquizitem(props) {
  const { Ques, Option1, Option2, Option3, Option4, Marks, Correct ,_id} = props.quiz;
  const updateQues=props.updateQues
  
  return (
    <section id="userquiz" >
      <div className="d-flex  row">
        <div className="col-md-10 col-lg-10">
          <div className="border">
        
            <div className="question  p-3 border-bottom" style={{ "background": "burlywood" }}>
              <div className="d-flex flex-row align-items-center question-title" >
                <div className='d-flex ' style={{ "width": "100%" }} id="ques">
                  <h3 className="text-danger">Q.</h3>
                  <p className="mt-1 ml-2" name="Ques" id="Ques" >{Ques}</p>
                  <h5 >Marks:{Marks}</h5>
                </div>
              </div>
              <div className="ans ml-2 my-3">
                <label className="radio">  1:  {Option1}</label>
              </div>
              <div className="ans ml-2 my-3">
                <label className="radio"> 2:{Option2}</label>
              </div>
              <div className="ans ml-2 my-3">
                <label className="radio"> 3:{Option3} </label>
              </div>
              <div className="ans ml-2  my-3">
                <label className="radio"> 4:{Option4} </label>
              </div>
              <div className="ans ml-2  my-3">
                <label className="radio"> Correct : {Correct}</label>
              </div>
              <div className='d-flex justify-content-end' style={{ "background": "burlywood" }}>
                <button type="submit" className="w-23 bg-info" onClick={()=>{updateQues(props.index,_id)}}>Update Ques</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Viewquizitem
