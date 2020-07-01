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

      redovi.push(
        <BetsRow
          red={red}
          sport={sport}
          market={market}
          key={index}
          spec={spec[index + 1]}
        />
      );
    }
  });

  return <div className={["BetsVertical" ,props.sport.Name].join(" ")}>{redovi}</div>;

};

export default BetsVertical;
