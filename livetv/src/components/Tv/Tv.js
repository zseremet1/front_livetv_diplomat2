import React from "react";
import { useLive } from "../../hooks/useLive";
import Header from "./Header/Header";
import Match from "./Match-ref/Match";

//import hook for translate
import { useTranslation } from "react-i18next";

const Tv = (props) => {
  const [liveState] = useLive();

  //initialize hook for translate
  const { t } = useTranslation();
  //example translate
  console.log("primjer1", t("title"));
  console.log("primjer1", t("example1", { name: "Stanko" }));

  const { spEvents = [], sports } = liveState;

  if ((sports && sports.length === 0) || !sports) return null;

  const eventsBySport = {};

  spEvents.forEach((ev) => {
    //  if (Object.keys(ev.eventStatus).length === 2 ) return ;
    if (!eventsBySport[ev.idSport]) {
      eventsBySport[ev.idSport] = [];
    }
    eventsBySport[ev.idSport].push(ev);
  });

  console.log("liveState", liveState);
  return (
    <div className="App">
      {Object.keys(eventsBySport).map((idSport) => {
        return (
          <React.Fragment key={idSport}>
            <Header SportId={idSport} />
            {eventsBySport[idSport].map((event) => (
              <Match
                key={event.idEvent}
                spEvent={event}
                sport={sports.find((sport) => sport.ID === event.idSport)}
                market={liveState.markets[event.idSport]}
              />
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Tv;
