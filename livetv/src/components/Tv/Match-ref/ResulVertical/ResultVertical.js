import React from "react";
import "./ResultVertical.scss";
import CurrentServer from "./CurrentServer/CurrentServer";
import ResultGame from "./ResultGame/ResultGame";
import ResultPeriod from "./ResultPeriod/ResultPeriod";

const ResultVertical = (props) => {
  return (
    <div className="live-result-vertical">
      {props.eventStatus && props.eventStatus.hSc && props.eventStatus.aSc ? (
        <ResultPeriod
          mainPeriod={true}
          pSc={{ hSc: props.eventStatus.hSc, aSc: props.eventStatus.aSc }}
        ></ResultPeriod>
      ) : null}

      {props.eventStatus && props.eventStatus.cuSer ? (
        <CurrentServer current={props.eventStatus.cuSer} sportId={props.sport.ID} />
      ) : null}

      {props.eventStatus && props.eventStatus.hgSc ? (
        <ResultGame
          hgSc={props.eventStatus.hgSc}
          agSc={props.eventStatus.agSc}
        />
      ) : null}

      {props.eventStatus && props.eventStatus.pScs && props.eventStatus.pScs.pSc
        ? [
            ...props.eventStatus.pScs.pSc,
            ...[
              { num: 11 },
              { num: 12 },
              { num: 13 },
              { num: 14 },
              { num: 15 },
              { num: 16 },
            ],
          ]
            .slice(0, 6)
            .map((el) => {
              return (
                <ResultPeriod
                  // FIXX line
                   sportId={props.sport.ID}   /*puca ovdje */
                   key={el.num}
                  pSc={el}
                  current={
                    ~~props.eventStatus.mtSt === ~~el.mtStCo ? true : false
                  }
                />
              );
            })
        : null}
    </div>
  );
};

export default ResultVertical;
