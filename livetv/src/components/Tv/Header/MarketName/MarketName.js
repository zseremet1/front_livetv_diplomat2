import React from "react";
import "./MarketName.scss";

import { useTranslation } from "react-i18next";

const MarketName = (props) => {
  const [] = useTranslation();
  let text =
    props.nHead.length > 25 ? `${props.nHead.slice(0, 22)}...` : props.nHead;
  /*soccer-header translation*/

   text= (props.nHead);

  return (
    <div className={["column1", `sport${props.sportId}`].join(" ")}>
      <span className="position">{props.pozId}</span>

      <span className="word-header">{text}</span>
    </div>
  );
};

export default MarketName;
