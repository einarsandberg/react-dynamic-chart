import React, {Component} from 'react'
const PieChart = require('react-d3/piechart').PieChart;
import EntryForm from './EntryForm'

export default class App extends Component {
    constructor(props) {
      super(props)
      this.newEntry = {label: "", value: -1}
      this.state = {
        pieData: [{label: 'Margarita', value: 20.0},
          {label: 'John', value: 55.0},
          {label: 'Tim', value: 25.0 }],
      }
    }
    onUpdate = (key, data) => {
      this.newEntry[key] = data
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
        for (let i = 0; i < data.length; i++)
          data[i].value*= (0.01*(100-newEntry.value))
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
            <EntryForm onUpdate={this.onUpdate} onSubmit={this.onSubmit} />
        </div>
        );
    }
}
