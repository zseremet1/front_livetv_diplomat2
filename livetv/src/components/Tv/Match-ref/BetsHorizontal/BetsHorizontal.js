import React from "react";
import "./BetsHorizontal.scss";
import BetsVertical from "./BetsVertical/BetsVertical";

const BetsHorizontal = (props) => {
  // Spremamo odds iz oklada na osnovu pozicije
  const betsRows = {
    1: [],
    2: [],
    3: [],
  };

  const specRows = {
    1: [],
    2: [],
    3: [],
  };

  // Punimo sa praznim nizovima u slucaju da neke pozicije ne bude
  for (let i = 1; i <= 5; i++) {
    betsRows[1][i] = [];
    betsRows[2][i] = [];
    betsRows[3][i] = [];

    specRows[1][i] = [];
    specRows[2][i] = [];
    specRows[3][i] = [];
  }

  // izvlacimo redoslijd na osnovu idBt koji smo koristili u headeru
  const MarketOrder = Object.values(props.market)
    .filter((market) => market.red === 1)
    .sort((market1, market2) => market1.pozId - market2.pozId)
    .map((market) => market.id);

  // Rasporedjujemo oklade u betRows na osnovu reda i pozicije
  const { bets } = props.spEvent;
  Object.values(bets).forEach((odd) => {
    const { idBt, red, odds, spec, idmSt } = odd;
    // if(idmSt !== 1 && idmSt !== 6) return;
    betsRows[red][MarketOrder.indexOf(idBt) + 1] = odds.map((odd) => ({
      ...odd,
      idmSt,
    }));
    specRows[red][MarketOrder.indexOf(idBt) + 1] = spec;
  });

  return (
    <div className="BetsHorizontal">
      {MarketOrder.map((order, index) => (
        <BetsVertical
          key={order}
          redovi={{
            1: betsRows[1][index + 1],
            2: betsRows[2][index + 1],
            3: betsRows[3][index + 1],
          }}
          market={props.market[MarketOrder[index]]}
          sport={props.sport}
          spec={{
            1: specRows[1][index + 1],
            2: specRows[2][index + 1],
            3: specRows[3][index + 1],
          }}
        />
      ))}
    </div>
  );
};

export default BetsHorizontal;
