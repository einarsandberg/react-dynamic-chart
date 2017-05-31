import React from 'react'

const EntryForm = (props) => (
  <div>
    <h1> {props.heading} </h1>
    {props.children}
    {props.onSubmit != null ? 
      <div>
      	<button type="submit" onClick={props.onSubmit}>{props.submitBtnText}</button>
        {props.entryMsg}
      </div>
    	: null
    }
  </div>  
)
export default EntryForm