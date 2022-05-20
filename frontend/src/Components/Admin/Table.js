import React from 'react'

function Table(props) {
  let classs=props.res.class;
    const {name,userid,marks}=props.res
    let index=props.index;
    
  return (
    <>
        <th  scope="row">{index}</th>
        <th>{name}</th>
        <td>{userid}</td>
        <td>{classs}</td>
        <td>{marks}</td>
        </>
  )
}

export default Table