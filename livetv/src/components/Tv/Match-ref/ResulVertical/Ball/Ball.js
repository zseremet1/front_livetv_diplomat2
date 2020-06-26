import React from "react";
import "./Ball.scss";
import BallComponent from "./BallComponent/BallComponent";

const ball = (props) => {
  return (
    <div className="Ball">
      <BallComponent className="top" />
      <BallComponent className="bottom" />
    </div>
  );
};

export default ball;
