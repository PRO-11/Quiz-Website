import React, { useState, useEffect, useRef } from 'react'
import NavbarAdmin from './NavbarAdmin'
import { useLocation, useHistory, Link } from 'react-router-dom';
import Alert from '../../Alert'
import Viewquizitem from './Viewquizitem';
import '../../Css/adminhomepg.css'
import {baseurl} from '../../BASEURL'
function Viewquiz(props) {
    let location = useLocation();
    let history = useHistory()
    let id = location.state.id;
    let adname = location.state.name;

    const [ques_id, setques_id] = useState('')
    const [quiz, setquiz] = useState([]);
    const [start, setstart] = useState({});
    const [obj, setobj] = useState({ "Ques": " ", "Option1": " ", "Option2": " ", "Option3": " ", "Option4": " ", "Correct": " ", "Marks": " " })
    const getallQues = async () => {
        const response = await fetch(`${baseurl}/adminbackend/viewquiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('adtoken')
            },
            body: JSON.stringify({ "quiz_id": id })
        })
        const json = await response.json();
        setstart({"start":" ","end":json.end})
        setquiz(json.quiz)
    }
    const updatedate=async()=>{
        let date=new Date().getTime();
        let temp=new Date(start.start).getTime()
        if(temp<date){
            props.showalert("Failed","Date and time should be greater than now")
        //   props.showalert("Failed","Date and time should be greater than now")
        return ;
        }
        if(!Number.isInteger(Number(start.end)))
        {
            props.showalert("Failed","Time should be in Integer")
        //   props.showalert("Failed","Time should be in Integer")
          return;
        }
        if(!start.start.includes(":00.000Z"))
           start.start= start.start+":00.000Z"
           
           const response = await fetch(`${baseurl}/adminbackend/updatedate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('adtoken')
            },
            body: JSON.stringify({ "quiz_id": id, "start": start.start, "end":start.end })
        })
        const json = await response.json();
        props.showalert("Success","Date and Time Updated Successfully")
    }
    const onchange=(e)=>{
        setstart({...start,[e.target.name]:e.target.value})
    }
    useEffect(async () => {
        if (localStorage.getItem('adtoken')) {
            getallQues()
        }
        else {
            history.push('./loginadmin')
        }
    }, []);
    const ref = useRef(null)
    const refClose = useRef(null)
    const handleClick = async (e) => {
        refClose.current.click();
        let quizobj = {
            "Ques": obj.Ques,
            "Option1": obj.Option1,
            "Option2": obj.Option2,
            "Option3": obj.Option3,
            "Option4": obj.Option4,
            "Marks": obj.Marks,
            "Correct": obj.Correct
        }
        const response = await fetch(`${baseurl}/adminbackend/updateques`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('adtoken')
            },
            body: JSON.stringify({ "ques_id": ques_id, "quiz": quizobj, "quiz_id": id })
        })
        const json = await response.json();
        props.showalert("Success","Ques Updated Successfully")
        getallQues()
    }

    const handlechg = (e) => {
        setobj({ ...obj, [e.target.name]: e.target.value })
    }
    const updateQues = (index, id) => {
        setques_id(id)
        ref.current.click();
        setobj({ "Ques": quiz[index].Ques, "Option1": quiz[index].Option1, "Option2": quiz[index].Option2, "Option3": quiz[index].Option3, "Option4": quiz[index].Option4, "Correct": quiz[index].Correct, "Marks": quiz[index].Marks })
    }
    return (
        <div className="d-flex flex-column bd-highlight mb-3" style={{ "position": "absolute","top":"0","left":"0","right":"0","width":"100%","minHeight": "100vh" }} >
            <NavbarAdmin name={adname} />
       <div className="bgadmin"></div>
         <div style={{ "position": "absolute", "top": "0", "left": "0px", "minWidth": "100vw", "minHeight": "100vh" }} > 
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header " style={{ "background": "antiquewhite" }}>
                            <h5 className="modal-title" id="exampleModalLabel">Edit Ques</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ "background": "burlywood" }}>
                        <form className="question  p-3 border-bottom" style={{"background":"burlywood"}}>
                                    <div className="d-flex flex-row align-items-center question-title">
                                        <h3 className="text-danger">Q.</h3>
                                        <textarea value={obj.Ques} className="form-control"  rows="3" placeholder='Enter Your Ques' onChange={handlechg} name="Ques" id="Ques" required></textarea>
                                    </div>
                                    <div className="ans ml-2 my-3">
                                        <label className="radio"> Option 1: <input type='text' name="Option1" id="Option1" value={obj.Option1} onChange={handlechg} required /></label>
                                    </div>
                                    <div className="ans ml-2 my-3">
                                        <label className="radio">Option 2: <input type='text' name="Option2" id="Option2" value={obj.Option2} onChange={handlechg} required />
                                        </label>
                                    </div>
                                    <div className="ans ml-2 my-3">
                                        <label className="radio">Option 3: <input type='text' name="Option3" id="Option3" value={obj.Option3} onChange={handlechg} required />
                                        </label>
                                    </div>
                                    <div className="ans ml-2  my-3">
                                        <label className="radio">Option 4: <input type='text' name="Option4" id="Option4" value={obj.Option4} onChange={handlechg} required />
                                        </label>
                                    </div>
                                    <div className="ans ml-2  my-3">
                                        <label className="radio">Correct Option:
                                            <select name="Correct" onChange={handlechg} className='mx-2' style={{ background: "burlywood" }} required>
                                                <option value="1" selected={(obj.Correct == "1" ? true : false)}>1</option>
                                                <option value="2" selected={(obj.Correct == "2" ? true : false)}>2</option>
                                                <option value="3" selected={(obj.Correct == "3" ? true : false)}>3</option>
                                                <option value="4" selected={(obj.Correct == "4" ? true : false)}>4</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="ans ml-2  my-3">
                                        <label className="radio">Marks:
                                            <select name="Marks" onChange={handlechg} className='mx-2' style={{ background: "burlywood" }} required>
                                                <option value="1" selected={(obj.Marks == "1" ? true : false)}>1</option>
                                                <option value="2" selected={(obj.Marks == "2" ? true : false)}>2</option>
                                                <option value="3" selected={(obj.Marks == "3" ? true : false)}>3</option>
                                                <option value="4" selected={(obj.Marks == "4" ? true : false)}>4</option>
                                                <option value="5" selected={(obj.Marks == "5" ? true : false)}>5</option>
                                            </select>
                                        </label>
                                    </div>
                                
                            </form>
                        </div>
                        <div className="modal-footer" style={{ "background": "antiquewhite" }}>
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={obj.Ques.length < 1 || obj.Option1.length < 1 || obj.Option2.length < 1 || obj.Option3.length < 1 || obj.Option4.length < 1 || obj.Correct.length == 0 || obj.Marks.length == 0} onClick={handleClick} type="button" className="btn btn-primary">Update Ques</button>
                        </div>
                    </div>
                </div>
            </div>
            <Alert alert={props.alert} page="userhome"/>
            
             <form style={{"display":"flex","alignItems":"center","width":"100%","marginTop":"80px"}}>
             <div style={{"flex":"2","marginRight":"4px","marginLeft":"80px","fontSize":"1.2em"}}>
                <label htmlFor="start"   style={{"border": "2px solid cornsilk","background": "cornsilk","borderRadius": "3px","height":"2rem"}} className='my-3'>Start Date & Time</label>
                <input  type="datetime-local" style={{"background":"cornsilk","height":"2rem"}} name="start" value={start.start} className=' mx-3' required onChange={onchange} id="start" />
              
                <label htmlFor="End" className='my-3' style={{"border": "2px solid cornsilk","background": "cornsilk","borderRadius": "3px","height":"2rem"}}>Time Limit In Minutes</label>
                <input  type="text" className="my-3  mx-3 " style={{"background":"cornsilk","height":"2rem"}} name="end"  value={start.end}  required onChange={onchange} id="end"  />
    
              <input type="button"  style={{"background":"aqua","height":"2.5rem"}} className='my-3'  onClick={updatedate} value="Update Date and Time"/>

            </div>
            </form>
            
        {quiz.map((element, index) => {
                return <div className="container my-2" key={index} >
                    <Viewquizitem quiz={element} index={index} updateQues={updateQues} />
                </div>
            })
            }
            </div> 
<div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        </div>
        </div>
    )
}

export default Viewquiz;