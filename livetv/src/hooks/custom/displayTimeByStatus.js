import { DateFormat } from "./useDateFormat";
import { useTranslation } from "react-i18next";
export function DisplayTimeByStatus(sport, status, time) {
  const { t } = useTranslation();
  let printDatchTime = null;

  if (time) {
    printDatchTime = DateFormat(
      new Date(time * 1000 + (window.$timezoneOffset || 0) * 60 * 1000),
      "HH:MM"
    );
  }

  // console.log("time", sport, status);
  switch (~~status.mtSt) {
    // // 0 -> not specified sports
    // case 0: // Not started
    //     // startTime ??
    //     break;
    // 1, 2 -> basketball, ice hockey, beach handball
    case 1: // 1st period (period number: 1)
    case 2: // 2nd period (period number: 2)
    // break;
    // 3 -> ice hockey
    case 3: // 3rd period (period number: 3)
      if (parseInt(status.c.remT) < 1)
        printDatchTime = parseInt(status.c.mtT.split(":", 1)) + "'";
      // ako je zadnja minuta perioda ne smije dodati 1
      else printDatchTime = parseInt(status.c.mtT.split(":", 1)) + 1 + "'"; // minuta utakmice
      break;
    // // 4, 5 -> not specified sports
    // case 4: // 4th period (period number: 4)
    // case 5: // 5th period (period number: 5)
    //     break;
    // 6, 7 -> soccer, basketball, handball, rugby, field hockey, futsal
    case 6: // 1st half (period number: 1)
    case 7: // 2nd half (period number: 2)
      if (status.c.stoT) {
        printDatchTime =
          parseInt(status.c.mtT.split(":", 1)) +
          "'+" +
          (parseInt(status.c.stoT.split(":", 1)) + 1);
      } else {
        printDatchTime = parseInt(status.c.mtT.split(":", 1)) + 1 + "'"; // minuta utakmice
      }
      break;
    // // 8, 9, 10, 11, 12 -> tennis, table tennis, volleyball, badminton, bowls, beach volley
    // case 8: // 1st set (period number: 1)
    // case 9: // 2nd set (period number: 2)
    // case 10: // 3rd set (period number: 3)
    // case 11: // 4th set (period number: 4)
    // case 12: // 5th set (period number: 5)
    //     break;
    // 13, 14, 15, 16 -> basketball, aussie rules, american football, waterpolo
    case 13: // 1st quarter (period number: 1)
    case 14: // 2nd quarter (period number: 2)
    case 15: // 3rd quarter (period number: 3)
    case 16: // 4th quarter (period number: 4)
      printDatchTime = parseInt(status.c.mtT.split(":", 1)) + 1 + "'"; // minuta utakmice
      break;
    // // 17 -> volleyball, beach volley
    // case 17:  // Golden set
    //     break;
    // // 18, 19, 20 -> not specified sports
    // case 18:  // Golden raid
    // case 19:  // Coin toss
    // case 20:  // Started
    //     break;
    // 21 -> snooker, darts, basketball 3x3
    case 21: // In progress
      printDatchTime = "";
      break;
    // // 22 -> not specified sports
    // case 22:  // About to start
    //     break;
    // // 30 -> snooker, darts
    // case 30:  // Break
    //     break;
    // 31 -> soccer, basketball, handball, rugby, field hockey, futsal, beach handball
    case 31: // Halftime
      printDatchTime = t("HT");
      // printDatchTime = "HT";
      break;
    // 32 -> soccer, basketball, ice hockey, handball, rugby, aussie rules, american football, futsal, basketball 3x3
    case 32: // Awaiting extra time
      printDatchTime = t("awaitingExtraTime");
      break;
    // 33 -> soccer, handball, rugby, aussie rules, futsal
    case 33: // Extra time halftime
      printDatchTime = t("extraTimeHalftime");
      break;
    // 34 -> soccer, ice hockey, handball, rugby, field hockey, futsal, beach handball
    case 34: // Awaiting penalties
      printDatchTime = t("awaitingPenalties");
      break;
    // 35, 36 -> not specified sports
    case 35: // Awaiting penalties
    case 36: // Awaiting penalties
      printDatchTime = t("awaitingPenalties");
      break;
    // // 37 -> volleyball
    // case 37: // Awaiting golden set
    //     break;
    // // 38 -> not specified sports
    // case 38: // Awaiting golden raid
    //     break;
    // 40 -> basketball, ice hockey, american football, basketball 3x3
    case 40: // Overtime
      printDatchTime = t("overTime");
      break;
    // // 41, 42 -> soccer, handball, rugby, aussie rules, futsal
    // case 41: // 1st extra
    // case 42: // 2nd extra
    //     break;
    // 50 -> soccer, ice hockey, handball, rugby, field hockey, futsal, beach handball
    case 50: // Penalties
      printDatchTime = t("penalties");
      break;
    // // 51, 52 -> not specified sports
    // case 51:  // Penalties
    // case 52:  // Penalties
    //     break;
    // // 60 -> rugby, field hockey
    // case 60:  // Postponed
    //     break;
    // // 61 -> tennis, handball, snooker, table tennis, darts, volleyball, badminton, bowls, beach volley, squash, counter-strike, LOL, Dota, beach handball
    // case 61: // Start delayed
    //     break;
    // // 70, 71, 72, 73, 74, 75, 76, 77 -> not specified sports
    // case 70:  // Cancelled
    // case 71:  // Game 1 (period number: 1)
    // case 71:  // Game 2 (period number: 2)
    // case 73:  // Game 3 (period number: 3)
    // case 74:  // Game 4 (period number: 4)
    // case 75:  // Game 5 (period number: 5)
    // case 76:  // Game 6 (period number: 6)
    // case 77:  // Game 7 (period number: 7)
    //     break;
    // 80 -> soccer, basketball, baseball, ice hockey, tennis, handball, rugby, aussie rules, american football, snooker, table tennis, cricket,
    // darts, volleyball, field hockey, futsal, badminton, bowls, beach volley, squash, counter-strike, LOL, Dota, basketball 3x3, beach handball
    case 80: // Interrupted
      printDatchTime = t("I");
      break;
    // // 81 -> not specified sports
    // case 81:  // Suspended
    //     break;
    // // 90 -> soccer, basketball, baseball, ice hockey, tennis, handball, rugby, aussie rules, american football, snooker, table tennis, cricket,
    // // darts, volleyball, field hockey, futsal, badminton, bowls, beach volley, squash, counter-strike, LOL, Dota, basketball 3x3, beach handball
    // case 90:  // Abandoned
    //     break;
    // // 91, 92 -> not specified sports
    // case 91:  // Walkover
    // case 92:  // Retired
    //     break;
    // // 93, 94, 95, 96 -> tennis, snooker, table tennis, darts, volleyball, badminton, bowls, beach volley, squash, counter-strike, LOL, Dota
    // case 93:  // Walkover, player 1 won
    // case 94:  // Walkover, player 2 won
    // case 95:  // Player 1 retired, player 2 won
    // case 96:  // Player 2 retired, player 1 won
    //     break;
    // // 97, 98 -> snooker, table tennis, darts, badminton, bowls, squash
    // case 97:  // Player 1 defaulted, player 2 won
    // case 98:  // Player 2 defaulted, player 1 won
    //     break;
    // // 99 -> not specified sports
    // case 99:  // Only Result
    //     break;
    // 100 -> soccer, basketball, baseball, ice hockey, tennis, handball, rugby, aussie rules, american football, snooker, table tennis, cricket,
    // darts, volleyball, field hockey, futsal, badminton, bowls, beach volley, squash, counter-strike, LOL, Dota, basketball 3x3, beach handball
    case 100: // Ended
      printDatchTime = t("FT");
      console.log("FT");
      break;
    // 110 -> soccer, basketball, ice hockey, handball, rugby, aussie rules, american football, futsal, basketball 3x3
    case 110: // AET
      printDatchTime = t("awaitingExtraTime");
      break;
    // 111 -> not specified sports
    case 111: // AOT
      printDatchTime = t("AOT");
      break;
    // 120 -> soccer, ice hockey, handball, rugby, field hockey, futsal, beach handball
    case 120: // AP
      printDatchTime = t("awaitingPenalties");
      break;
    // // 130 -> volleyball
    // case 130: // After golden set
    //     break;
    // // 140 -> not specified sports
    // case 140: // After golden raid
    //     break;
    // 141, 142, 143, 144, 145 -> counter-strike, LOL, Dota
    case 141: // 1st map (period number: 1)
      printDatchTime = t("1stMap");
      break;
    case 142: // 2nd map (period number: 2)
      printDatchTime = t("2ndMap");
      break;
    case 143: // 3rd map (period number: 3)
      printDatchTime = t("3rdMap");
      break;
    case 144: // 4th map (period number: 4)
      printDatchTime = t("4thMap");
      break;
    case 145: // 5th map (period number: 5)
      printDatchTime = t("5thMap");
      break;
    // 146, 147 -> counter-strike, Dota
    case 146: // 6th map (period number: 6)
      printDatchTime = t("6thMap");
      break;
    case 147: // 7th map (period number: 7)
      printDatchTime = t("7thMap");
      break;
    // // 151, 152, 153, 154, 155 -> squash
    // case 151: // 1st Game
    // case 152: // 2nd Game
    // case 153: // 3rd Game
    // case 154: // 4th Game
    // case 155: // 5th Game
    //     break;
    // // 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171 -> not specified sports
    // case 161: // 1st end
    // case 162: // 2nd end
    // case 163: // 3rd end
    // case 164: // 4th end
    // case 165: // 5th end
    // case 166: // 6th end
    // case 167: // 7th end
    // case 168: // 8th end
    // case 169: // 9th end
    // case 170: // 10th end
    // case 171: // Extra end
    //     break;
    // 301, 302 -> basketball, ice hockey, aussie rules, american football, table tennis, volleyball, field hockey, badminton, bowls, beach volley, squash, counter-strike, LOL, Dota
    case 301: // First break
    case 302: // Second break
      switch (sport) {
        case 3: // basketball -> 2nd break = halftime
          printDatchTime = t("halfTime");
          break;
        case 5:
          printDatchTime = t("pause");
          break;
        default:
          break;
      }
      break;
    // 303 -> basketball, aussie rules, american football, table tennis, volleyball, field hockey, badminton, bowls, beach volley, squash, counter-strike, LOL, Dota
    case 303: // Third break
    // 304 -> table tennis, volleyball, badminton, bowls, beach volley, squash, counter-strike, LOL, Dota
    case 304: // Fourth break
    // 305, 306 -> table tennis, volleyball, counter-strike, Dota
    case 305: // Fifth break
    case 306: // Sixth break
      switch (sport) {
        case 74: // counter strike
        case 35: // LOL
        case 75: // Dota
          printDatchTime = t("pause");
          break;
        default:
          break;
      }
      break;
    // // 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439 -> baseball
    // case 401: // 1st inning top
    // case 402: // 1st inning bottom
    // case 403: // 2nd inning top
    // case 404: // 2nd inning bottom
    // case 405: // 3rd inning top
    // case 406: // 3rd inning bottom
    // case 407: // 4th inning top
    // case 408: // 4th inning bottom
    // case 409: // 5th inning top
    // case 410: // 5th inning bottom
    // case 411: // 6th inning top
    // case 412: // 6th inning bottom
    // case 413: // 7th inning top
    // case 414: // 7th inning bottom
    // case 415: // 8th inning top
    // case 416: // 8th inning bottom
    // case 417: // 9th inning top
    // case 418: // 9th inning bottom
    // case 419: // Extra inning top
    // case 420: // Extra inning bottom
    // case 421: // Break top 1 bottom 1
    // case 422: // Break top 2 bottom 1
    // case 423: // Break top 2 bottom 2
    // case 424: // Break top 3 bottom 2
    // case 425: // Break top 3 bottom 3
    // case 426: // Break top 4 bottom 3
    // case 427: // Break top 4 bottom 4
    // case 428: // Break top 5 bottom 4
    // case 429: // Break top 5 bottom 5
    // case 430: // Break top 6 bottom 5
    // case 431: // Break top 6 bottom 6
    // case 432: // Break top 7 bottom 6
    // case 433: // Break top 7 bottom 7
    // case 434: // Break top 8 bottom 7
    // case 435: // Break top 8 bottom 8
    // case 436: // Break top 9 bottom 8
    // case 437: // Break top 9 bottom 9
    // case 438: // Break top EI bottom 9
    // case 439: // Break top EI bottom EI
    //     break;
    // // 440 -> rugby, aussie rules, field hockey
    // case 440: // Sudden death
    //     break;
    // // 441, 442 -> table tennis, volleyball
    // case 441: // 6th set (period number: 6)
    // case 442: // 7th set (period number: 7)
    //     break;
    // // 443, 444 -> rugby, aussie rules, field hockey
    // case 443: // Awaiting sudden death
    // case 444: // After sudden death
    //     break;
    // // 445 -> snooker
    // case 445: // Break
    //     break;
    // // 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513 -> cricket
    // case 501: // First innings, home team
    // case 502: // First innings, away team
    // case 503: // Second innings, home team
    // case 504: // Second innings, away team
    // case 505: // Awaiting super over
    // case 506: // Super over, home team
    // case 507: // Super over, away team
    // case 508: // After super over
    // case 509: // Innings break
    // case 510: // Super over break
    // case 511: // Lunch break
    // case 512: // Tea break
    // case 513: // Stumps
    //     break;
    // // 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547 -> not specified sports
    // case 514: // 8th set (period number: 8)
    // case 515: // 9th set (period number: 9)
    // case 516: // 10th set (period number: 10)
    // case 517: // 11th set (period number: 11)
    // case 518: // 12th set (period number: 12)
    // case 519: // 13th set (period number: 13)
    // case 520: // Third innings, home team
    // case 521: // Third innings, away team
    // case 522: // Fourth innings, home team
    // case 523: // Fourth innings, away team
    // case 524: // Dinner Break
    // case 525: // Drinks
    // case 526: // Super over
    // case 531: // 1st inning (period number: 1)
    // case 532: // 2nd inning (period number: 2)
    // case 533: // 3rd inning (period number: 3)
    // case 534: // 4th inning (period number: 4)
    // case 535: // 5th inning (period number: 5)
    // case 536: // 6th inning (period number: 6)
    // case 537: // 7th inning (period number: 7)
    // case 538: // 8th inning (period number: 8)
    // case 539: // 9th inning (period number: 9)
    // case 540: // First round
    // case 541: // Second round
    // case 542: // Third round
    // case 543: // Fourth round
    // case 544: // Fifth round
    // case 545: // Sixth round
    // case 546: // Seventh round
    // case 547: // Break topEI-bottom3
    //     break;
    default:
      // startTime ??
      break;
  }
  return printDatchTime;
}
