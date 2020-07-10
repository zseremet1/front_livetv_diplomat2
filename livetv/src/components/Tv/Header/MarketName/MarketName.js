import React from "react";
import "./MarketName.scss";

import { useTranslation } from "react-i18next";

const MarketName = (props) => {
  const [t] = useTranslation();
  let text =
    props.nHead.length > 20 ? `${props.nHead.slice(0, 18)}...` : props.nHead;
    /*soccer-header translation*/
  if (props.id === 95) {
    text = t("soccer95")
  }
  if(props.id === 845)
  {
    text=t("soccer845")
  }
  if(props.id === 651)
  {
    text=t("soccer651")
  }
  if(props.id === 97)
  {
    text=t("soccer97")
  }
  if(props.id === 3)
  {
    text=t("soccer3")
  }

  /*tenis-header translation*/

  if(props.id === 170)
  {
    text=t("tenis170")
  }
  if(props.id === 831)
  {
    text=t("tenis831")
  }
  if(props.id === 832)
  {
    text=t("tenis832")
  }
  if(props.id === 666)
  {
    text=t("tenis666")
  }
  if(props.id === 174)
  {
    text=t("tenis174")
  }
  /*basketball-header translation*/
  if(props.id === 112)
  {
    text=t("basketball122");
  }
  if(props.id === 900)
  {
    text=t("basketball900");
  }
  if(props.id === 103)
  {
    text=t("basketball103")
    
  }
  if(props.id === 367)
  {
    text=t("basketball367")
  }
  if(props.id === 891)
  {
    text=t("baskteball891")
  }
  return (
    <div className={["column1", `sport${props.sportId}`].join(" ")}>
      <span className="position">{props.pozId}</span>

      <span className="word-header">{text}</span>
    </div>
  );
};

export default MarketName;
