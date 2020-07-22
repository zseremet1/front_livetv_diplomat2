import React, { useState } from "react";
import "./Bet.scss";
import RedArrow from "./Arrows/RedArrow";
import GreenArrow from "./Arrows/GreenArrow";
import Ico from "../../../../../UI/Icon/Icon";

const Bet = (props) => {
  const { data /* sport, market*/ } = props;
  const [prevVal, setPrevVal] = useState([0, 0, 0]);

  if (prevVal[1] !== 0 && Date.now() - prevVal[2] > 2000) {
    setPrevVal([data.va, 0, 0]);
  }

  if (prevVal[0] !== data.va) {
    let flag = 0;
    if (prevVal[0] !== 0) {
      if (prevVal[0] < data.va) {
        flag = 1;
      } //{
      else if (prevVal[0] > data.va) {
        flag = -1;
      }
    }
    setTimeout(setPrevVal, 2000, [data.va, 0, 0]);
    setPrevVal([data.va, flag]);
  }
  // formatiranje vrijednosti da uvijek ima 2 decimalna mjesta
  // const whole = parseInt(data.va);
  // const rest = parseFloat(data.va) - whole;
  const value = Number(data.va).toFixed(2); // `${whole}.${`${parseInt(rest * 100)}00`.slice(0, 2)}`;

  const classList = ["Bet"];
  let arrow = null;

  if (prevVal[1] === -1) arrow = <Ico name="ico-tri-down" />;
  else if (prevVal[1] === 1) {
    arrow = <Ico name=" ico-tri-up" />;
  }

  if (data.idmSt === 6) {
    classList.push("yellow");
    // FIXX line
  } else if (data.idmSt !== 1) {
    classList.push("hide");
  }

  if (parseFloat(data.va) === 1) {
    classList.push("hide");
  }

  return (
    <div className={classList.join(" ")}>
      <div className="bet-odd-value">
        {arrow}
        {value}
      </div>
    </div>
  );
};

export default Bet;
