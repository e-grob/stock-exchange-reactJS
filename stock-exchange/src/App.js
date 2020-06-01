import React from "react";
import StockSearch from "./components/stockSearch";
import CompanyPage from "./components/companyPage";
import "./css/stockListDisplay.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = { stockList: [] };
  }

  retrieveStockList = (stocksFromSearch) => {
    this.setState({ stockList: stocksFromSearch });
  };

  render() {
    return (
      <Router>
        <div className="stock-exchange">
          <Link to="./company/:id" />
          <Switch>
            <Route path="/company/:id">
              <CompanyPage stocks={this.state.stockList}></CompanyPage>
            </Route>
            <Route exact path="/">
              <StockSearch
                stocksFromSearch={this.retrieveStockList}
              ></StockSearch>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
