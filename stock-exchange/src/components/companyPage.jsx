import React from "react";
import { getCompanyHistory } from "../lib/api.js";
import Chart from "./Chart";
import "../css/companyChart.css";

class CompanyPage extends React.Component {
  //_isMounted = false;

  constructor(props) {
    super(props);
    this.state = { historicalData: [], company: [], display: false };
  }

  async componentDidMount() {
    //this._isMounted = true;

    let path = window.location.pathname;
    let pathArray = path.split("/");
    let companySymbol = pathArray[pathArray.length - 1];
    // console.log(companySymbol);
    const historicalDataObject = await getCompanyHistory(companySymbol);
    // if (this._isMounted) {
    this.setState({ historicalData: historicalDataObject });
    // }
    // console.log(this.state.historicalData);

    for (let i = 0; i < this.props.stocks.length; i++) {
      if (this.props.stocks[i].symbol === companySymbol) {
        // if (this._isMounted) {
        this.setState({ company: this.props.stocks[i] }, () => {
          this.setState({ display: true });
        });
        // }
      }
    }
    // console.log(this.state.company);
  }

  render() {
    const { company, historicalData, display } = this.state;
    return (
      <div className="company-page">
        {display && (
          <div className="parent-div">
            <div className="company-pg-header">
              <div className="img-div">
                <img
                  className="img-responsive"
                  src={company.details.image}
                  alt={company.symbol}
                />
              </div>
              <div className="company-page-name">
                <h1 className="company-page-title">{company.name}</h1>
              </div>
            </div>
            <div className="price-and-changes container">
              <span className="price">
                Stock Price: ${company.details.price}{" "}
              </span>
              &nbsp;
              <span className="percent-changes">
                {company.details.changesPercentage}
              </span>
            </div>
            <Chart
              className="line-chart"
              historicalData={historicalData}
            ></Chart>
            <div className="company-description container">
              <h2>About</h2>
              {company.details.description}
            </div>
            <div className="company-website container">
              <a href={company.details.website}>{company.details.website}</a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CompanyPage;
