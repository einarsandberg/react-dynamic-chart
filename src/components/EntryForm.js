import React, {Component} from 'react'
const PieChart = require('react-d3/piechart').PieChart;

export default class EntryForm extends Component {
    constructor(props) {
      super(props)
    }

    update = (e) => {
      let value = e.target.value
      if (e.target.id== 'value')
        value = parseFloat(value) 

      this.props.onUpdate(e.target.id, value)
     }
    render () {
        return (
          <div>
              Entry:
              <input type="text" id="label" onChange={this.update} />
              Value:
              <input type="text" id="value" onChange={this.update} />
          <button type="submit" onClick={this.props.onSubmit}>Add new pie entry</button>
          </div>
        );
    }
}
