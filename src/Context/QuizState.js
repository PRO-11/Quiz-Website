import QuizContext from "./QuizContext"

import React, { useState } from 'react'

function QuizState(props) {
 

   const [results,setresults]=useState([]);
  let ans=new Array;

  return (
    <QuizContext.Provider value={{results,setresults,ans}}>
        {props.children}
    </QuizContext.Provider>
  )
}

export default QuizState