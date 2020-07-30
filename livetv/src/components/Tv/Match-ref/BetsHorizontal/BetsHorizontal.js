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
    //  console.log("BetsHorizontal", odd.id, odd);
    const { id, idBt, red, odds, spec, idmSt } = odd;
     if(idmSt !== 1 && idmSt !== 6) return;  //koment-nknd
    // if((idBt === 2 || idBt===97) && props.sport.ID === 2){
    //   console.log(props.sport.Name, props.spEvent.awayTeam,odd  )
    // }
    // console.log(MarketOrder, idBt)
    // const pozId = MarketOrder[red].indexOf(idBt) + 1;
    const pozId = Object.values(props.market).find((m) => m.id === idBt).pozId;
    // console.log()

    betsRows[red][pozId] = odds.map((odd) => ({
      ...odd,
      idBt,
      idmSt,
      idttt: id,
    }));
    specRows[red][pozId] = spec;
  });

  
  // console.log(props.market, betsRows);

  // console.log(props.sport.Name, props.spEvent.awayTeam,betsRows  )
  // console.log(MarketOrder)
  const show2nd = !props.sakrijDrugiRed;
  // if(props.sakrijDrugiRed){
  //   betsRows[2] = [];
  //   specRows[2] = [];
  // }
  const show3rd = !props.sakrijTreciRed;
  return (
    <div className="BetsHorizontal">
      {new Array(5).fill(0).map((_, index) => (
        <BetsVertical
          key={index}
          redovi={{
            1: betsRows[1][index + 1],
            2: show2nd ? betsRows[2][index + 1] : [],
            3: show3rd ? betsRows[3][index + 1] : [],
          }}
          market={[
            Object.values(props.market).find(
              (m) => m.id === betsRows[1][index + 1][0]?.idBt
            ),
            show2nd
              ? Object.values(props.market).find(
                  (m) => m.id === betsRows[2][index + 1][0]?.idBt
                )
              : [],
            show3rd
              ? Object.values(props.market).find(
                  (m) => m.id === betsRows[3][index + 1][0]?.idBt
                )
              : [],
          ]}
          sport={props.sport}
          spec={{
            1: specRows[1][index + 1],
            2: show2nd ? specRows[2][index + 1] : [],
            3: show3rd ? specRows[3][index + 1] : [],
          }}
        />
      ))}
    </div>
  );
};

export default BetsHorizontal;
