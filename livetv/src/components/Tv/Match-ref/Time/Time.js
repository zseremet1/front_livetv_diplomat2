import React from "react";
import "./Time.scss";
import { DisplayTimeByStatus } from "../../../../hooks/custom/displayTimeByStatus";

const Time = (props) => {
  let printDatchTime = null;
  console.log("timeee", props);

  if (props.time) {
    // printDatchTime = DateFormat(
    //   new Date(props.time * 1000 + (window.$timezoneOffset || 0) * 60 * 1000),
    //   "MM'"
    // );
    printDatchTime = DisplayTimeByStatus(
      props.sportId,
      props.eventStatus,
      props.time
    );
  }

  // console.log("printtt",printDatchTime);
  // if (props.eventStatus && props.eventStatus.c) {
  //   //console.log("time",props.idEvent, props.eventStatus);
  //   printDatchTime =
  //     parseInt(props.eventStatus.c.mtT?.split(":")[0], 10) + 1 + "'";
  // }
  if (printDatchTime === "undefined'") {
    printDatchTime = "  ";
  }
  return (
    <span className={["live-match-time", `sport${props.sportId}`].join(" ")}>
      {/* {printDatchTime === "00'" ? "HT" : printDatchTime} */}
      {printDatchTime}
    </span>
  );
};

export default Time;
