import React from "react";
import "./BetsVertical.scss";
import BetsRow from "./BetsRow/BetsRow";

const BetsVertical = (props) => {
  const { market, redovi: redoviData, sport, spec } = props;
  const redovi = [];

  // prolazimo kroz svaki red
  Object.values(redoviData).forEach((red, index) => {
    // ako u redu ima vrijednosti, dodaj taj red
    if (red.length) {
      if (red[0]?.id === 0)  { //provjera ako je prazan red dodati prazne kucice
        redovi.push(
          <BetsRow
            red={[]}
            sport={sport}
            market={market[index]}
            key={index}
            spec={spec[index +1 ]}
          />
        );
      } else {
        redovi.push(
          <BetsRow
            red={red}
            sport={sport}
            market={market[index]}
            key={index}
            spec={spec[index + 1]}
          />
        );
      }
      }
      // if (redovi.length === 1 && red.length && index !== 0) {
      //   spec.unshift(
      //     <div
      //       key={-3}
      //       className={["BetsRow", `sport${props.sport.ID}`].join("")}
      //     />
      //   );
      // }
    

    
    if (redovi.length === 1  && red.length && index !== 0) {
      redovi.unshift(
        <div
          key={-2}
          className={["BetsRow", `sport${props.sport.ID}`].join("")}
          spec=""
        />
      );
    }
  });
  return (
    <div className={["BetsVertical", `sport${props.sport.ID}`].join(" ")}>
      {redovi}
    </div>
  );
};

export default BetsVertical;
