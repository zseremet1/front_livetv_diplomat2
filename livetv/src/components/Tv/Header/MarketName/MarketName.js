import React from "react";
import "./MarketName.scss";
const MarketName = (props) => {
  return (
    <div className="column1">
      <span className="position">{props.pozId}</span>

      <span className="word-header">{props.nHead}</span>
    </div>
  );
};

export default MarketName;
