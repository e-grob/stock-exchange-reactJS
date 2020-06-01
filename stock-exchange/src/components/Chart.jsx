import React from "react";
import Plot from "react-plotly.js";
import "../css/companyChart.css";
import ScatterMarkerLine from "plotly.js";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
    };
  }
  componentDidMount() {
    const { stockChartXValues, stockChartYValues } = this.state;
    const { historicalData } = this.props;
    console.log("histData:", historicalData);

    let limit = historicalData.historical.length - 30;
    let xData = [];
    let yData = [];
    for (let i = 0; i <= historicalData.historical.length - limit; i++) {
      xData.push(historicalData.historical[i].date);
      yData.push(historicalData.historical[i].close);
    }
    this.setState({
      stockChartXValues: xData,
      stockChartYValues: yData,
    });
  }

  render() {
    return (
      <div>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: "scatter",
              mode: "lines+markers",
              // marker: (color:'green')
            },
          ]}
          layout={{ width: 700, height: 450, title: "--" }}
        />
      </div>
      //     <p>x-valus: {this.state.stockChartXValues}</p>
      //     <p>y-valus: {this.state.stockChartYValues}</p>
      //   </div>
    );
  }
}

export default Chart;
