import React from "react";
import { useLive } from "../../../hooks/useLive";
import MarketName from "./MarketName/MarketName";
import TextMarket from "./TextMarket/TextMarket";
import "./Header.scss";

const Header = (props) => {
  const [liveState, dispatch] = useLive(false);

  if (!liveState.markets) return null;
  const SportId = props.SportId || 6;
  const MarketObj = liveState.markets[SportId];

  const MarketVals = Object.values(MarketObj)
    .filter((market) => market.red === 1)
    .sort((market1, market2) => market1.pozId - market2.pozId);
  // .map(market=>({...market, possTypes: liveState.possTyp[market.idtip]}))

  return (
    <div className="column">
      <span className="code">Šifra</span>
      <span className="header-image" />
      {MarketVals.map((market) => (
        <div key={market.id}>
          <MarketName {...market} />
          <TextMarket idtip={market.idtip} market={market} />
        </div>
      ))}
    </div>
  );
};

export default Header;
