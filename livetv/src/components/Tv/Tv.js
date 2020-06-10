import React from "react";
import { useLive } from "../../hooks/useLive";
import Header from "./Header/Header";
const Tv = (props) => {
  const [liveState] = useLive();

  console.log("liveState", liveState);
  return (
    <div className="App">
      <Header />
    </div>
  );
};

export default Tv;
