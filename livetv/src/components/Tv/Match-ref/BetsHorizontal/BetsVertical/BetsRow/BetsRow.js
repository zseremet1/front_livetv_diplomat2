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

  // sredujemo spec
  let specBet;
  if (spec.length) {
    specBet = mapMarketSpecifier(market.nps, spec);
  }

  // ako specBet postoji dodajemo ga na pocetak reda
  if (specBet) {
    red.unshift(
      <div className="BetSpec" key={-1}>
        {specBet}
      </div>
    );
  }

  return    <div className={["BetsRow",sport.Name].join(" ")}>{red}</div>;
};

export default BetsRow;
