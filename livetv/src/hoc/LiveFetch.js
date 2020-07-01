import React, { useEffect, useState } from "react";
import axios from "./axios-live";
import { useLive } from "../hooks/useLive";
import { useInterval } from "../hooks/custom/useInterval";
import { actionTypes, sports, staticLive } from "../hooks/actions";
import { act } from "react-dom/test-utils";

const LiveFetch = (props) => {
  const [liveState, dispatch] = useLive(false);
  const [delay, setDelay] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [counterMsg, setCounterMsg] = useState({
    t1: 0,
    t2: 0,
  });

  useInterval(
    () => {
      loadNewData();
    },
    isRunning ? delay : null
  );

  useEffect(() => {
    sports();
    staticLive();

    //TODO zamjeniti sa staticContetnt for LiveTV
    axios
      .get("staticContentTV?key=hr") //1static dohvatiti //oklade ,tipovi , prijevodi,  zbroj golova pobjeda meca itd
      .then((response) => {
        let returnSports; // = response.data;
        const headMarkets = [];
        const markets = {};
        console.log("staticContentTV", response.data);
        // dispatch(actionTypes.ADD_STATIC_LIVE, {
        //     head: headMarkets,
        //     all: markets,
        //     sports: response.data.sports,
        //   });

        const { data } = response;
        dispatch(actionTypes.ADD_STATIC_LIVE, {
          sports: data.sports,
          all: data.markets,
          head: headMarkets,
          possTyp: data.possTyp,
          typTrans: data.typTrans,
        });

        getEvents();
      })
      .catch((err) => {
        console.error(2000, err);
        //TODO try again, bez ovoga nema ništa
      });

    const getEvents = () => {
      //TODO ubaciti events url for LiveTV, ubaciti odgovarajući jezik
      //treba dohvatiti trenutno stanje na live odma sto treba prikazati aktivni
      axios
        .get("tvEvents?key=hr")
        .then((response) => {
          //dispatch - punjenje u global state
          console.log("tvEvents", response.data);

          if (response.data.t1 || response.data.t2) {
            setCounterMsg({
              t1: response.data.t1,
              t2: response.data.t2,
            });
          }

          setIsRunning(true);
          // console.log("LiveFetch1.js");

          const { data } = response;
              // if (data.events.length === 0) {
              //   data.events = fakeEv;
              // }

          dispatch(actionTypes.ADD_EVENTS, {
            events: data.events.map((ev) => ({
              ...ev.event,
              sif: ev.sif,
              oddsBet: ev.oddsBet,
            })),
          });

          // setDelay(1);
        })
        .catch((err) => {
          console.error(2000, err);
          //TODO try again
        });
    };
  }, [props.reload]);

  const loadNewData = () => {
    setDelay(2000);
    setIsRunning(false);
    let postData = {
      t1: counterMsg.t1, //Data
      t2: counterMsg.t2, //Lang
      lang: "en", //TODO ubaciti pravi jezik
    };

    //TODO ubaciti pravi link za messages
    //nove informacije koje se pozivaju svako 2 sekunde , kvote ,utakmice
    axios
      .post("messagesTv", postData)
      .then((response) => {
        let updateEvents = [];
        let newEvents = [];

        if (response.data.m) {

          // console.log("response.data.m", response.data.m);
          response.data.m.forEach((item) => {
            const msgValue = item[Object.keys(item)[0]];
            switch (Object.keys(item)[0]) {
              case "1": //event status
                updateEvents.push({
                  idEvent: msgValue.idEvent,
                  eventStatus: msgValue.eSt,
                });

                // console.log("msgValue", msgValue);
                break;
              case "2": //new math
                newEvents.push(msgValue);
                break;

              case "3": //update time match , matchs status
                updateEvents.push(msgValue);
                break;
              case "4": //nove oklade
                const keyMatchOdd = Object.keys(msgValue)[0];
                let tmpBet = {};
                tmpBet[msgValue[keyMatchOdd].id] = msgValue[keyMatchOdd];
                updateEvents.push({
                  idEvent: parseInt(keyMatchOdd),
                  bets: tmpBet,
                });
                break;

              // case "5":
              // case "6":
              //   //nove oklade
              //   const keyMatch = Object.keys(msgValue)[0];
              //    //let updateOdds = [];
              //   msgValue[keyMatch].forEach((betItem) => {
              //     //let tmpbetValue = betItem[Object.keys(betItem)[0]];
              //     let tmpBet = {};
              //     tmpBet[betItem.id] = betItem;
              //     updateEvents.push({
              //       idEvent: parseInt(keyMatch),
              //       bets: tmpBet,
              //     });
              //   });
              //   break;
              case "7": //betstop
                updateEvents.push({
                  idEvent: parseInt(msgValue.idEvent),
                  betstop: true,
                });

                break;
              // case "8": //broj oklada za meč
              //   const idMatchMsg = Object.keys(msgValue)[0];
              //   updateEvents.push({
              //     idEvent: parseInt(idMatchMsg),
              //     countBets: parseInt(msgValue[idMatchMsg]),
              //   });

                // break;
              case "9":
                updateEvents = [];
                newEvents = [];
                dispatch(actionTypes.CLEAR_MATCHES, true);
                // dispatchBet(actionTypes.CLEAR_MATCHES, true);
                break;
              default:
                //nepoznat
                console.warn(
                  "unhendled msg",
                  Object.keys(item)[0],
                  item[Object.keys(item)[0]]
                );
                break;
            }
          });
        }
        // console.log("Messages: ", response.data);
        // const {m} = response.data;
        // const markets = {};
        // m.map(m=>{
        //   markets[m.idEvent] = m;
        // })
        // console.log("Global state: ", liveState);
        const { data } = response;
        if (newEvents.length) {
          dispatch(actionTypes.ADD_EVENTS, newEvents);
        }
        if (updateEvents.length) {
          dispatch(actionTypes.UPDATE_EVENTS, updateEvents);
        }
        // dispatch(actionTypes.UPDATE_MESSAGES, {
        //   messages: data.m,
        // });
        if (response.data.t1 || response.data.t2) {
          setCounterMsg({
            t1: response.data.t1,
            t2: response.data.t2,
          });
        }
        setIsRunning(true);
      })
      .catch((err) => {
        console.error(2000, err);
        setIsRunning(true);
      });
    //.then(setIsRunning(true));
  };

  return <></>;
};
export default LiveFetch;

