import React from "react";
import "../css/stockListDisplay.css";
import { Link } from "react-router-dom";

class StockListResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stockList } = this.props;
    return (
      <ul className="list">
        {stockList.map((company, index) => (
          <li className="list-item" key={index}>
            <div className="parent-div d-flex flex-row justify-content-between">
              <div className="right-div-parent">
                <img
                  className="company-logo"
                  src={company.details.image}
                  alt={company.name}
                ></img>
                <Link
                  className="link-to-company"
                  to={`./company/${company.symbol}`}
                >
                  {company.name === null && (
                    <span className="company-name">
                      (Company Name Unavailable)
                    </span>
                  )}
                  <span className="company-name">{company.name}&nbsp;</span>

                  <span className="company-symbol">({company.symbol})</span>
                </Link>
              </div>
              <div className="left-div">
                {/* adjust code to not repeat itself */}
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
              </div>
            </div>
            <hr></hr>
          </li>
        ))}
      </ul>
    );
  }
}

export default StockListResults;
