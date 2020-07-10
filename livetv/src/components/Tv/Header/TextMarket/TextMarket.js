import React from "react";
import "./TextMarket.scss";

const TextMarket = (props) => {
  const flexPadding = [2, 2, 2];
  const nps = props.market.nps;
  const possTyp = [...props.market.possTyp];
 



  if (nps) {
    flexPadding.unshift(2);
    possTyp.unshift(
      ""
   
    );
  } else if (possTyp.length === 2) {
    flexPadding.unshift(2);
    possTyp.unshift("");
  }
  return (
    <div className={["text-market", `sport${props.sportId}`].join(" ")}>
      {possTyp.map((tip, index) => (
        <span
          className={["number-tips", `sport${props.sportId}`].join(" ")}
          key={index}
          style={{ flex: flexPadding[index] }}
        >
          {/* <div className="texte">{props.nps}</div> */}

          {tip}
        </span>
      ))}
    </div>
  );
};

export default TextMarket;
