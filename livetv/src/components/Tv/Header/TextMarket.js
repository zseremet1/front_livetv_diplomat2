import React from "react";
import { useLive } from "../../../hooks/useLive";

const TextMarket = (props) => {
  const [liveState, dispatch] = useLive(false);
  //TODO ovdje prvo odraditi split sa "," pa onda micati zagrade, ako slučajno u tipu ima zarez
 //TODO ja bi još ovo pridruživanje tipova i prijevoda ubacio u market prilikom liveFetch-a da nemoraš svaki render ovo raditi
 //     pa onda u ovoj komponenti nećeš zvati useLive nego prosljeđivati iz parent komponente market
 //TODO ovdje isto koristiti razumne nazive varijabli
    const engVal = liveState.possTyp[props.idtip].replace(/[\[\]]*/g,'').split(',');
    const prevod = engVal.map(v=>liveState.typTrans[v.trim()]);
    console.log(engVal,prevod);
  return <div className="text-market" >{prevod.map((r,ix)=><span key={ix}>{r}</span>)}</div>;
};

export default TextMarket;
