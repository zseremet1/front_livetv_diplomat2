import React from "react";
import "./BetsRow.scss";
import Bet from "./Bet/Bet";
import { mapMarketSpecifier } from "../../../../../../hooks/functions/mapMarketSpecifier";
import { useTranslation } from "react-i18next";
import { func } from "prop-types";

const BetsRow = (props) => {
  const [t] = useTranslation();

  const { red: redData, sport, market, spec } = props;

  // generisemo red

  //vrte se svi mogući tipovi i pune kvote za taj tip
  //ako nema kvote za taj tip puni se prazna kućica
  const red = new Array(market.possTypEng.length)
    .fill(0)
    .map((_, ix) => <PraznaKucica key={ix} sport={sport} />);
  redData.forEach((data, index) => {
    const inx = market.possTypEng.indexOf(data.t);
    if (inx !== -1) {
      red[inx] = <Bet key={index} data={data} sport={sport} market={market} />;
    }
  });

  //1 x 2 prvo vrtiti tipove iz marketa ,onda unutar njega kvote puniti koje ima , ako je nadje stavlja se kvota ako ne onda prazna
  //
  //generisemo red
  //   const red = redData.map((red, index) => {
  // // ovo nikako koristiti => ovaj if =>  if(props.sport.ID === 2 && props.market.id === 2 && red.t === 'X') return null;
  //    return <Bet key={index} data={red} sport={sport} market={market} />
  //  }).filter(x=>Boolean(x));

  // sredujemo spec
  let specBet;
  // let specVal = spec.length
  //   ? Object.fromEntries(spec.split("|").map((x) => x.split("=")))
  //   : {};

  // odds = props.market.typs.map((typsItem) => {
  //   // const keyTip = Object.keys(typsItem)[0];
  //   indOdd = props.bet.odds.findIndex(
  //     (betItem) => betItem.t === Object.keys(typsItem)[0] });

  if (spec.length && !specBet) {
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
        <div className="bet-spec-value"> {specBet}</div>
      </div>
    );
  } else if (red.length === 2) {
    red.unshift(<PraznaKucica sport={sport} key={-3} />);
  }
  // console.log("red", red);

  return <div className={["BetsRow", `sport${sport.ID}`].join(" ")}>{red}</div>;
};

export default BetsRow;

function PraznaKucica(props) {
  return (
    <div
      className={["Bet", props.sport.ID].join(" ")}
      style={{ backgroundColor: "transparent" }}
    >&nbsp;</div>
  );
}
