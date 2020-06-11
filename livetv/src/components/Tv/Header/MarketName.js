import React from "react";
import './MarketName.scss'
//TODO svaka komponenta u zasebni folder npr ova ide u folder MarketName zajedno sa njemin css failom
const MarketName = (props) => {
  return <div className="column1">{props.nHead}</div>;
};

export default MarketName;
