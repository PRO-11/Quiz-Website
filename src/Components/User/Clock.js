import React, { useEffect,useRef, useState } from 'react'
import '../../Css/Clock.css'
import { set } from 'react-hook-form';
function Clock(props) {
    const end=props.end;

    const [hours,sethours]=useState('00')
    const [minutes,setminutes]=useState('00')
    const [seconds,setseconds]=useState('00')
    
    let interval=useRef() 
    const startTimer=()=>{
      let countDown=end.getTime();
       interval=setInterval(()=>{
        const now=new Date().getTime();
        const distance=countDown-now;
        let hours=Math.floor((distance%(1000*60*60*24)/(1000*60*60)));
        if(hours<10)
        hours="0"+hours
        let minutes=Math.floor((distance%(1000*60*60)/(1000*60)));
        if(minutes<10)
        minutes="0"+minutes
        let seconds=Math.floor((distance%(1000*60)/(1000)));
        if(seconds<10)
        seconds="0"+seconds
        
          if(distance<0)
          {
    clearInterval(interval.current);
          }
          else{
            sethours(hours);
            setminutes(minutes);
            setseconds(seconds)
          }
      },1000 );};
     useEffect(()=>{
       let isMounted=true;
       if(isMounted){
      startTimer();
       }
      return()=>{
          isMounted = false;
        clearInterval(interval.current)
      }
    });
  return (
    // <div className='d-flex' style={{"border":"5px solid red"}}>
    //    <h3>{hours}:</h3> 
    //   <h3>{minutes}:</h3>
    //   <h3>{seconds}</h3> 
    //   </div>
   
   <span id="clock"  >{hours}:{minutes}:{seconds}</span>

  )
}

export default Clock