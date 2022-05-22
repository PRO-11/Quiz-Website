import QuizContext from "./QuizContext"

import React, { useState } from 'react'

function QuizState(props) {
 


  let ans=new Array;
   
  return (
    <QuizContext.Provider value={{ans}}>
        {props.children}
    </QuizContext.Provider>
  )
}

export default QuizState