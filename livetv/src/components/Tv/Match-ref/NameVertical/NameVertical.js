import React from "react";
import "./NameVertical.scss";
import "../../SportScss/Tenis.scss";

const NameVertical = (props) => {
  //    let sportClass = null;

  //    switch(props.sports)

  // }

  return (
    <div className="live-name-v">
      <div
        className="live-name-v__timer"
        style={{ display: props.spEvent.idSport === 3 ? "flex" : "none" }}
      >
        {`${props.spEvent.eventStatus?.c?.mtT.split(":")[0]}'`}
      </div>
      <div
        className={["live-name-v__team", `sport${props.spEvent.idSport}`].join(
          " "
        )}
      >
        <div>
          <div
            className={[
              "live-name-v__home",
              `sport${props.spEvent.idSport}`,
            ].join(" ")}
          >
            {props.spEvent.homeTeam}
          </div>
          <div
            className={[
              "live-name-v__away",
              `sport${props.spEvent.idSport}`,
            ].join(" ")}
          >
            {props.spEvent.awayTeam}
          </div>
        </div>
      </div>
      <div
        className={[
          "live-name-v__result",
          `sport${props.spEvent.idSport}`,
        ].join(" ")}
      >
        {props.children}
      </div>
    </div>
  );
};

export default NameVertical;
