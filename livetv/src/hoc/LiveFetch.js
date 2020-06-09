import React, { useEffect, useState } from "react";
import axios from "./axios-live";
import { useLive } from "../hooks/useLive";
import { useInterval } from "../hooks/custom/useInterval";
import { actionTypes, sports, staticLive } from "../hooks/actions";


const LiveFetch = (props) => {
    const [liveState, dispatch] = useLive(false);
    const [delay, setDelay] = useState(1);
    const [isRunning, setIsRunning] = useState(false);
    const [counterMsg, setCounterMsg] = useState({
        t1: 0,
        t2: 0 
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
      .get("staticContent?key=hr")
      .then((response) => {

        let returnSports; // = response.data;
        const headMarkets = [];
        const markets = {};

        dispatch(actionTypes.ADD_STATIC_LIVE, {
            head: headMarkets,
            all: markets,
            sports: returnSports,
          });
          getEvents();

    })
    .catch((err) => {
      console.error(2000, err);
      //TODO try again, bez ovoga nema ništa
    });

    const getEvents = () => {
        //TODO ubaciti events url for LiveTV, ubaciti odgovarajući jezik
        axios
          .get("events?key=en")
          .then((response) => {


            if (response.data.t1 || response.data.t2) {
                setCounterMsg({
                  t1: response.data.t1,
                  t2: response.data.t2 
                });
              }

          setIsRunning(true);
          // console.log("LiveFetch1.js");

          // setDelay(1);
        })
        .catch((err) => {
          console.error(2000, err);
          //TODO try again
        });
    }

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
        axios
        .post("messages", postData)
        .then((response) => {

              
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
