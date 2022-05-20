import React, { useState, useEffect, useRef } from 'react'
import NavbarAdmin from './NavbarAdmin'
import { useLocation, useHistory, Link } from 'react-router-dom';
import Alert from '../../Alert'
import Viewquizitem from './Viewquizitem';
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
        const response = await fetch("https://vaishnavi-quiz-website.herokuapp.com/admin/viewquiz", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('adtoken')
            },
            body: JSON.stringify({ "quiz_id": id })
        })
        const json = await response.json();
        setstart({"start":json.start,"end":json.end})
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
          return
        }
        if(!start.start.includes(":00.000Z"))
           start.start= start.start+":00.000Z"
           
           const response = await fetch("https://vaishnavi-quiz-website.herokuapp.com/admin/updatedate", {
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
        const response = await fetch("https://vaishnavi-quiz-website.herokuapp.com/admin/updateques", {
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
        <section style={{ "position": "absolute", "top": "0", "left": "0px", "width": "100%", "minHeight": "100vh", background: "linear-gradient(#e66465, #9198e5)" }} >
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
                            <form className="d-flex flex-column">
                                <div className="question  p-3 border-bottom" style={{ "background": "burlywood" }}>
                                    <div className="d-flex flex-row align-items-center question-title">
                                        <h3 className="text-danger">Q.</h3>
                                        <textarea value={obj.Ques} className="mt-1 ml-2" rows="3" cols="80" placeholder='Enter Your Ques' onChange={handlechg} name="Ques" id="Ques" required></textarea>
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


            <NavbarAdmin name={adname} />
            <Alert alert={props.alert} page="userhome"/>
            <div className="inputBx" style={{ "marginTop": "50px" }}>
                <label htmlFor="start"   style={{"border": "2px solid cornsilk","background": "cornsilk","borderRadius": "3px","marginLeft":"70px"}}>Start Date</label>
                <input  type="datetime-local" style={{"background":"cornsilk"}} className="mx-2"name="start" value={start.start}  required onChange={onchange} id="start" />
                <label htmlFor="End" className='mx-3' style={{"border": "2px solid cornsilk","background": "cornsilk","borderRadius": "3px"}}>Time Limit In Minutes</label>
                <input  type="text" className="my-3 mx-2" style={{"background":"cornsilk"}} name="end"  value={start.end}  required onChange={onchange} id="end"  />
              <input type="submit" style={{"background":"aqua"}} className="mx-5" onClick={updatedate} value="Update Date and Time"/>
            </div>
            {quiz.map((element, index) => {
                return <div className="container my-2" key={index}>
                    <Viewquizitem quiz={element} index={index} updateQues={updateQues} />
                </div>
            })
            }

        </section>
    )
}

export default Viewquiz;