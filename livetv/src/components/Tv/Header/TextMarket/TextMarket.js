import React from "react";
import "./TextMarket.scss";

const TextMarket = (props) => {
  // + TODO ovdje prvo odraditi split sa "," pa onda micati zagrade, ako slučajno u tipu ima zarez
  // + TODO ja bi još ovo pridruživanje tipova i prijevoda ubacio u market prilikom liveFetch-a da nemoraš svaki render ovo raditi
  //     pa onda u ovoj komponenti nećeš zvati useLive nego prosljeđivati iz parent komponente market
  // + TODO ovdje isto koristiti razumne nazive varijabli
  let flexPadding = [2, 2, 2];
  const {
    market: { possTyp,pozId },
  } = props;
  switch (props.market.ids) {
    case 2:
      
        if (pozId === 2) {
          flexPadding.unshift(1);
         possTyp.unshift('')
        }
        if(pozId === 4 || pozId === 5)
        {
          flexPadding.unshift(2);
         possTyp.unshift('')
        }
     
      break;

    case 6:
      break;

    default:
      break;
  }
  return (
    <div className="text-market">
      {possTyp.map((tip, index) => (
        <span
          className="number-tips"
          key={index}
          style={{ flex: flexPadding[index] }}
        >
          {tip}
        </span>
      ))}
    </div>
  );
};

export default TextMarket;
