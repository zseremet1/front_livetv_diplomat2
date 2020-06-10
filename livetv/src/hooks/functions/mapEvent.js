export function mapEvent(newEvent) {
  const tmpEvent = { ...newEvent };
  let returnEvent = null;

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
  };
  return { ...returnEvent };
}
