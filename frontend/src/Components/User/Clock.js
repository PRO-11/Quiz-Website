import React, { useEffect,useRef, useState } from 'react'
import '../../Css/Clock.css'
function Clock(props) {
  const mounted = useRef(false);
    const end=props.end;
    const handlesub=props.submit
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
        if(distance<0&&mounted.current)
        {
          mounted.current = false;
          handlesub();
    clearInterval(interval.current);
          }
          else{
            sethours(hours);
            setminutes(minutes);
            setseconds(seconds)
          }
      },1000 );};
     useEffect(()=>{
      
       mounted.current = true;
       if(mounted.current){
         startTimer();
      }
    
      return()=>{
        mounted.current = false;
         
      }
    });
  return (
<>
   {(true)?
   <span id="clock"  >{hours}:{minutes}:{seconds}</span>:
   <div>
   </div>}
   </>
    
  )
}

export default Clock