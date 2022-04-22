import QuizContext from "./QuizContext"

import React, { useState } from 'react'

function QuizState(props) {
 

   const [results,setresults]=useState([]);



   
  return (
    <QuizContext.Provider value={{results,setresults}}>
        {props.children}
    </QuizContext.Provider>
  )
}

export default QuizState