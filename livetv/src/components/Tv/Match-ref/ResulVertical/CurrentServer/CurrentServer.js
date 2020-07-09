import React from "react";
import "./CurrentServer.scss";
// import {Icon} from '../../../../UI';
// import Ball from "../Ball/Ball";

const CurrentServer = (props) => {
  return (
    <div className="live-current-server">
      <div className="live-current-server__icon">
        {props.current === "1" ? (
          <div name="ico-tennis-serve" className="ico-tennis-serve" />
        ) : null}{" "}
      </div>
      <div className="live-current-server__icon">
        {props.current === "2" ? (
          <div name="ico-tennis-serve" className="ico-tennis-serve" />
        ) : null}{" "}
      </div>
    </div>
  );
};
export default CurrentServer;
