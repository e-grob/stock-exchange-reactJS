import React from "react";
import { grabMarqueeData } from "../lib/api.js";
import "../css/stockListDisplay.css";

class Marquee extends React.Component {
  constructor(props) {
    super(props);
    this.state = { marqueeData: [] };
  }

  async componentDidMount() {
    const data = await grabMarqueeData();
    this.setState({ marqueeData: data });
  }

  render() {
    const { marqueeData } = this.state;
    return (
      <div>
        <marquee className="marquee" behavior="scroll" direction="left">
          {marqueeData.map((company) => (
            <span key={company.symbol}>
              <span>
                &nbsp;
                {company.symbol}
              </span>
              <span className="green-color">
                &nbsp;${company.price}&nbsp;&nbsp;
              </span>
            </span>
          ))}
        </marquee>
      </div>
    );
  }
}

export default Marquee;
