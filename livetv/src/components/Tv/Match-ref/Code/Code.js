import React from "react";
import "./Code.scss";

const Code = (props) => {
  return (
    <div className="Code">
      <span className="Codetxt">{props.sif}</span>
      {props.showExtra.map((extraCode, index) => (
        <span key={index} className="Codetxt">
          {extraCode}
        </span>
      ))}
    </div>
  );
};

export default Code;
