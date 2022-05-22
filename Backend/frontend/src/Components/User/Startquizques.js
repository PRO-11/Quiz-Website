import { queries } from '@testing-library/react'
import React from 'react'
import '../../Css/showquiz.css'
function Startquizques(props) {
  const { Ques, Option1, Option2, Option3, Option4 ,marks} = props.quiz;
  let ans = new Array();
  return (
    <section  id="userquiz" >
    <div className="d-flex  row">
      <div className="col-md-10 col-lg-10">
        <div className="border">
          
          <div className="question  p-3 border-bottom" style={{"background":"burlywood"}}>
            <div className="d-flex flex-row align-items-center question-title" >
              <div className='d-flex ' style={{"width":"100%"}} id="ques">
              <h3 className="text-danger">Q.</h3>
              <p className="mt-1 ml-2"   name="Ques" id="Ques" >{Ques}</p>
              <h5 >Marks:{marks}</h5>
              </div>
            </div>
            <div className="ans ml-2 my-3">
              <label className="radio">  1: <input type="radio" name={`quiz${props.index}`} id="Option1" onClick={(e) => {props.handleclk(e,props.index);}} value="1" />    {Option1}</label>
            </div>
            <div className="ans ml-2 my-3">
              <label className="radio"> 2:  <input type="radio" name={`quiz${props.index}`} id="Option2" onClick={(e) => {props.handleclk(e,props.index);}} value="2" />    {Option2}
              </label>
            </div>
            <div className="ans ml-2 my-3">
              <label className="radio"> 3: <input type="radio" name={`quiz${props.index}`} id="Option3" onClick={(e) => {props.handleclk(e,props.index);}} value="3" />     {Option3} 
              </label>
            </div>
            <div className="ans ml-2  my-3">
              <label className="radio"> 4: <input type="radio" name={`quiz${props.index}`} id="Option4" onClick={(e) => {props.handleclk(e,props.index);}} value="4" />       {Option4} 
              </label>
            </div>
          </div>
        
        </div>
      </div>
   
    </div>
  </section>
  )
}

export default Startquizques
