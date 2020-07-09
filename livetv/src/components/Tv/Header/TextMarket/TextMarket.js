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
      // nps
      //   .split("/")
      //   .map((n) => n.replace(/(\{\w.*\}\.)/g, ""))
      //   .join("-")
    );
  } else if (possTyp.length === 2) {
    flexPadding.unshift(2);
    possTyp.unshift("");
  }

  // if(props.market.nps)
  // {
  //   flexPadding.unshift(1);
  //   possTyp.unshift('')
  // }

  // switch (props.market.ids) {
  //   case 2:

  //       if (pozId === 2) {
  //         flexPadding.unshift(1);
  //        possTyp.unshift('')
  //       }
  //       if(pozId === 4 || pozId === 5)
  //       {
  //         flexPadding.unshift(2);
  //        possTyp.unshift('')
  //       }

  //     break;

  //   case 6:
  //     break;

  //   default:
  //     break;
  // }
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
