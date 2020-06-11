import React from "react";
import { useLive } from "../../../hooks/useLive";
import MarketName from "../Header/MarketName";
import TextMarket from "../Header/TextMarket";
import './Header.scss';

const Header = (props) => {
  const [liveState, dispatch] = useLive(false);

  if (!liveState.markets) return null;
  const SportId = props.SportId || 2;
  const MarketObj = liveState.markets[SportId];

  const MarketVals = Object.values(MarketObj)
    .filter((m) => m.red === 1)
    .sort((m, a) => m.pozId - a.pozId);

  return (
    <div className="column">
        <span>Sifra</span>
        {/* <SlikaSporta SportId={SportId}/> */}
        {/* //TODO m zamjeni sa nekom punom riječi */}
      {MarketVals.map((m) => (
        <div key={m.id}>
          <MarketName {...m} />
          <TextMarket idtip={m.idtip} />
        </div>
      ))}
    </div>
  );
};

export default Header;
