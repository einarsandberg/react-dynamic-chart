import React, {Component} from 'react'
const PieChart = require('react-d3/piechart').PieChart;
import EntryForm from './EntryForm'
import FormInput from './FormInput'
export default class App extends Component {
    constructor(props) {
      super(props)
      this.newEntry = {label: "", value: 0}
      this.state = {
        pieData: [{label: 'Margarita', value: 20.0},
          {label: 'John', value: 55.0},
          {label: 'Tim', value: 25.0 }],
      }

    }
    onInputUpdate = (e) => {
      let value = e.target.value
      if (e.target.id== 'value')
        value = parseFloat(value) 
      this.newEntry[e.target.id] = value
      console.log(this.newEntry)
    }

    onSubmit = () => {
     this.setState({
        pieData: this.calculatePercent(this.state.pieData, this.newEntry)
      })
    }
    calculatePercent = (data, newEntry) => {
      let sum = 0;
      if (newEntry.value >= 100) {
        return [{label: newEntry.label, value: 100}]
      }

      for (let i = 0; i < data.length; i++) {
        sum+=data[i].value
      }
      sum+=newEntry.value
      if (sum > 100) {
        for (let i = 0; i < data.length; i++) {
          data[i].value*= (0.01*(100-newEntry.value))
          if (data[i].value % 1 != 0) {
            data[i].value = parseFloat(data[i].value.toFixed(2))
          }
        }
      }
      data.push({'label': newEntry.label, 'value': newEntry.value})
      return data
    }

    render () {
        return (
          <div>
            <h1>Hello PieChart!</h1>
              <PieChart
                data={this.state.pieData}
                width={400}
                height={400}
                radius={100}
                innerRadius={20}
                title="This is my Pie Chart"
              />
            <EntryForm onSubmit={this.onSubmit} >
              <FormInput type="text" id="label" name="Entry" onChange={this.onInputUpdate} />
              <FormInput type="text" id="value" name="Value" onChange={this.onInputUpdate} />
            </EntryForm>
        </div>
        );
    }
}
