import React from 'react'

function Table(props) {
  let classs=props.res.class;
    const {name,userid,marks}=props.res
    let index=props.index;
    
  return (
    <>
        <td  scope="row">{index}</td>
        <td>{name}</td>
        <td>{userid}</td>
        <td>{classs}</td>
        <td>{marks}</td>
        </>
  )
}

export default Table