import React from 'react'
const FormInput = (props) => (
  <div>
    {props.name}
    <input placeholder={props.placeholder}
      type={props.type} 
      id={props.id} 
      onChange={props.onChange} 
    />
  </div>
)
export default FormInput;