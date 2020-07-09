import React from "react";
import "./MarketName.scss";
const MarketName = (props) => {
  const text =
    props.nHead.length > 20 ? `${props.nHead.slice(0, 17)}...` : props.nHead;
  return (
    <div className={["column1", `sport${props.sportId}`].join(" ")}>
      <span className="position">{props.pozId}</span>

      <span className="word-header">{text}</span>
    </div>
  );
};

export default MarketName;
