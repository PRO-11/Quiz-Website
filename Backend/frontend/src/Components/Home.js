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
    <div className="d-flex justify-content-center">
    <button  className="d-flex justify-content-center" onClick={() => handleclick('admin')}>ADMIN</button>
    <button className="d-flex justify-content-center mx-5" onClick={() => handleclick('user')}>STUDENT</button>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Home