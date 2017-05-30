import React, {Component} from 'react'
const PieChart = require('react-d3/piechart').PieChart;
export default class EntryForm extends Component {
    render () {

        return (
          <div>
            <h1> {this.props.heading} </h1>
            	{this.props.children}
            { this.props.onSubmit != null ? 
            	<button type="submit" onClick={this.props.onSubmit}>{this.props.submitBtnText}</button>
            	: null
        	}
          </div>
        );
    }
}
