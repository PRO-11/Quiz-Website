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
    <section id="homepage">
      <Rules/>
    <div className="bghome"></div>
    <div className="bghome bg2"></div>
    <div className="bghome bg3"></div>
    <div className="content my-5">
    <button className="mx-5 " onClick={() => handleclick('admin')}>ADMIN</button>
    <button className="mx-5" onClick={() => handleclick('user')}>STUDENT</button>
    <div className="left"> </div>
    <div className="right"></div>
    </div>
    </section>
  )
}

export default Home