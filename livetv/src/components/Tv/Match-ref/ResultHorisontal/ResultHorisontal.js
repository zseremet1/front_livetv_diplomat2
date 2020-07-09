import React from "react";
import "./ResultHorisontal.scss";
// import { Icon } from "../../../UI";

const ResultHorisontal = (props) => {
  let HomeRedCard = null;
  let AwayRedCard = null;
  if (props.eventStatus && props.eventStatus.stat) {
    let countHomeRedCard =
      props.eventStatus.stat.rCa.h + props.eventStatus.stat.yrCa.h;
    if (countHomeRedCard > 0) {
      HomeRedCard = <div className="ico-card-red" />;
      if (countHomeRedCard > 1) {
        HomeRedCard = <div className="ico-card-red-double" />;
      }
    }

    let countAwayRedCard =
      props.eventStatus.stat.rCa.a + props.eventStatus.stat.yrCa.a;
    if (countAwayRedCard > 0) {
      AwayRedCard = <div className="ico-card-red" />;
      if (countAwayRedCard > 1) {
        AwayRedCard = <div className="ico-card-red-double" />;
      }
    }
  }

  return (
    <>
      {props.eventStatus && props.eventStatus.hSc && props.eventStatus.aSc ? (
        <>
          <div className="live-result-h__red">{HomeRedCard}</div>
          <div className="live-result-h__val">{props.eventStatus.hSc}</div>
          <div className="live-result-h__dot">:</div>
          <div className="live-result-h__val">{props.eventStatus.aSc}</div>
          <div className="live-result-h__red">{AwayRedCard}</div>
        </>
      ) : null}
    </>
  );
};
export default ResultHorisontal;
