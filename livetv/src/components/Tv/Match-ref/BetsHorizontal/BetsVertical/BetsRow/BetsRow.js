import React from "react";
import "./BetsRow.scss";
import Bet from "./Bet/Bet";
import { mapMarketSpecifier } from "../../../../../../hooks/functions/mapMarketSpecifier";
import { useTranslation } from "react-i18next";

const BetsRow = (props) => {
  const [t] = useTranslation();

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
  let specVal = spec.length
    ? Object.fromEntries(spec.split("|").map((x) => x.split("=")))
    : {};

  /*nogomet*/
  if (market.id === 651) {
    specBet = t("ngol", { n: specVal.goalnr });
  } else if (market.id === 652) {
    specBet = t("ngol", { n: specVal.goalnr });
  }
  /*tenis*/
  if (market.id === 831) {
    specBet = t("tenis2", {
      n: specVal.gamenrX,
      m: specVal.gamenrY,
      Q: specVal.setnr,
    });
   
  }
  if (market.id === 832) {
    specBet = t("tenis3", {
      n: specVal.gamenr,
      Q: specVal.setnr,
    });
  }

  if (market.id === 666) {
    specBet = t("tenis4", {
      n: specVal.total,
      Q: specVal.setnr,
    });
  }



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
