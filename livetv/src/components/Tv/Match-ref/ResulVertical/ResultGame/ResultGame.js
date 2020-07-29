import React from "react";
import "./ResultGame.scss";

const ResultGame = (props) => {

 

  return (
    <div className="live-result-game">
      <div className="live-result-game__item">
        {props.hgSc === "50" ? "AD" : props.hgSc}{" "}
      </div>
      <div className="live-result-game__item">
        {props.agSc === "50" ? "AD" : props.agSc}{" "}
      </div>
    </div>
  );
};

export default ResultGame;
