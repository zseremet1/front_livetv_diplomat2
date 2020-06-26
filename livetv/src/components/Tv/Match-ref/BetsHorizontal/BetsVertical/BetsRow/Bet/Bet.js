import React, { useState } from "react";
import "./Bet.scss";

const Bet = (props) => {
  const { data, sport, market } = props;
  const [prevVal, setPrevVal] = useState([0, 0, 0]);

  if (prevVal[1] !== 0 && Date.now() - prevVal[2] > 2000) {
    setPrevVal([data.va, 0, 0]);
  }

  if (prevVal[0] !== data.va) {
    let flag = 0;
    if (prevVal[0] !== 0) {
      if (prevVal[0] < data.va) {
        flag = 1;
      } else {
        // if(prevVal[0]>data.va){
        flag = -1;
      }
    }
    setPrevVal([data.va, flag, Date.now()]);
  }
  // formatiranje vrijednosti da uvijek ima 2 decimalna mjesta
  const whole = parseInt(data.va);
  const rest = parseFloat(data.va) - whole;
  const value = `${whole}.${`${parseInt(rest * 100)}00`.slice(0, 2)}`;

  const classList = ["Bet"];

  if (prevVal[1] === -1) classList.push("redArrow");
  else if (prevVal[1] === 1) {
    classList.push("greenArrow");
  }

  if (data.idmSt === 6) {
    classList.push("grey");
  } else if (data.idmSt !== 1) {
    classList.push("hide");
  }

  return <div className={classList.join(" ")}>{value}</div>;
};

export default Bet;
