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

      // prevodjenje possTyp sa eng na bos
      const possTypPrevedeno = Object.values(possTyp)
        .map((type) => type.split(", "))
        .map((types) =>
          types
            .map((type) => type.replace(/[\[\]]/g, "").trim())
            .map(
              (type) => typTrans[type] || typTrans[type.toLowerCase()] || type
            )
        );

      // Ubacivanje possTyp u market i dobijamo objekat
      const marketSaPossTypNiz = Object.values(newMarkets.all).map(
        (market) => ({
          ...market,
          possTyp: possTypPrevedeno[market.idtip],
        })
      );

      // niz marketa sa possTyp pretvaramo nazad u objekat
      const marketSaPossTypObj = Object.fromEntries(
        marketSaPossTypNiz.map((market, index) => [index, market])
      );

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
      // ovdje je zamjenjeno newMarkets.all (markete sa servisa), sa marketima sa possType koje su iznad  napraviljene
      Object.keys(marketSaPossTypObj).forEach((el) => {
        if (markets[marketSaPossTypObj[el].ids])
          markets[marketSaPossTypObj[el].ids][marketSaPossTypObj[el].id] = {
            ...marketSaPossTypObj[el],
            order: indMarket++,
          };
      });

      return {
        markets: markets,
        headMarkets: headMarkets,
        sports: sports,
        possTyp: possTypPrevedeno,
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
