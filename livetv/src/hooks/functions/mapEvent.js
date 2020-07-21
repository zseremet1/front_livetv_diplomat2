export function mapEvent(newEvent) {
  const tmpEvent = { ...newEvent };
  let returnEvent = null;

  // mapiramo bets da budu po keyu jer dalje dobijamo tako
  let mapedBets = Object.fromEntries(tmpEvent.oddsBet.map((ev) => [ev.id, ev]));

  returnEvent = {
    idEvent: tmpEvent.idEvent,
    idSport: tmpEvent.ids,
    idTournament: tmpEvent.idt,
    startTime: tmpEvent.startTime,
    categoryName: tmpEvent.cname,
    tournamentName: tmpEvent.tname,
    homeTeam: tmpEvent.hname,
    awayTeam: tmpEvent.aname,
    eventStatus: tmpEvent.eSt,
    countBets: tmpEvent.cnt,
    favorite: tmpEvent.favorite, // added for favorites
    sifra: tmpEvent.sif,
    bets: mapedBets,
    ek: tmpEvent.ek,
  };
  return { ...returnEvent };
}
