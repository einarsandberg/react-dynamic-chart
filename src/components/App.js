import React, {Component} from 'react'
var PieChart = require('react-d3/piechart').PieChart;
var PieChart = require('rd3/build/cjs/piechart').PieChart
var tooltip = require("react-d3")
console.log(tooltip)
import EntryForm from './EntryForm'
import FormInput from './FormInput'

export default class App extends Component {
    constructor(props) {
      super(props)
      this.newEntry = {label: "", value: 0}
      this.state = {
        chartWidth: 500,
        chartHeight: 500,
        pieData: [{label: 'Margarita', value: 20.0, index: 0},
          {label: 'John', value: 55.0, index: 1},
          {label: 'Tim', value: 25.0 , index: 2}],
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
    compare = (a,b) => {
      return b.value <=a.value
      console.log(data)
    }

    render () {
        this.state.pieData.sort(this.compare)
        return (
          <div>
            <h1>Hello PieChart!</h1>
              <PieChart
                data={this.state.pieData}
                width={this.state.chartWidth}
                height={this.state.chartHeight}
                radius={Math.min(this.state.chartWidth, this.state.chartHeight - 120) / 3}
                innerRadius={40}
                title="This is my Pie Chart"
                colors = {d3.scale.category10()}
                showOuterLabels={true}
                showInnerLabels={true}
                sectorBorderColor={'black'}
              />
            <EntryForm onSubmit={this.onSubmit} heading={'Add new entry'} >
              <FormInput type="text" id="label" name="Entry" onChange={this.onInputUpdate} />
              <FormInput type="text" id="value" name="Value" onChange={this.onInputUpdate} />
            </EntryForm>
        </div>
        );
    }
}
