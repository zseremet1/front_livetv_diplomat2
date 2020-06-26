import React from "react";
import "./Ball.css";
import BallComponent from "./BallComponent/BallComponent";

const ball = (props) => {
  return (
    <div className="Ball">
      <BallComponent className="top" hasService={props.hasService.first} />
      <BallComponent className="bottom" hasService={props.hasService.second} />
    </div>
  );
};

export default ball;
