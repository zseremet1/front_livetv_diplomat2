import React from "react";
import "./Match.scss";
import Time from "./Time/Time";
import NameHorizontal from "./NameHorizontal/NameHorizontal";
import NameVertical from "./NameVertical/NameVertical";
import ResultHorisontal from "./ResultHorisontal/ResultHorisontal";
import ResultVertical from "./ResulVertical/ResultVertical";
import Code from "./Code/Code";
import BetsHorizontal from "./BetsHorizontal/BetsHorizontal";
// import Icon from "../UI/Icon/Icon";

const Match = (props) => {
  const mainClassName = ["live-match"];
  //console.log(props.spEvent);
  // console.log("MATCH::props length", JSON.stringify(props).length);
  // const matchExpandHandler = (idEvent) => {
  //   props.history.replace("/live/" + idEvent);
  // };

  const extraCode = [];
  if (props.spEvent.idSport === 2 || props.spEvent.idSport === 6) {
    extraCode.push("A");
  }

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
console.log("(props.spEvent.bets",props.spEvent.bets);
  // let cssFavorite = ["live-match__favorit"];
  // if (props.spEvent.favorite === true) {
  //   cssFavorite.push("active");
  // }

  return (
    <div
      className={["live-match__hov", props.sport.Name].join(" ")}
      title={props.spEvent.idEvent}
    >
      {/* <div className= "CodeRowComponent">41 </div> */}

      <div className={mainClassName.join(" ")}>
        <Code sif={props.spEvent.sifra} showExtra={extraCode} />
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
        <div className="live-match__name">
          {props.sport.horisontal ? (
            <Time
              idEvent={props.spEvent.idEvent}
              eventStatus={props.spEvent.eventStatus}
              time={props.spEvent.startTime ? props.spEvent.startTime : 0}
            />
          ) : (
            <NameVertical spEvent={props.spEvent}>
              <ResultVertical eventStatus={props.spEvent.eventStatus} />
            </NameVertical>
          )}

          {props.sport.horisontal ? (
            <NameHorizontal spEvent={props.spEvent}>
              {/* <Time
                idEvent={props.spEvent.idEvent}
                eventStatus={props.spEvent.eventStatus}
                time={props.spEvent.startTime ? props.spEvent.startTime : 0} /> */}
              <ResultHorisontal eventStatus={props.spEvent.eventStatus} />
            </NameHorizontal>
          ) : (
            <div className=""></div>
          )}
        </div>
        <div className="live-match__stream">
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
      />
    </div>
  );
};

export default Match;

const BetShort = (props) => <span></span>;
