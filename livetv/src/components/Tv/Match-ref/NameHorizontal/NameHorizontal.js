import React from "react";
import "./NameHorizontal.scss";

import { useTranslation } from "react-i18next";

const NameHorisontal = (props) => {
  const [t] = useTranslation();
  let drugoPoluvrijeme = null;
  const {
    spEvent: {
      idSport,
      eventStatus: { mtSt },
    },
  } = props;

  if (idSport === 2 && mtSt === 6) {
    drugoPoluvrijeme = (
      <span
        style={{
          textAlign: "right",
          display: "block",
          color: "#fff",
          paddingRight: "1rem",
        }}
      >
        {t("1.Poluvrijeme", { n: 1 })}
      </span>
    );
  } else if (idSport === 2 && mtSt === 0) {
    drugoPoluvrijeme = <div />;
  }
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
