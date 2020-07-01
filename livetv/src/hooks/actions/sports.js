import { initStore } from "../useLive";
import { mapEvent } from "../functions/mapEvent";
import { UPDATE_MESSAGES } from "./actionTypes";

const configureStore = () => {
  const actions = {
    ADD_EVENTS: (curState, data) => {
      //iz message livvefetch novi podaci one sa 2 sec
      let returnEvents = [...curState.spEvents];
      let returnSports = [...curState.sports];

      //novi parovi
      if (data.events)
        data.events.forEach((el) => {
          let element = mapEvent(el);

          // da li postoji par
          const indExist = returnEvents.findIndex(
            (p) => p.idEvent === element.idEvent
          );
          if (indExist > -1) {
            returnEvents[indExist] = { ...returnEvents[indExist], ...element };
          } else {
            //da li je par aktivan ili ne ovisno od filtera
            let emptyElement = {
              active: true,
              video: false /*favorite: false*/,
            };

            //ako ne postoji dodaj par
            returnEvents.push({ ...element, ...emptyElement });

            //update sport countera
            const indSport = returnSports.findIndex(
              (s) => s.ID === element.idSport
            );

            if (indSport > -1) {
              const tmpSport = { ...returnSports[indSport] };
              tmpSport.eventCount++;
              returnSports[indSport] = { ...tmpSport };
            }
          }
        });

      // // //update parovi - klađenja
      // // if (data.updateEvents)
      // //   data.updateEvents.forEach((el) => {
      // //     // da li postoji par
      // //     const indExist = returnEvents.findIndex(
      // //       (p) => p.idEvent === el.idEvent
      // //     );
      // //     // console.log("updateEvents",el, indExist);
      // //     if (indExist > -1) {
      // //       returnEvents[indExist].bets = {
      // //         ...returnEvents[indExist].bets,
      // //         ...el.bets,
      // //       };
      // //     } else {
      // //     }
      // //   });

      return {
        spEvents: returnEvents,
        sports: returnSports,
      };
    },
    UPDATE_EVENTS: (curState, data) => {
      //ako je novi par dosao ide add event , a izmjena update
      let returnEvents = [...curState.spEvents];
      let returnSports = [...curState.sports];

      data.forEach((element) => {
        let removed = false;

        // miči par ako je završio
        //event_int_status - internal status, 2 - micanje meča, 1 - betstop
        //nazivi da budu slicni sto slicniji

        if (
          (element.eventStatus &&
            element.eventStatus.st &&
            ~~element.eventStatus.st > 1) ||
          (element.event_int_status && ~~element.event_int_status === 2)
        ) {
          console.log("removed event", element);

          // da li postoji par
          const indExistEvent = returnEvents.findIndex(
            (p) => p.idEvent === element.idEvent
          );

          //update sport countera
          if (indExistEvent > -1) {
            const tmpEvent = { ...returnEvents[indExistEvent] };
            //micanje matcha iz parova
            returnEvents = returnEvents.filter(
              (tmpel) => tmpel.idEvent !== element.idEvent
            );

            //sakrivanje sporta ako je zadnji par
            const indSport = returnSports.findIndex(
              (s) => s.ID === tmpEvent.idSport
            );
            if (indSport > -1) {
              let tmpSport = { ...returnSports[indSport] };
              tmpSport.eventCount--;
              if (tmpSport.eventCount === 0) {
                tmpSport.active = false;
              }
              console.log("removed event sport counter:", tmpSport);
              returnSports[indSport] = { ...tmpSport };
            }
          }

          removed = true;
        }
        if (!removed) {
          // da li postoji par
          const indExist = returnEvents.findIndex(
            (p) => p.idEvent === element.idEvent
          );
          // console.log("UPDATE_EVENTS", element, returnEvents);

          if (indExist > -1) {
            //ako se mjenjaju kvote tada samo kvote u objektu mjenjamo
            if (element.betstop) {
              if (returnEvents[indExist].bets) {
                Object.keys(returnEvents[indExist].bets).forEach((keyIdBet) => {
                  if (returnEvents[indExist].bets[keyIdBet].idmSt === 1) {
                    returnEvents[indExist].bets[keyIdBet] = {
                      ...returnEvents[indExist].bets[keyIdBet],
                      idmSt: 6,
                    };
                  }
                });
              }
            } else if (element.bets) {
              // console.log(element.idEvent,element.bets);
              //TODO ako je marketstatus <> 1,6 tada treba brisati klađenje iz para
              returnEvents[indExist].bets = {
                ...returnEvents[indExist].bets,
                ...element.bets,
              };
            } else {
              returnEvents[indExist] = {
                ...returnEvents[indExist],
                ...element,
              };
            }
          }
        }
      });
      return { spEvents: returnEvents, sports: returnSports };
    },
    CLEAR_MATCHES: (curState, areYouShure) => {
      let returnEvents = [...curState.spEvents];

      returnEvents.forEach((elMatch, indMatch) => {
        let tmpMatch = { ...elMatch };
        delete tmpMatch.bets;
        delete tmpMatch.eventStatus;
        tmpMatch = {
          ...tmpMatch,
          ...{ eventStatus: { st: 0, mtSt: 0 }, countBets: 0 },
        };

        returnEvents[indMatch] = { ...tmpMatch };
      });
      console.log("CLEAR_MATCHES", returnEvents);
      return { spEvents: returnEvents };
    },
    // CLEAR_CLOSED_BETS: (curState, filterData) => {
    //   let returnSports = [...curState.sports];
    //   let returnEvents = [...curState.spEvents];
    //   //brisanje iz zatvorenog eventa sve bets osim glavnih
    //   if (filterData.match) {
    //     let activeBets = [];
    //     const indEvent = returnEvents.findIndex(
    //       (elEvent) => elEvent.idEvent === filterData.match
    //     );
    //     if (indEvent > -1) {
    //       const idSport = returnEvents[indEvent].idSport;
    //       const indSport = returnSports.findIndex(
    //         (elSport) => elSport.ID === idSport
    //       );
    //       let sportActive = true;
    //       if (indSport > -1) {
    //         sportActive = returnSports[indSport].active;
    //       }

    //       //samo za aktivne sportove se ostavljaju oklade
    //       if (sportActive) {
    //         curState.headMarkets.forEach((elMarket) => {
    //           if (
    //             elMarket.ids === idSport &&
    //             (elMarket.active || elMarket.main === 1)
    //           ) {
    //             activeBets.push(elMarket.id);
    //           }
    //         });
    //       }

    //       if (returnEvents[indEvent].bets) {
    //         Object.keys(returnEvents[indEvent].bets).forEach((keyIdBet) => {
    //           if (
    //             activeBets.indexOf(
    //               returnEvents[indEvent].bets[keyIdBet].idBt
    //             ) === -1
    //           ) {
    //             delete returnEvents[indEvent].bets[keyIdBet];
    //           }
    //         });
    //       }

    //       returnEvents[indEvent] = {
    //         ...returnEvents[indEvent],
    //         ...{ singleMatch: false },
    //       };

    //       //console.log("CLEAR_CLOSED_BETS",returnEvents[indEvent]);
    //     }
    //   }

    //   return { spEvents: returnEvents };
    // },
    UPDATE_MESSAGES: (curState, { messages: newMessages }) => {
      const { spEvents } = curState;
      // console.log("newMessages", newMessages);
      const eventsIds = spEvents.map((ev) => Number(ev.idEvent));

      const messages = newMessages
        .filter((m) => m["1"])
        .map((m) => m["1"])
        .filter((m) => eventsIds.includes(m.idEvent));
      // console.log("MESSAGES", messages);
    },
  };
  initStore(actions, { spEvents: [] });
};

export default configureStore;
