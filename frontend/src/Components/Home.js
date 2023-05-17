import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../Css/Homepage.css'
import Rules from './Rules'
function Home() {
  let history = useHistory();
  const handleclick = (param) => {
    history.push(`/login${param}/`);
  }
  return (
      <div className="d-flex flex-column bd-highlight mb-3" id="homepage">
      <Rules/>
    <div className="bghome"></div>
    <div className="bghome1 bghome2"></div>
    <div className="bghome1 bghome3"></div>
    <div className="content my-5">
      <div className='container'>
    <div className="d-flex justify-content-center my-5">
    <button  className="d-flex justify-content-center mx-2" onClick={() => handleclick('admin')}>ADMIN</button>
    <button className="d-flex justify-content-center mx-5" onClick={() => handleclick('user')}>STUDENT</button>
    </div>
    </div>

    <div className="container-fluid text-center"
                style={{"position":"fixed","bottom":"0","left":"0","right":"0","background": "linear-gradient(to right,#f7d914,#0cf2fa)","opacity":" 1","color":"black" ,"fontWeight": "500", "fontSize": "17px","padding": "7px 0 !important"}}
                id="impt">
                <div className="blinkk"> Developed By: Shobhit Shrivastava</div>
            </div>
    </div>
    </div>
  )
}

export default Home