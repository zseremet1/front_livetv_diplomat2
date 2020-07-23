import React from "react";
import "./NameHorizontal.scss";

const NameHorisontal = (props) => {
  // const {
  //   spEvent: {
  //     idSport,
  //     eventStatus: { mtSt },
  //   },
  // } = props;

  const drugoPoluvrijeme = props.drugoPoluvrijeme;

  return (
    <>
      <div className="live-name-h">
        <div className="live-name-h__home">{props.spEvent.homeTeam}</div>
        <div className="live-name-h__result">{props.children}</div>
        <div className="live-name-h__away">{props.spEvent.awayTeam}</div>
      </div>
      {drugoPoluvrijeme}
    </>
  );
};

export default NameHorisontal;
