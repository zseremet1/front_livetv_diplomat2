import React from "react";
import "./BetsRow.scss";
import Bet from "./Bet/Bet";
import { mapMarketSpecifier } from "../../../../../../hooks/functions/mapMarketSpecifier";

const BetsRow = (props) => {
  const { red: redData, sport, market, spec } = props;

  // generisemo red
  const red = redData.map((red, index) => (
    <Bet key={index} data={red} sport={sport} market={market} />
  ));

  //generisemo red
  //   const red = redData.map((red, index) => {
  // //  if(props.sport.ID === 2 && props.market.id === 2 && red.t === 'X') return null;
  //    return <Bet key={index} data={red} sport={sport} market={market} />
  //  }).filter(x=>Boolean(x));

  // sredujemo spec
  let specBet;
  if (spec.length) {
    specBet = mapMarketSpecifier(market.nps, spec);
  }
  // if(sport.ID === 6 && red === 1)
  // {
  //   return <div className="testnaklasa">{red}</div>
  // }
  // ako specBet postoji dodajemo ga na pocetak reda
  if (specBet) {
    red.unshift(
      <div className="BetSpec" key={-1}>
        {specBet}
      </div>
    );
  } else if (red.length === 2) {
    red.unshift(
      <div
        key={-2}
        className={["Bet", sport.ID].join(" ")}
        style={{ backgroundColor: "transparent" }}
      />
    );
  }
  // console.log("red", red);

  return <div className={["BetsRow", `sport${sport.ID}`].join(" ")}>{red}</div>;
};

export default BetsRow;
