import React from "react";
import "./NameVertical.scss";

const NameHorisontal = (props) => {
  return (
    <div className="live-name-v">
      <div className="live-name-v__team">
        <div>
          <div className="live-name-v__home">{props.spEvent.homeTeam}</div>
          <div className="live-name-v__away">{props.spEvent.awayTeam}</div>
        </div>
      </div>
      <div className="live-name-v__result">{props.children}</div>
    </div>
  );
};

export default NameHorisontal;
