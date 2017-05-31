import React, {Component} from 'react'
const EntryForm = (props) => (
      <div>
        <h1> {props.heading} </h1>
        {props.children}
        {props.onSubmit != null ? 
          <button type="submit" onClick={props.onSubmit}>{props.submitBtnText}</button>
          : null
        }
      </div>  
)
export default EntryForm