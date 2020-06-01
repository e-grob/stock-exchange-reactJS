import React from "react";
import StockListResults from "./stockListResults";
import { grabStocksFromApi, getStockDetails } from "../lib/api.js";
import Marquee from "./marquee";
import "../css/stockListDisplay.css";
// import CompanyPage from "./company";

class StockSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "", stockList: [], loader: true };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
  }
  handleSearchChange(event) {
    this.setState({ searchInput: event.target.value });
  }
  async handleSearchButton() {
    const { searchInput } = this.state;
    let listOfCompanyStocks = await grabStocksFromApi(searchInput);

    for (let individualCompany of listOfCompanyStocks) {
      await getStockDetails(individualCompany);
    }

    //console.log(listOfCompanyStocks);
    this.setState({ stockList: listOfCompanyStocks, loader: false });
    this.props.stocksFromSearch(listOfCompanyStocks);
  }

  render() {
    const { searchInput, stockList } = this.state;
    return (
      <div>
        <Marquee></Marquee>

        <h1 className="title">Search Nasdaq Stocks</h1>

        <div className="input-results-containter container col-9">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="searchInput"
              placeholder="Search"
              value={searchInput}
              onChange={this.handleSearchChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary search-button"
                type="button"
                onClick={this.handleSearchButton}
              >
                Search
              </button>
            </div>
          </div>
          <div className="list-group list-group-flush" id="list-group">
            <StockListResults stockList={stockList}></StockListResults>
          </div>
        </div>
      </div>
    );
  }
}

export default StockSearch;
