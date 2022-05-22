import React from 'react'
import './Css/Alert.css'
function Alert(props) {
  return (
    <div id={props.page}>
    {props.alert && <div className="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>{props.alert.type}:</strong>{props.alert.msg};
</div>}
    </div>
    )
}

export default Alert;