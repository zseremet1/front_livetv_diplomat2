import React from "react";
import "./App.css";
import LiveFetch from "./hoc/LiveFetch";
import Tv from "./components/Tv/Tv";
function App() {
  return (
    <React.Fragment>
      <LiveFetch />
      <Tv></Tv>
    </React.Fragment>
  );
}

export default App;
