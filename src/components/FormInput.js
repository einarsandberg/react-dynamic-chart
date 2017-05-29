import React, {Component} from 'react'
const PieChart = require('react-d3/piechart').PieChart;

export default class FormField extends Component {

    render () {
        return (
          <div>
              {this.props.name}
              <input type={this.props.type} id={this.props.id} onChange={this.props.onChange} />
          </div>
        );
    }
}
