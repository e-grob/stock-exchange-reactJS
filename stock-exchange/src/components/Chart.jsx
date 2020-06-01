import React from "react";
import Plot from "react-plotly.js";
import "../css/companyChart.css";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
    };
  }
  componentDidMount() {
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
    const { companyPercentage } = this.props;
    let percentAsNum = companyPercentage.replace(/^[%()+ ]+|[%()+ ]+$/g, "");
    percentAsNum = Number(percentAsNum);

    return (
      <div className="line-chart">
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: "scatter",
              mode: "lines+markers",
              marker:
                percentAsNum >= 0 ? { color: "#30a730" } : { color: "red" },
            },
          ]}
          config={{ responsive: true, modeBar: false }}
          layout={{
            xaxis: {
              title: "Last 30 Days",
              size: 12,
            },
            width: 700,
            height: 500,
            title: "Historical Data",
            display: "flex",
          }}
        />
      </div>
    );
  }
}

export default Chart;
