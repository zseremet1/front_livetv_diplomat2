import React from "react";
import "./ResultPeriod.scss";

const ResultPeriod = (props) => {
  let periodCss = ["live-result-period", `sport${props.sportId}`];
  periodCss.push("size20");
  let homeCss = ["live-result-period__val", `sport${props.sportId}`];
  let awayCss = ["live-result-period__val", `sport${props.sportId}`];
//coment
  if (props.mainPeriod) {
    periodCss.push("wmain");
  } else {
    periodCss.push("wstandard");

    if (props.pSc.hSc < props.pSc.aSc) {
      homeCss.push("wlost");
    }

    if (props.pSc.aSc < props.pSc.hSc) {
      awayCss.push("wlost");
    }

    if (props.current) {
      homeCss.push("wcurrent");
      awayCss.push("wcurrent");
    }
  }
  if ([18,6, 3, 25,20].includes(props.sportId) && props.isYellow) {
    homeCss.push("yellow");
    awayCss.push("yellow");
  }

  return (
    <div className={periodCss.join(" ")}>
      <div className={homeCss.join(" ")}>{props.pSc.hSc}&nbsp;</div>
      {/* <div className={[homeCss, `sport${props.sportId}`].join(" ")}>{props.pSc.hSc}&nbsp;</div>
      <div className={[awayCss, `sport${props.sportId}`].join(" ")}>{props.pSc.aSc}&nbsp;</div>  */}

      <div className={awayCss.join(" ")}>{props.pSc.aSc}&nbsp;</div>
    </div>
  );
};
export default ResultPeriod;
