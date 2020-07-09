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

  // postavljamo redoslijed marketa u rowu
  const MarketOrder = new Array(4).fill([]).map((r) => new Array(5).fill(null));
  Object.values(props.market).forEach((m) => {
    MarketOrder[m.red][m.pozId - 1] = m.id;
  });

  // Rasporedjujemo oklade u betRows na osnovu reda i pozicije
  const { bets } = props.spEvent;
  Object.values(bets).forEach((odd) => {
    const { idBt, red, odds, spec, idmSt } = odd;
    //  if(idmSt !== 1 && idmSt !== 6) return;  //koment-nknd
    // if((idBt === 2 || idBt===97) && props.sport.ID === 2){
    //   console.log(props.sport.Name, props.spEvent.awayTeam,odd  )
    // }
    // console.log(MarketOrder, idBt)

    betsRows[red][MarketOrder[red].indexOf(idBt) + 1] = odds.map((odd) => ({
      ...odd,
      idmSt,
    }));
    specRows[red][MarketOrder[red].indexOf(idBt) + 1] = spec;
  });

  // console.log(props.sport.Name, props.spEvent.awayTeam,betsRows  )
  // console.log(MarketOrder)
  return (
    <div className="BetsHorizontal">
      {new Array(5).fill(0).map((_, index) => (
        <BetsVertical
          key={index}
          redovi={{
            1: betsRows[1][index + 1],
            2: betsRows[2][index + 1],
            3: betsRows[3][index + 1],
          }}
          market={[
            props.market[MarketOrder[1][index]],
            props.market[MarketOrder[2][index]],
            props.market[MarketOrder[3][index]],
          ]}
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
