import React from "react";
import "./Code.scss";

const Code = (props) => {
  return (
    <div className={["Code", `sport${props.sportId}`].join(" ")}>
      <span className={["Codetxt", `sport${props.sportId}`].join(" ")}>
        {props.sif}
      </span>
      {props.showExtra.map((extraCode, index) => (
        <span
          key={index}
          className={["Codetxt", `sport${props.sportId}`].join(" ")}
        >
          {extraCode}
        </span>
      ))}
      {/* {props.showExtraC.map((extraCodec, index) => (
        <span
          key={index}
          className={["Codetxt", `sport${props.sportId}`].join(" ")}
        >
          {extraCodec}
        </span>
      ))} */}
    </div>
  );
};

export default Code;
