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
            //  if (data.events.length === 0) {
            //    data.events = fakeEv;
            //  }

          dispatch(actionTypes.ADD_EVENTS, {
            events: data.events.map((ev) => ({ ...ev.event, sif: ev.sif, oddsBet: ev.oddsBet })),
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
      tc1: counterMsg.t1, //Data
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

        if(response.data.m)
        {
          response.data.m.forEach((item)=>{
            const msgValue = item[Object.keys(item)[0]];
            switch(Object.keys(item)[0]){
              case "1": //event status
                updateEvents.push({
                  idEvent:msgValue.idEvent,
                  eventStatus:msgValue.eSt,

                });
                break;
                case "2"://new math
                newEvents.push(msgValue);
                break;

                case "3"://update time match , matchs status
                updateEvents.push(msgValue);
                break;
                case "4": //nove oklade
                  const keyMatchOdd = Object.keys(msgValue)[0];
                  let tmpBet = {};
                  tmpBet[msgValue[keyMatchOdd].id] = msgValue[keyMatchOdd];
                  updateEvents.push({
                    idEvent:parseInt(keyMatchOdd),
                    bets:tmpBet,
                  });
                  break;

              case "5":
                case "6":
                  //nove oklade
                  const keyMatch = Object.keys(msgValue)[0];
                  // let updateOdds = [];
                  msgValue[keyMatch].forEach((betItem) => {
                    // let tmpbetValue = betItem[Object.keys(betItem)[0]];
                    let tmpBet = {};
                    tmpBet[betItem.id] = betItem;
                    updateEvents.push({
                      idEvent: parseInt(keyMatch),
                      bets: tmpBet,
                    });
                  });
                  break;
                case "7": //betstop
                  updateEvents.push({
                    idEvent: parseInt(msgValue.idEvent),
                    betstop: true,
                  });
  
                  break;
                case "8": //broj oklada za meč
                  const idMatchMsg = Object.keys(msgValue)[0];
                  updateEvents.push({
                    idEvent: parseInt(idMatchMsg),
                    countBets: parseInt(msgValue[idMatchMsg]),
                  });
  
                  break;
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
        if(newEvents.length){
          dispatch(actionTypes.ADD_EVENTS, newEvents);
        }
        if(updateEvents.length){
          dispatch(actionTypes.UPDATE_EVENTS, updateEvents);
        }
        // dispatch(actionTypes.UPDATE_MESSAGES, {
        //   messages: data.m,
        // });

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
    event: {
      idEvent: 838482,
      ids: 2,
      tname: "Prijateljske",
      cname: "Međunarodne - klubovi",
      hname: "Benešov",
      aname: "Mas Taborsko",
      startTime: 1592238600,
      idt: 64,
      cnt: 0,
      eSt: {
        st: 0,
        mtSt: 0,
      },
    },
    sif: "86",
    ek: "1",
    oddsBet: [
      {
        odds: [
          {
            id: 118229576,
            va: 7.5,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 118229577,
            va: 6.75,
            t: "X",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 118229578,
            va: 1.25,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25036412,
        spec: "",
        idBt: 95,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        r: 0,
        sr: 0,
      },
      {
        odds: [
          {
            id: 118229796,
            va: 6,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 118229797,
            va: 3.4,
            t: "X",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 118229798,
            va: 1.55,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25036471,
        spec: "",
        idBt: 2,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        r: 0,
        sr: 0,
      },
      {
        odds: [
          {
            id: 118229668,
            va: 1.3,
            t: "Yes",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 118229669,
            va: 3,
            t: "No",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25036447,
        spec: "",
        idBt: 3,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        r: 0,
        sr: 0,
      },
    ],
  },
  {
    event: {
      idEvent: 838562,
      ids: 2,
      tname: "Cyber World Cup",
      cname: "Elektroničke Lige",
      hname: "England (Gernaut)",
      aname: "Portugal (Supernova)",
      startTime: 1592236200,
      idt: 334054,
      cnt: 0,
      eSt: {
        c: {
          mtT: "7:58",
          sto: false,
        },
        pScs: {
          pSc: [
            {
              mtStCo: "6",
              num: "1",
              hSc: "0",
              aSc: "0",
            },
            {
              mtStCo: "7",
              num: "2",
              hSc: "0",
              aSc: "1",
            },
          ],
        },
        stat: {
          yCa: {
            h: 0,
            a: 0,
          },
          rCa: {
            h: 0,
            a: 0,
          },
          yrCa: {
            h: 0,
            a: 0,
          },
          cor: {
            h: 1,
            a: 3,
          },
        },
        st: 1,
        rpt: "1",
        mtSt: 7,
        hSc: "0",
        aSc: "1",
      },
    },
    sif: "106",
    ek: "1",
    oddsBet: [
      {
        odds: [
          {
            id: 118255122,
            va: 45,
            t: "1",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 118255123,
            va: 6.75,
            t: "X",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 118255124,
            va: 1.1,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25047301,
        spec: "",
        idBt: 95,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        r: 0,
        sr: 0,
      },
    ],
  },
  {
    event: {
      idEvent: 838563,
      ids: 2,
      tname: "Cyber World Cup",
      cname: "Elektroničke Lige",
      hname: "Netherlands (Corvin)",
      aname: "Argentina (Phantom)",
      startTime: 1592236200,
      idt: 334054,
      cnt: 0,
      eSt: {
        c: {
          mtT: "8:42",
          sto: false,
        },
        pScs: {
          pSc: [
            {
              mtStCo: "6",
              num: "1",
              hSc: "2",
              aSc: "1",
            },
            {
              mtStCo: "7",
              num: "2",
              hSc: "1",
              aSc: "0",
            },
          ],
        },
        stat: {
          yCa: {
            h: 0,
            a: 0,
          },
          rCa: {
            h: 0,
            a: 0,
          },
          yrCa: {
            h: 0,
            a: 0,
          },
          cor: {
            h: 0,
            a: 0,
          },
        },
        st: 1,
        rpt: "1",
        mtSt: 7,
        hSc: "3",
        aSc: "1",
      },
    },
    sif: "107",
    ek: "1",
    oddsBet: [
      {
        odds: [
          {
            id: 118255030,
            va: 1,
            t: "1",
            isv: 0,
            idt: 0,
            idtft: 0,
          },
          {
            id: 118255031,
            va: 9.75,
            t: "X",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
          {
            id: 118255032,
            va: 100,
            t: "2",
            isv: 1,
            idt: 0,
            idtft: 0,
          },
        ],
        id: 25047264,
        spec: "",
        idBt: 95,
        idmSt: 1,
        fav: 1,
        idOv: 0,
        pId: 0,
        r: 0,
        sr: 0,
      },
    ],
  },
  // {
  //   event: {
  //     idEvent: 838564,
  //     ids: 2,
  //     tname: "Cyber World Cup",
  //     cname: "Elektroničke Lige",
  //     hname: "Spain (Sima)",
  //     aname: "Germany (Stig)",
  //     startTime: 1592236200,
  //     idt: 334054,
  //     cnt: 0,
  //     eSt: {
  //       c: {
  //         mtT: "6:38",
  //         sto: false,
  //       },
  //       pScs: {
  //         pSc: [
  //           {
  //             mtStCo: "6",
  //             num: "1",
  //             hSc: "0",
  //             aSc: "2",
  //           },
  //           {
  //             mtStCo: "7",
  //             num: "2",
  //             hSc: "0",
  //             aSc: "1",
  //           },
  //         ],
  //       },
  //       stat: {
  //         yCa: {
  //           h: 0,
  //           a: 0,
  //         },
  //         rCa: {
  //           h: 0,
  //           a: 0,
  //         },
  //         yrCa: {
  //           h: 0,
  //           a: 0,
  //         },
  //         cor: {
  //           h: 1,
  //           a: 1,
  //         },
  //       },
  //       st: 1,
  //       rpt: "1",
  //       mtSt: 7,
  //       hSc: "0",
  //       aSc: "3",
  //     },
  //   },
  //   sif: "108",
  //   ek: "1",
  //   oddsBet: [
  //     {
  //       odds: [
  //         {
  //           id: 118254936,
  //           va: 100,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254937,
  //           va: 14.25,
  //           t: "X",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254938,
  //           va: 1,
  //           t: "2",
  //           isv: 0,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25047228,
  //       spec: "",
  //       idBt: 95,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //   ],
  // },
  // {
  //   event: {
  //     idEvent: 838565,
  //     ids: 2,
  //     tname: "Cyber World Cup",
  //     cname: "Elektroničke Lige",
  //     hname: "Belgium (Specialist)",
  //     aname: "Brazil (Walker)",
  //     startTime: 1592236200,
  //     idt: 334054,
  //     cnt: 0,
  //     eSt: {
  //       c: {
  //         mtT: "7:13",
  //         sto: false,
  //       },
  //       pScs: {
  //         pSc: [
  //           {
  //             mtStCo: "6",
  //             num: "1",
  //             hSc: "1",
  //             aSc: "1",
  //           },
  //           {
  //             mtStCo: "7",
  //             num: "2",
  //             hSc: "0",
  //             aSc: "1",
  //           },
  //         ],
  //       },
  //       stat: {
  //         yCa: {
  //           h: 0,
  //           a: 0,
  //         },
  //         rCa: {
  //           h: 0,
  //           a: 0,
  //         },
  //         yrCa: {
  //           h: 0,
  //           a: 0,
  //         },
  //         cor: {
  //           h: 2,
  //           a: 0,
  //         },
  //       },
  //       st: 1,
  //       rpt: "1",
  //       mtSt: 7,
  //       hSc: "1",
  //       aSc: "2",
  //     },
  //   },
  //   sif: "109",
  //   ek: "1",
  //   oddsBet: [
  //     {
  //       odds: [
  //         {
  //           id: 118254520,
  //           va: 14,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254521,
  //           va: 4.35,
  //           t: "X",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254522,
  //           va: 1.3,
  //           t: "2",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25047080,
  //       spec: "",
  //       idBt: 95,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //   ],
  // },
  // {
  //   event: {
  //     idEvent: 838582,
  //     ids: 2,
  //     tname: "European Championship SRL",
  //     cname: "Simulated Reality League",
  //     hname: "Poljska",
  //     aname: "Sjeverna Irska",
  //     startTime: 1592236800,
  //     idt: 334138,
  //     cnt: 0,
  //     eSt: {
  //       c: {
  //         mtT: "22:15",
  //         sto: false,
  //       },
  //       pScs: {
  //         pSc: [
  //           {
  //             mtStCo: "6",
  //             num: "1",
  //             hSc: "0",
  //             aSc: "0",
  //           },
  //         ],
  //       },
  //       stat: {
  //         yCa: {
  //           h: 0,
  //           a: 0,
  //         },
  //         rCa: {
  //           h: 0,
  //           a: 0,
  //         },
  //         yrCa: {
  //           h: 0,
  //           a: 0,
  //         },
  //         cor: {
  //           h: 2,
  //           a: 2,
  //         },
  //       },
  //       st: 1,
  //       rpt: "1",
  //       mtSt: 6,
  //       hSc: "0",
  //       aSc: "0",
  //     },
  //   },
  //   sif: "113",
  //   ek: "1",
  //   oddsBet: [
  //     {
  //       odds: [
  //         {
  //           id: 118246312,
  //           va: 1.95,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118246313,
  //           va: 2.85,
  //           t: "X",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118246314,
  //           va: 4.6,
  //           t: "2",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25043372,
  //       spec: "",
  //       idBt: 95,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //     {
  //       odds: [
  //         {
  //           id: 118246272,
  //           va: 1.9,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118246273,
  //           va: 2.8,
  //           t: "X",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118246274,
  //           va: 4.5,
  //           t: "2",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25043373,
  //       spec: "score=0:0",
  //       idBt: 845,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //     {
  //       odds: [
  //         {
  //           id: 118246261,
  //           va: 3.35,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118246262,
  //           va: 1.55,
  //           t: "X",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118246263,
  //           va: 6.5,
  //           t: "2",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25043401,
  //       spec: "score=0:0",
  //       idBt: 844,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //     {
  //       odds: [
  //         {
  //           id: 118246284,
  //           va: 1.7,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118246285,
  //           va: 5.5,
  //           t: "None",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118246286,
  //           va: 2.95,
  //           t: "2",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25043374,
  //       spec: "goalnr=1",
  //       idBt: 651,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //     {
  //       odds: [
  //         {
  //           id: 118246174,
  //           va: 2.45,
  //           t: "Yes",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118246175,
  //           va: 1.45,
  //           t: "No",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25043393,
  //       spec: "",
  //       idBt: 3,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //     {
  //       odds: [
  //         {
  //           id: 118246185,
  //           va: 3.15,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118246186,
  //           va: 1.65,
  //           t: "None",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118246187,
  //           va: 5.5,
  //           t: "2",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25043402,
  //       spec: "goalnr=1",
  //       idBt: 652,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //     {
  //       odds: [
  //         {
  //           id: 118246221,
  //           va: 3.35,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118246222,
  //           va: 1.55,
  //           t: "X",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118246223,
  //           va: 6.5,
  //           t: "2",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25043400,
  //       spec: "",
  //       idBt: 2,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //   ],
  // },
  // {
  //   event: {
  //     idEvent: 838521,
  //     ids: 2,
  //     tname: "Super Liga 1",
  //     cname: "Grčka",
  //     hname: "Asteras Tripolis",
  //     aname: "Panionios",
  //     startTime: 1592238600,
  //     idt: 334167,
  //     cnt: 0,
  //     eSt: {
  //       st: 0,
  //       mtSt: 0,
  //     },
  //   },
  //   sif: "123",
  //   ek: "1",
  //   oddsBet: [
  //     {
  //       odds: [
  //         {
  //           id: 118254635,
  //           va: 2,
  //           t: "Yes",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254636,
  //           va: 1.7,
  //           t: "No",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25047160,
  //       spec: "",
  //       idBt: 3,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //     {
  //       odds: [
  //         {
  //           id: 118254770,
  //           va: 1.55,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254771,
  //           va: 3.9,
  //           t: "X",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254772,
  //           va: 5.5,
  //           t: "2",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25047140,
  //       spec: "",
  //       idBt: 95,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //     {
  //       odds: [
  //         {
  //           id: 118254730,
  //           va: 1.55,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254731,
  //           va: 3.8,
  //           t: "X",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254732,
  //           va: 5.25,
  //           t: "2",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25047141,
  //       spec: "score=0:0",
  //       idBt: 845,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //     {
  //       odds: [
  //         {
  //           id: 118254719,
  //           va: 2.15,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254720,
  //           va: 2.15,
  //           t: "X",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254721,
  //           va: 5.75,
  //           t: "2",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25047168,
  //       spec: "score=0:0",
  //       idBt: 844,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //     {
  //       odds: [
  //         {
  //           id: 118254739,
  //           va: 1.45,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254740,
  //           va: 10.75,
  //           t: "None",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254741,
  //           va: 3.05,
  //           t: "2",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25047142,
  //       spec: "goalnr=1",
  //       idBt: 651,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //     {
  //       odds: [
  //         {
  //           id: 118254646,
  //           va: 2,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254647,
  //           va: 2.75,
  //           t: "None",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254648,
  //           va: 4.25,
  //           t: "2",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25047169,
  //       spec: "goalnr=1",
  //       idBt: 652,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //     {
  //       odds: [
  //         {
  //           id: 118254682,
  //           va: 2.15,
  //           t: "1",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254683,
  //           va: 2.15,
  //           t: "X",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //         {
  //           id: 118254684,
  //           va: 5.75,
  //           t: "2",
  //           isv: 1,
  //           idt: 0,
  //           idtft: 0,
  //         },
  //       ],
  //       id: 25047167,
  //       spec: "",
  //       idBt: 2,
  //       idmSt: 1,
  //       fav: 1,
  //       idOv: 0,
  //       pId: 0,
  //       r: 0,
  //       sr: 0,
  //     },
  //   ],
  // },
];