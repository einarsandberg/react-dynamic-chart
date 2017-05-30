import React, {Component} from 'react'
const PieChart = require('react-d3/piechart').PieChart;

export default class FormField extends Component {

	validate = (e) => {
		if(this.props.ensure == undefined)
			this.props.onChange(e)

		else if (this.props.ensure == "number") {
			if (!isNaN(parseFloat(e.target.value))) {
				this.props.onChange(e)
			}
		}
		else if (this.props.ensure == "string") {
			if (isNaN(parseFloat(e.target.value))) {
				this.props.onChange(e)
			}
		}

	}
    render () {
        return (
          <div>
              {this.props.name}
              <input placeholder={this.props.placeholder}
              	type={this.props.type} 
              	id={this.props.id} 
              	onChange={this.validate} 
              	/>
          </div>
        );
    }
}
