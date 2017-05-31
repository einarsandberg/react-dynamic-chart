import React, {Component} from 'react'
//const PieChart = require('react-d3/piechart').PieChart;
const PieChart = require('rd3/build/cjs/piechart').PieChart;
import EntryForm from './EntryForm'
import FormInput from './FormInput'

export default class App extends Component {
    constructor(props) {
      super(props)
      this.newEntry = {label: "", value: 0}
      this.chartSize = {
        height: 300,
        width: 400,
        radius: 100,
        innerRadius: 20
      }
      this.state = {
        pieData: [{label: 'Margarita', value: 20.0},
          {label: 'John', value: 55.0},
          {label: 'Tim', value: 25.0}],
      }

    }
    onInputUpdate = (e) => {
      let value = e.target.value
      if (e.target.id== 'value')
        value = parseFloat(value) 
      this.newEntry[e.target.id] = value
    }

    onSubmitEntry = () => {
     this.setState({
        pieData: this.recalculate(this.state.pieData, this.newEntry).sort(this.compare)
      })
    }

    recalculate = (data, newEntry) => {

      // Remove all other items if new entry is >= 100%
      if (newEntry.value >= 100)
        return [{label: newEntry.label, value: 100}]
      data = data.filter(function(a) {
        return a.label != newEntry.label
      })
      let sum = data.reduce((acc, item) => acc + item.value, 0)
      console.log(sum)
      // Recalculate existing items. Will not change unless item is
      data = data.map((item) => {
        item.value = (item.value/sum)*100
        return item
      })
      console.log(data)
      data = data.map((item) => {
        item.value *= (0.01*(100-newEntry.value))
        // If not integer -> fixed num of decimals
        if (item.value % 1 != 0)
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
          <div>
            <h1>Hello PieChart!</h1>
            <div id="container">
              <div id="pie-container">
                <div id="pie">
                  <PieChart
                    data={this.state.pieData}
                    width={this.chartSize.width}
                    height={this.chartSize.height}
                    radius={this.chartSize.radius}
                    innerRadius={this.chartSize.innerRadius}
                    colors = {d3.scale.category10()}
                    showOuterLabels={true}
                    showInnerLabels={true}
                    sectorBorderColor={'black'}
                  />
                </div>
                <div id="entry-form">
                  <EntryForm onSubmit={this.onSubmitEntry} heading="Add or update entry" submitBtnText="Submit" >
                    <FormInput placeholder="Jane" 
                      type="text" id="label" 
                      name="Entry " 
                      onChange={this.onInputUpdate}
                    />
                    <FormInput placeholder="20" 
                      type="text" id="value" 
                      name="Value " 
                      onChange={this.onInputUpdate} 
                      ensure="number"
                    />
                  </EntryForm>
                </div>

            </div>
          </div>

        </div>
        );
    }
}
