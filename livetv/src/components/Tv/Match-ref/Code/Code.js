import React from "react";
import "./Code.scss";

const Code = (props) => {
  return (
    <div className="Code">
      <span className={["Codetxt"].join(" ")}>{props.sif}</span>
      {props.showExtra.map((extraCode, index) => (
        <span key={index} className={["Codetxt"].join(" ")}>
          {extraCode}
        </span>
      ))}
    </div>
  );
};

export default Code;
