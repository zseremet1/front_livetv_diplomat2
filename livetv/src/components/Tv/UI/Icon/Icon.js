import React from "react";
import "./Icon.scss";

const Icon = (props) => {
  let additionalElement;
  switch (props.name) {
    case "ico-card-red-double":
    case "ico-card-yellow-red":
      additionalElement = (
        <>
          <span className="path1"></span>
          <span className="path2"></span>
          <span className="path3"></span>
          <span className="path4"></span>
        </>
      );
      break;
    case "ico-st-waiting":
    case "ico-mt-basketball-bg":
    case "ico-mt-football-bg":
    case "ico-mt-tennis-bg":
    case "ico-mt-volleyball-bg":
      additionalElement = (
        <>
          <span className="path1"></span>
          <span className="path2"></span>
          <span className="path3"></span>
        </>
      );
      break;
    case "ico-mt-basketball":
    case "ico-mt-football":
    case "ico-mt-tennis":
    case "ico-mt-volleyball":
    case "ico-card-red":
    case "ico-card-yellow":
    case "ico-card-green":
    case "ico-cashout":
    case "ico-st-fail":
    case "ico-st-success":
    case "ico-tennis-serve":
      additionalElement = (
        <>
          <span className="path1"></span>
          <span className="path2"></span>
        </>
      );
      break;
    case " ":
      break;
    default:
      break;
  }
  return (
    <span onClick={props.clicked} className={props.name}>
      {additionalElement}
    </span>
  );
};

export default Icon;
