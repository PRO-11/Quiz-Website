import { queries } from '@testing-library/react'
import React from 'react'

function Startquizques(props) {
  const { Ques, Option1, Option2, Option3, Option4 } = props.quiz;
  let ans = new Array();
  return (
    <div className='col-md-9'>
      <div className="card"  >
        <div className="card-body">
          <h5 className="card-title">{Ques}</h5>
          <div className='d-flex flex-column '>
            <div>
              <input type="radio" name={`quiz${props.index}`} id="Option1" onClick={(e) => {props.handleclk(e,props.index);}} value="1" />         {Option1}
            </div>
            <div>
              <input type="radio" name={`quiz${props.index}`} id="Option2" onClick={(e) => {props.handleclk(e,props.index);}} value="2" />         {Option2}
            </div>
            <div>
              <input type="radio" name={`quiz${props.index}`} id="Option3" onClick={(e) => {props.handleclk(e,props.index);}} value="3" />        {Option3}
            </div>
            <div>
              <input type="radio" name={`quiz${props.index}`} id="Option4" onClick={(e) => {props.handleclk(e,props.index);}} value="4" />        {Option4}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Startquizques