const fakeEv = [
  {
    idEvent: 844630,
    idSport: 6,
    idTournament: 334251,
    startTime: 1592899200,
    categoryName: "Egzibicija",
    tournamentName: "German Pro Series, Singles",
    homeTeam: "Moeller, Marvin",
    awayTeam: "Seifert, Stefan",
    eventStatus: {
      pScs: {
        pSc: [
          {
            mtStCo: "8",
            num: "1",
            hSc: "4",
            aSc: "6",
          },
          {
            mtStCo: "9",
            num: "2",
            hSc: "0",
            aSc: "0",
          },
        ],
      },
      st: 1,
      rpt: "1",
      mtSt: 80,
      hSc: "0",
      aSc: "1",
      cuSer: "2",
      tb: "false",
    },
    countBets: 0,
    sifra: "18",
    oddsBet: [
      {
        odds: [
          {
            id: 119419707,
            va: 3.85,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119419708,
            va: 1.7,
            t: "X",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119419709,
            va: 4.1,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25466000,
        spec: "setnr=2|gamenrX=2|gamenrY=3",
        idBt: 831,
        idmSt: 6,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 1,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119410123,
            va: 2.7,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119410124,
            va: 1.4,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25461914,
        spec: "",
        idBt: 170,
        idmSt: 6,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 1,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119409991,
            va: 1.9,
            t: "Under",
            ma: "23.5",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119409992,
            va: 1.8,
            t: "Over",
            ma: "23.5",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25461921,
        spec: "total=23.5",
        idBt: 174,
        idmSt: 6,
        fav: 0,
        idOv: 0,
        pId: 0,
        red: 2,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119419749,
            va: 2.85,
            t: "Under",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119419750,
            va: 1.4,
            t: "Over",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25465991,
        spec: "setnr=2|total=8.5",
        idBt: 666,
        idmSt: 6,
        fav: 0,
        idOv: 0,
        pId: 0,
        red: 2,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119419739,
            va: 1.25,
            t: "Under",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119419740,
            va: 3.65,
            t: "Over",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25465990,
        spec: "setnr=2|total=10.5",
        idBt: 666,
        idmSt: 6,
        fav: 0,
        idOv: 0,
        pId: 0,
        red: 1,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119419724,
            va: 2.7,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119419725,
            va: 1.4,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25466002,
        spec: "setnr=2|gamenr=1",
        idBt: 832,
        idmSt: 6,
        fav: 0,
        idOv: 0,
        pId: 0,
        red: 1,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119419717,
            va: 3.8,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119419718,
            va: 1.7,
            t: "X",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119419719,
            va: 4.1,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25466001,
        spec: "setnr=2|gamenrX=3|gamenrY=4",
        idBt: 831,
        idmSt: 6,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 2,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119419722,
            va: 1.35,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119419723,
            va: 2.75,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25466003,
        spec: "setnr=2|gamenr=2",
        idBt: 832,
        idmSt: 6,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 2,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119410109,
            va: 1.85,
            t: "Under",
            ma: "24.5",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119410110,
            va: 1.85,
            t: "Over",
            ma: "24.5",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25461922,
        spec: "total=24.5",
        idBt: 174,
        idmSt: 6,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 1,
        sr: 0,
      },
    ],
    active: true,
    video: false,
  },
  {
    idEvent: 844465,
    idSport: 6,
    idTournament: 334215,
    startTime: 1592923200,
    categoryName: "Egzibicija",
    tournamentName: "Eastern European Championship",
    homeTeam: "Jotovski, Tomislav",
    awayTeam: "Malesevic, Nemanja",
    eventStatus: {
      pScs: {
        pSc: [
          {
            mtStCo: "8",
            num: "1",
            hSc: "3",
            aSc: "4",
          },
        ],
      },
      st: 1,
      rpt: "1",
      mtSt: 8,
      hSc: "0",
      aSc: "0",
      hgSc: "0",
      agSc: "0",
      cuSer: "1",
      tb: "false",
    },
    countBets: 0,
    sifra: "57",
    oddsBet: [
      {
        odds: [
          {
            id: 119493930,
            va: 2.1,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493931,
            va: 1.65,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495042,
        spec: "",
        idBt: 170,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 1,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119493802,
            va: 1.75,
            t: "Under",
            ma: "23.5",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493803,
            va: 2,
            t: "Over",
            ma: "23.5",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495050,
        spec: "total=23.5",
        idBt: 174,
        idmSt: 1,
        fav: 0,
        idOv: 0,
        pId: 0,
        red: 2,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119493855,
            va: 1.3,
            t: "Under",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493856,
            va: 3.3,
            t: "Over",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495074,
        spec: "setnr=1|total=12.5",
        idBt: 666,
        idmSt: 1,
        fav: 0,
        idOv: 0,
        pId: 0,
        red: 2,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119493936,
            va: 1.75,
            t: "Under",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493937,
            va: 2,
            t: "Over",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495073,
        spec: "setnr=1|total=10.5",
        idBt: 666,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 1,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119493844,
            va: 3.3,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493845,
            va: 1.7,
            t: "X",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493846,
            va: 4.6,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495082,
        spec: "setnr=1|gamenrX=9|gamenrY=10",
        idBt: 831,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 2,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119493847,
            va: 2,
            t: "Under",
            ma: "22.5",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493848,
            va: 1.75,
            t: "Over",
            ma: "22.5",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495049,
        spec: "total=22.5",
        idBt: 174,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 1,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119493840,
            va: 1.35,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493841,
            va: 2.85,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495084,
        spec: "setnr=1|gamenr=8",
        idBt: 832,
        idmSt: 1,
        fav: 0,
        idOv: 0,
        pId: 0,
        red: 2,
        sr: 0,
      },
    ],
    active: true,
    video: false,
  },
  {
    idEvent: 844566,
    idSport: 6,
    idTournament: 334208,
    startTime: 1592924400,
    categoryName: "Simulated Reality",
    tournamentName: "SRL Eastbourne, England",
    homeTeam: "Chardy, Jeremy (Srl)",
    awayTeam: "Sandgren, Tennys (Srl)",
    eventStatus: {
      pScs: {
        pSc: [
          {
            mtStCo: "8",
            num: "1",
            hSc: "3",
            aSc: "2",
          },
        ],
      },
      st: 1,
      rpt: "1",
      mtSt: 8,
      hSc: "0",
      aSc: "0",
      hgSc: "15",
      agSc: "30",
      cuSer: "2",
      tb: "false",
    },
    countBets: 0,
    sifra: "58",
    oddsBet: [
      {
        odds: [
          {
            id: 119386675,
            va: 1.95,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119386676,
            va: 1.8,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25451575,
        spec: "",
        idBt: 170,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 1,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119493690,
            va: 7.5,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493691,
            va: 1.22,
            t: "X",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493692,
            va: 6.75,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495027,
        spec: "setnr=1|gamenrX=7|gamenrY=8",
        idBt: 831,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 1,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119493781,
            va: 1.95,
            t: "Under",
            ma: "24.5",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493782,
            va: 1.8,
            t: "Over",
            ma: "24.5",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495004,
        spec: "total=24.5",
        idBt: 174,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 2,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119493716,
            va: 1.7,
            t: "Under",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493717,
            va: 2,
            t: "Over",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495018,
        spec: "setnr=1|total=12.5",
        idBt: 666,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 2,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119493796,
            va: 2.2,
            t: "Under",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493797,
            va: 1.6,
            t: "Over",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495017,
        spec: "setnr=1|total=10.5",
        idBt: 666,
        idmSt: 1,
        fav: 0,
        idOv: 0,
        pId: 0,
        red: 1,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119493708,
            va: 7.5,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493709,
            va: 1.04,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495029,
        spec: "setnr=1|gamenr=6",
        idBt: 832,
        idmSt: 1,
        fav: 0,
        idOv: 0,
        pId: 0,
        red: 1,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119494231,
            va: 7.75,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119494232,
            va: 1.22,
            t: "X",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119494233,
            va: 6.5,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495197,
        spec: "setnr=1|gamenrX=8|gamenrY=9",
        idBt: 831,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 2,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119386681,
            va: 1.75,
            t: "Over",
            ma: "23.5",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119386682,
            va: 1.95,
            t: "Under",
            ma: "23.5",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25451578,
        spec: "total=23.5",
        idBt: 174,
        idmSt: 1,
        fav: 0,
        idOv: 0,
        pId: 0,
        red: 1,
        sr: 0,
      },
      {
        odds: [
          {
            id: 119494218,
            va: 1.1,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119494219,
            va: 5.25,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495198,
        spec: "setnr=1|gamenr=7",
        idBt: 832,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        red: 2,
        sr: 0,
      },
    ],
    active: true,
    video: false,
    bets: {
      "25495017": {
        odds: [
          {
            id: 119493796,
            va: 2.2,
            t: "Under",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493797,
            va: 1.6,
            t: "Over",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495017,
        spec: "setnr=1|total=10.5",
        idBt: 666,
        idmSt: 1,
        fav: 0,
        red: 1,
      },
      "25495018": {
        odds: [
          {
            id: 119493716,
            va: 1.7,
            t: "Under",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493717,
            va: 2,
            t: "Over",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495018,
        spec: "setnr=1|total=12.5",
        idBt: 666,
        idmSt: 1,
        fav: 1,
        red: 2,
      },
      "25495027": {
        odds: [
          {
            id: 119493690,
            va: 7.5,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493691,
            va: 1.22,
            t: "X",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493692,
            va: 6.75,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495027,
        spec: "setnr=1|gamenrX=7|gamenrY=8",
        idBt: 831,
        idmSt: 1,
        fav: 1,
        red: 1,
      },
      "25495029": {
        odds: [
          {
            id: 119493708,
            va: 7.5,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119493709,
            va: 1.04,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495029,
        spec: "setnr=1|gamenr=6",
        idBt: 832,
        idmSt: 1,
        fav: 0,
        red: 1,
      },
      "25495197": {
        odds: [
          {
            id: 119494231,
            va: 7.75,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119494232,
            va: 1.22,
            t: "X",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119494233,
            va: 6.5,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495197,
        spec: "setnr=1|gamenrX=8|gamenrY=9",
        idBt: 831,
        idmSt: 1,
        fav: 1,
        red: 2,
      },
      "25495198": {
        odds: [
          {
            id: 119494218,
            va: 1.1,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 119494219,
            va: 5.25,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25495198,
        spec: "setnr=1|gamenr=7",
        idBt: 832,
        idmSt: 1,
        fav: 1,
        red: 2,
      },
    },
  },
];
