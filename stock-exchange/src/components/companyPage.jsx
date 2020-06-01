import React from "react";
import { getCompanyHistory } from "../lib/api.js";
import Chart from "./Chart";
import { grabStocksFromApi, getStockDetails } from "../lib/api.js";
import "../css/companyChart.css";

class CompanyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historicalData: [],
      company: [],
      display: false,
      stockList: [],
    };
    this.handleFetchOnEmptyStocks = this.handleFetchOnEmptyStocks.bind(this);
  }

  async componentDidMount() {
    console.log(this.props.stocks);
    let path = window.location.pathname;
    let pathArray = path.split("/");
    let companySymbol = pathArray[pathArray.length - 1];

    const historicalDataObject = await getCompanyHistory(companySymbol);
    this.setState({ historicalData: historicalDataObject });

    for (let i = 0; i < this.props.stocks.length; i++) {
      if (this.props.stocks[i].symbol === companySymbol) {
        this.setState({ company: this.props.stocks[i] }, () => {
          this.setState({ display: true });
        });
      }
    }
  }

  render() {
    const { company, historicalData, display } = this.state;
    return (
      <div className="company-page">
        {display && (
          <div className="parent-div">
            <div className="company-pg-header d-flex justify-content-start">
              <div className="img-div">
                <img
                  className="img-responsive"
                  src={company.details.image}
                  alt={company.symbol}
                />
              </div>
              <div className="title-div">
                <h1 className="company-page-title">{company.name}</h1>
              </div>
            </div>
            <div className="price-and-changes container">
              <span className="price">
                Stock Price: ${company.details.price}{" "}
              </span>
              &nbsp;
              {company.details.changesPercentage.includes("+") && (
                <span className="green-color">
                  {company.details.changesPercentage}
                </span>
              )}
              {company.details.changesPercentage.includes("-") && (
                <span className="red-color">
                  {company.details.changesPercentage}
                </span>
              )}
              {company.details.changesPercentage === "(0.00%)" && (
                <span className="grey-color">
                  {company.details.changesPercentage}
                </span>
              )}
            </div>{" "}
            <div className="company-description container">
              <h2>About</h2>
              {company.details.description}
            </div>
            <Chart
              class="chart"
              historicalData={historicalData}
              companyPercentage={company.details.changesPercentage}
            ></Chart>
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
