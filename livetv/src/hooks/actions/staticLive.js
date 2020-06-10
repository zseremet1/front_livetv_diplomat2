import { initStore } from "../useLive";
const configureStore = () => {
  const actions = {
    /*akcija*/ ADD_STATIC_LIVE: (curState, newMarkets) => {
      //curstate nove podatke puniti ,
      const headMarkets = [...newMarkets.head]; // ;
      // const markets = {...newMarkets.all}; // ;
      let markets = {};

      let possTyp = newMarkets.possTyp;
      let typTrans = newMarkets.typTrans;

      let sports = [...newMarkets.sports]; // ;

      let indSport = 0;
      sports.forEach((tmpSport) => {
        markets[tmpSport.ID] = {};
        switch (tmpSport.ID) {
          case 2:
            sports[indSport] = { ...tmpSport, ...{ horisontal: true } };
            break;
          default:
            break;
        }
        indSport++;
      });

      // console.log("markets", markets);
      let indMarket = 0;
      Object.keys(newMarkets.all).forEach((el) => {
        if (markets[newMarkets.all[el].ids])
          markets[newMarkets.all[el].ids][newMarkets.all[el].id] = {
            ...newMarkets.all[el],
            order: indMarket++,
          };
      });

      return {
        markets: markets,
        headMarkets: headMarkets,
        sports: sports,
        possTyp,
        typTrans
      };
    },

    CLEAR_NEW_MARKETS: (curState, data) => {
      return { newMarkets: [] };
    },
  };
  initStore(actions, {
    markets: {},
    headMarkets: [],
    sports: [],
  });
};

export default configureStore;
