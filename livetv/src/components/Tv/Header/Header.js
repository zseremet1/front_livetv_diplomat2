import React from "react";
import { useLive } from "../../../hooks/useLive";
import MarketName from "./MarketName/MarketName";
import TextMarket from "./TextMarket/TextMarket";
import SportIcon from "../UI/Icon/SportIcon";
import "./Header.scss";
import { useTranslation } from "react-i18next";

const Header = (props) => {
  const [liveState, dispatch] = useLive(false);

  const [t] = useTranslation();

  const sport = liveState.sports.find(
    (sport) => sport.ID === Number(props.SportId)
  );

  if (!liveState.markets) return null;
  const SportId = props.SportId;
  const MarketObj = liveState.markets[SportId];
  if (!MarketObj) return null;

  const MarketVals = Object.values(MarketObj)
    .filter((market) => market.red === 1)
    // .sort((market1, market2)=> market2.red - market1.red )
    .sort((market1, market2) => market1.pozId - market2.pozId)
    .map((market) => ({
      ...market,
      possTypes: liveState.possTyp[market.idtip],
    }));

  return (
    <div className={["column", `sport${sport.ID}`].join(" ")}>
      <span className={["code", `sport${sport.ID}`].join(" ")}>
        {t("Šifra")}
      </span>
      {/* <span className={["SportIcon", `sport${sport.ID}`].join(" ")} /> */}
      <span className={["headerImage", `sport${sport.ID}`].join(" ")}>
        <SportIcon idSport={sport.ID} />
        <p className={["header-Name", `sport${sport.ID}`].join(" ")}>
          {sport.Name}
        </p>
      </span>

      {MarketVals.slice(0, 5).map((market) => (
        <div className="column-sport" key={market.id}>
          <MarketName {...market} sportId={sport.ID} />
          <TextMarket idtip={market.idtip} market={market} sportId={sport.ID} />
        </div>
      ))}
    </div>
  );
};

export default Header;
