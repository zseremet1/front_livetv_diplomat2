import React from "react";
import Icon from "../Icon/Icon";

const SportIcon = (props) => {
  let iconName;
  switch (props.idSport) {
    case 2:
      iconName = props.invert ? "ico-football-invert" : "ico-football";
      break;
    case 3:
      iconName = "ico-basketball";
      break;
    case 4:
      iconName = "ico-baseball";
      break;
    case 5:
      iconName = "ico-ice-hockey";
      break;
    case 6:
      iconName = "ico-tennis";
      break;
    case 7:
      iconName = props.invert ? "ico-handball-invert" : "ico-handball";
      break;
    case 8:
      iconName = "ico-floorball";
      break;
    case 9:
      iconName = "ico-golf";
      break;
    case 10:
      iconName = "ico-motor-sport";
      break;
    case 11:
      iconName = "ico-ragby";
      break;
    case 12:
      iconName = "ico-aussie";
      break;
    case 13:
      iconName = "ico-winter-sports";
      break;
    case 14:
      iconName = "ico-bandy";
      break;
    case 15:
      iconName = "ico-american-football";
      break;
    case 16:
      iconName = "ico-bicycling";
      break;
    case 17:
      iconName = "ico-snooker";
      break;
    case 18:
      iconName = "ico-table-tennis";
      break;
    case 19:
      iconName = "ico-darts";
      break;
    case 20:
      iconName = props.invert ? "ico-volleyball-invert" : "ico-volleyball";
      break;
    case 21:
      iconName = "ico-water-polo";
      break;
    case 22:
      iconName = "ico-curling";
      break;
    case 23:
      iconName = props.invert ? "ico-futsal-invert" : "ico-futsal";
      break;
    case 24:
      iconName = "ico-badminton";
      break;
    case 25:
      iconName = props.invert
        ? "ico-beach-volleyball-invert"
        : "ico-beach-volleyball";
      break;
    case 26:
      iconName = props.invert ? "ico-beach-soccer-invert" : "ico-beach-soccer";
      break;
    case 27:
      iconName = "ico-pesapallo";
      break;
    case 28:
      iconName = "ico-cricket";
      break;
    case 29:
      iconName = "ico-field-hockey";
      break;
    case 30:
      iconName = "ico-bowls";
      break;
    case 31:
      iconName = "ico-boxing";
      break;
    case 32:
      iconName = "ico-prod-lotto";
      break;
    case 33:
      iconName = ""; //Soccer Mythical
      break;
    case 34:
      iconName = "ico-squash";
      break;
    case 35:
      iconName = "ico-lol"; //League of Legends
      break;
    case 36:
      iconName = "ico-ultimate-fight";
      break;
    case 37:
      iconName = "ico-olympics";
      break;
    case 39:
      iconName = "ico-prod-lotto";
      break;
    case 40:
      iconName = "ico-sailing";
      break;
    case 41:
      iconName = "ico-athletics";
      break;
    case 42:
      iconName = "ico-esports"; //Street Fighter V
      break;
    case 43:
      iconName = "ico-skiing";
      break;
    case 44:
      iconName = "ico-ski-jumping";
      break;
    case 57:
      iconName = "ico-horse-racing";
      break;
    case 59:
      iconName = "ico-basketball";
      break;
    case 61:
    case 62:
    case 63:
    case 64:
      iconName = "ico-esports";
      break;
    case 65:
      iconName = props.invert
        ? "ico-beach-handball-invert"
        : "ico-beach-handball";
      break;
    case 66:
    case 67:
      iconName = "ico-esports";
      break;
    case 68:
      iconName = "ico-formula-1";
      break;
    case 69:
    case 70:
    case 71:
    case 72:
      iconName = "ico-motor-sport";
      break;
    case 73:
      iconName = "ico-chess";
      break;
    case 74:
      iconName = "ico-cs-go";
      break;
    case 75:
      iconName = "ico-dota";
      break;

    case 76:
    case 77:
    case 78:
    case 79:
    case 80:
    case 81:
      iconName = "ico-esports";
      break;

    default:
      iconName = props.invert ? "ico-sport-invert" : "ico-sport";
      break;
  }

  //fale ikone
  // 45	Nordic Combined
  // 46	Cross-Country
  // 47	Pool
  // 48	Freestyle Skiing
  // 49	Speed Skating
  // 50	Snowboard
  // 51	Short Track
  // 52	Skeleton
  // 53	Figure Skating
  // 54	Bobsleigh
  // 55	Luge
  // 56	Formula E
  //58 Rink Hockey
  //60 Kabaddi

  //preostali  u ikonicama
  //ico-archery
  //ico-fencing
  //ico-gymnastics
  //ico-judo
  // ico-rally
  //ico-rowing
  //ico-swimming
  //ico-taekwondo
  //ico-triathlon
  //ico-wrestling

  return <Icon name={iconName} />;
};

export default SportIcon;
