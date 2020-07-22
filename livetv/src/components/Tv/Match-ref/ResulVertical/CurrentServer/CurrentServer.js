import React from "react";
import "./CurrentServer.scss";
// import {Icon} from '../../../../UI';
// import Ball from "../Ball/Ball";

const CurrentServer = (props) => {
  let ballName = "";
  switch (props.sportId) {
    case 20:
      ballName = "ico-tennis-serve";
    // case ostali sportovi //
    case 6:
      ballName = "ico-voleyball-serve";
  }

  return (
    <div className="live-current-server">
      <div className="live-current-server__icon">
        {props.current === "1" ? (
          <div name={ballName} className={ballName} />
        ) : null}{" "}
      </div>
      <div className="live-current-server__icon">
        {props.current === "2" ? (
          <div name={ballName} className={ballName} />
        ) : null}{" "}
      </div>
    </div>
  );
};
export default CurrentServer;
