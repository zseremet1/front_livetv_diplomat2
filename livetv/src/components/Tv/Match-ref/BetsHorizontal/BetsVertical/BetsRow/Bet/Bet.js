import React from "react";
import "./Bet.scss";

const Bet = (props) => {
  const { data, sport, market } = props;

  // formatiranje vrijednosti da uvijek ima 2 decimalna mjesta 
  const whole = parseInt(data.va);
  const rest = parseFloat(data.va) - whole;
  const value = `${whole}.${`${parseInt(rest * 100)}00`.slice(0, 2)}`;

  return <div className="Bet">{value}</div>;
};

export default Bet;
