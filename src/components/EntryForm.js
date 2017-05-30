import React, {Component} from 'react'
const PieChart = require('react-d3/piechart').PieChart;

export default class EntryForm extends Component {

    render () {
        return (
          <div>
            <h1> {this.props.heading} </h1>
            {this.props.children}
            <button type="submit" onClick={this.props.onSubmit}>Add new pie entry</button>
          </div>
        );
    }
}
