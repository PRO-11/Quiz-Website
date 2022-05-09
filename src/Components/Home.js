import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../Css/Homepage.css'
function Home() {
  let history = useHistory();
  const handleclick = (param) => {
    console.log(param)
    history.push(`/login${param}/`);
  }
  return (
    <section id="homepage">
    <div className="bghome"></div>
    <div className="bghome bg2"></div>
    <div className="bghome bg3"></div>
    <div className="content">
      
      
    <button className="mx-5" onClick={() => handleclick('admin')}>ADMIN</button>
  <button className="mx-5" onClick={() => handleclick('user')}>STUDENT</button>
  <div className="left">
  </div>
  
  <div className="right">
  </div>

      {/* <section id="homepage">
        <div className="left"></div>
        ADMIN
        <div className="right"></div>
        <div className="left"></div>
        STUDENT
        <div className="right"></div>
        </button>
      </section> */}
    </div>
    </section>
  )
}

export default Home