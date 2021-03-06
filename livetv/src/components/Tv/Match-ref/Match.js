import React, { useState } from "react";
import "./Match.scss";
import Time from "./Time/Time";
import NameHorizontal from "./NameHorizontal/NameHorizontal";
import NameVertical from "./NameVertical/NameVertical";
import ResultHorisontal from "./ResultHorisontal/ResultHorisontal";
import ResultVertical from "./ResulVertical/ResultVertical";
// import ResultPeriod from "./ResulVertical/ResultPeriod/ResultPeriod";
import Code from "./Code/Code";
import BetsHorizontal from "./BetsHorizontal/BetsHorizontal";
// import Icon from "../UI/Icon/Icon";

import { useTranslation } from "react-i18next";

const Match = (props) => {
  const [t] = useTranslation();
  const [result, setResult] = useState({ hSc: null, aSc: null, goal: 0 });
  if([2,3].includes(props.sport.ID) && !props.spEvent.eventStatus.c) return null;
  //SPORT 2,3 ako nema c onda ga ne postavljaj

  if (result.hsc === null || result.aSc === null) {
    setResult({
      aSc: props.spEvent.eventStatus.aSc,
      hSc: props.spEvent.eventStatus.hSc,
      goal: 0,
    });
  }
  if (
    result.hSc !== null &&
    (props.spEvent.eventStatus.aSc !== result.aSc ||
      props.spEvent.eventStatus.hSc !== result.hSc)
  ) {
    setTimeout(() => {
      setResult({
        aSc: props.spEvent.eventStatus.aSc,
        hSc: props.spEvent.eventStatus.hSc,
        goal: 0,
      });
    }, 5 * 1000);

    setResult({
      aSc: props.spEvent.eventStatus.aSc,
      hSc: props.spEvent.eventStatus.hSc,
      goal: Date.now() + 1000 * 5,
    });
  }
  const mainClassName = ["live-match"];

  if (Date.now() - result.goal < 0 && props.sport.ID === 2) {
    mainClassName.push("gool");
  }

  //console.log(props.spEvent);
  // console.log("MATCH::props length", JSON.stringify(props).length);
  // const matchExpandHandler = (idEvent) => {
  //   props.history.replace("/live/" + idEvent);
  // };

  const extraCode = [];
  // const extraCodes = [];
  if (
    // props.spEvent.idSport === 2 ||
    props.spEvent.idSport === 6 ||
    // props.spEvent.idSport === 2 ||
    props.spEvent.idSport === 3 ||
    props.spEvent.idSport === 20 ||
    props.spEvent.idSport === 5 ||
    props.spEvent.idSport === 25 || 
    props.spEvent.idSport === 18 
  ) {
    extraCode.push("A");
  }
  // if (props.spEvent.idSport === 3) {
  //   extraCode.push("B");
  // }

  let firstBet;
  let secndBet;
  if (props.spEvent.bets) {
    Object.keys(props.spEvent.bets).forEach((idBet) => {
      if (
        props.firstMarket &&
        props.firstMarket.id === props.spEvent.bets[idBet].idBt
      ) {
        firstBet = props.spEvent.bets[idBet];
      }

      if (
        props.secondMarket &&
        props.secondMarket.id === props.spEvent.bets[idBet].idBt &&
        props.spEvent.bets[idBet].fav === 1
      ) {
        secndBet = props.spEvent.bets[idBet];
      }
    });
  }
  // console.log("(props.spEvent.bets",props.spEvent.bets);
  // let cssFavorite = ["live-match__favorit"];
  // if (props.spEvent.favorite === true) {
  //   cssFavorite.push("active");
  // }

  let drugoPoluvrijeme = null;
  let baskteballtrecired = null;
  // if(props.sport.ID === 2 && props.spEvent.eventStatus.mtSt == 7){
  //   extraCode.push("A")
  // } else
  if (props.sport.ID === 2 && props.spEvent.eventStatus.mtSt === 6) {
    drugoPoluvrijeme = (
      <span
        style={{
          textAlign: "right",
          display: "block",
          color: "#fff",
          paddingRight: "1rem",
          fontSize : "0.85vw"

        }}
      >
        {t("1.Poluvrijeme", { n: 1 })}
      </span>
    );
    extraCode.push("A");
  } else if (props.sport.ID === 2 && props.spEvent.eventStatus.mtSt === 0) {
    drugoPoluvrijeme = <div />;
    extraCode.length = 0;
  }
  // else if (props.sport.ID === 3 && props.spEvent.eventStatus.mtSt === 0)
  // {
  //   baskteballtrecired = <div/>
  //   extraCode.length = 0;
  // }
  /*kosarka */
  if (props.sport.ID === 3 && props.spEvent.eventStatus.mtSt === 13) {
    baskteballtrecired = null;
    extraCode.push("B");
    //  (
    //   <span
    //     style={{
    //       textAlign: "right",
    //       display: "block",
    //       color: "#fff",
    //       paddingRight: "1rem",
    //     }}
    //   ></span>
    // );
  } else if (props.sport.ID === 3 && props.spEvent.eventStatus.mtSt === 0) {
    baskteballtrecired = null; // <div />;
    extraCode.length = 1;
  }
  return (
    <div
      className={["live-match__hov", `sport${props.sport.ID}`].join(" ")}
      title={props.spEvent.idEvent}
    >
      {/* <div className= "CodeRowComponent">41 </div> */}

      <div className={mainClassName.join(" ")}>
        <Code
          sif={props.spEvent.sifra}
          showExtra={extraCode}
          // showExtraC={extraCodes}
          sportId={props.sport.ID}
        />
        {/* <Time
          idEvent={props.spEvent.idEvent}
          eventStatus={props.spEvent.eventStatus}
          time={props.spEvent.startTime ? props.spEvent.startTime : 0}
        /> */}

        {/* <div
          className={cssFavorite.join(" ")}
          // onClick={() => props.clickedFavorite(props.spEvent.idEvent)}
        > */}
        {/* {props.spEvent.favorite === true ? (
            <Icon name="ico-star-fill"></Icon>
          ) : (
            <Icon name="ico-star-outline"></Icon>
          )} */}
        {/* </div> */}

        <div
          className={["live-match__name", `sport${props.sport.ID}`].join(" ")}
        >
          {props.sport.horisontal ? (
            <Time
              idEvent={props.spEvent.idEvent}
              eventStatus={props.spEvent.eventStatus}
              time={props.spEvent.startTime ? props.spEvent.startTime : 0}
              sportId={props.sport.ID}
            />
          ) : (
            <NameVertical
              spEvent={props.spEvent}
              baskteballtrecired={baskteballtrecired}
            >
              <ResultVertical
                eventStatus={props.spEvent.eventStatus}
                sport={props.sport}
              />
              {/* <ResultPeriod eventStatus={props.spEvent.eventStatus} sport={props.sport}/> */}
            </NameVertical>
          )}

          {props.sport.horisontal ? (
            <NameHorizontal
              spEvent={props.spEvent}
              drugoPoluvrijeme={drugoPoluvrijeme}
            >
              {/* <Time
                idEvent={props.spEvent.idEvent}
                eventStatus={props.spEvent.eventStatus}
                time={props.spEvent.startTime ? props.spEvent.startTime : 0} /> */}
              <ResultHorisontal eventStatus={props.spEvent.eventStatus} />
            </NameHorizontal>
          ) : (
            <div />
          )}
        </div>
        <div
          className={["live-match__stream", `sport${props.sport.ID}`].join(" ")}
        >
          {props.spEvent.eventStatus ? (
            <div>
              <span className="live-match__status">
                {props.spEvent.eventStatus.st}
              </span>
            </div>
          ) : null}
        </div>
        <div className="live-match__odd">
          <BetShort
            internalBetStop={
              //ako je vece 0 internal status se brise ako je 2
              ~~props.spEvent.event_int_status > 0 ? true : false
            }
            bet={firstBet}
            order={1}
            idEvent={props.spEvent.idEvent}
            idSport={props.sport.ID}
            market={props.firstMarket}
            betNumber={props.sif}
          />
          <BetShort
            internalBetStop={
              ~~props.spEvent.event_int_status > 0 ? true : false
            }
            bet={secndBet}
            order={2}
            idEvent={props.spEvent.idEvent}
            idSport={props.sport.ID}
            market={props.secondMarket}
            betNumber={props.sif}
          />
        </div>
        <div
          className="live-match__count-bet"
          // onClick={() => {
          //   matchExpandHandler(props.spEvent.idEvent);
          // }}
        >
          {props.spEvent.countBets && props.spEvent.countBets > 0
            ? "+" + props.spEvent.countBets
            : null}
        </div>
      </div>
      <BetsHorizontal
        spEvent={props.spEvent}
        sport={props.sport}
        market={props.market}
        sakrijDrugiRed={extraCode.length === 0}
        sakrijTreciRed={extraCode.length === 1}
      />
    </div>
  );
};

export default Match;

const BetShort = (props) => <span></span>;
