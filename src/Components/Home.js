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
      <button style={{ "--content": "Hover me!" }} onClick={() => handleclick('admin')}>
        <div className="left"></div>
        ADMIN
        <div className="right"></div>
      </button>
      <button className="mx-3" style={{ "--content": "Hover me!" }} onClick={() => handleclick('user')}>
        <div className="left"></div>
        STUDENT
        <div className="right"></div>
      </button>
     </section>
  )
}

export default Home