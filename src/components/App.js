import React, {Component} from 'react'
//const PieChart = require('react-d3/piechart').PieChart;
const PieChart = require('rd3/build/cjs/piechart').PieChart;
import EntryForm from './EntryForm'
import FormInput from './FormInput'

export default class App extends Component {
    constructor(props) {
      super(props)
      this.newEntry = {label: "", value: 0}
      this.chartConfig = {
        height: 300,
        width: 400,
        radius: 100,
        innerRadius: 20,
        showOuterLabels: true,
        showInnerLabels: true,
        colors: d3.scale.category10(),
        sectorBorderColor: 'black'
    }
      this.state = {
        pieData: [{label: 'Margarita', value: 20.0},
          {label: 'John', value: 55.0},
          {label: 'Tim', value: 25.0}],
        entryMsg: "",
      }
    }
    onInputUpdate = (e) => {
      let value = e.target.value
      if (e.target.id== 'value')
        value = parseFloat(value) 
      this.newEntry[e.target.id] = value
    }

    onSubmitEntry = () => {
      if (this.isEntryValid()) {
        this.setState({
          pieData: this.recalculate(this.state.pieData, this.newEntry).sort(this.compare),
          entryMsg: ' Pie updated!',
        })
      }
      else {
        this.setState({
          entryMsg: ' Invalid input.'
        })
      }
    }
    isEntryValid = () => {
      if ((this.newEntry.label.length > 0) && (typeof this.newEntry.value === 'number') &&
        (this.newEntry.value) > 0) return true; 
    }

    recalculate = (data, newEntry) => {
      
      if (newEntry.value >= 100 || (newEntry.value<100 && data.length == 1 &&
        data[0].label == newEntry.label)) {
        return [{label: newEntry.label, value: 100}]
      }

      data = data.filter(a =>  a.label !== newEntry.label)
      let sum = data.reduce((acc, item) => acc + item.value, 0)
      // Recalculate existing items. Will not change unless item is
      data = data.map((item) => {
        item.value = (item.value/sum)*100
        return item
      })
      data = data.map((item) => {
        item.value *= (0.01*(100-newEntry.value))
        // If not integer -> fixed num of decimals
        if (item.value % 1 !== 0)
          item.value = parseFloat(item.value.toFixed(2))
        return item;
      })
      
      data.push({'label': newEntry.label, 'value': newEntry.value})
      return data
    }
    compare = (a,b) => {
      return b.value <=a.value
    }

    render () {
      return (
        <div id="container">
          <div id="container-left">
            <h1 id="main-heading">Hello PieChart!</h1>
              <p className="main-text"> Use the form to add an entry or to update an existing entry.
              If adding an entry with a value >100, all existing entries will be removed
              and replaced with the new entry with value 100 %.</p>

              <p className="main-text">
              If the pie sum is > 100, the entries will be recalculated. However, the new entry will have the value as specified.
              If input is invalid, the entry will not be added.</p>
          </div>
          <div id="container-right">
            <div id="pie-container">
              <div id="pie">
                <PieChart
                  data={this.state.pieData}
                  width={this.chartConfig.width}
                  height={this.chartConfig.height}
                  radius={this.chartConfig.radius}
                  innerRadius={this.chartConfig.innerRadius}
                  colors = {this.chartConfig.colors}
                  showOuterLabels={this.chartConfig.showOuterLabels}
                  showInnerLabels={this.chartConfig.showInnerLabels}
                  sectorBorderColor={this.chartConfig.sectorBorderColor}
                />
              </div>
              <EntryForm onSubmit={this.onSubmitEntry} heading="Add or update entry" submitBtnText="Submit" 
                entryMsg={this.state.entryMsg}>
                <FormInput placeholder="Jane" 
                  type="text" id="label" 
                  name="Entry " 
                  onChange={this.onInputUpdate}
                />
                <FormInput placeholder="20" 
                  type="text" id="value" 
                  name="Value " 
                  onChange={this.onInputUpdate} 
                />
              </EntryForm>
          </div>
        </div>
      </div>
      );
    }
}
