import React from "react";
import { useLive } from "../../../hooks/useLive";

const TextMarket = (props) => {
  const [liveState, dispatch] = useLive(false);
    const engVal = liveState.possTyp[props.idtip].replace(/[\[\]]*/g,'').split(',');
    const prevod = engVal.map(v=>liveState.typTrans[v.trim()]);
    console.log(engVal,prevod);
  return <div className="text-market" >{prevod.map((r,ix)=><span key={ix}>{r}</span>)}</div>;
};

export default TextMarket;
