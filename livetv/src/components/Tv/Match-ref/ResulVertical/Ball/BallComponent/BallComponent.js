import React from "react";
import "./BallComponent.scss";

const ballCompoonent = props => {
    let ballImg = <span>&nbsp;</span>;
    if (props.current === "1") {
        // depending on which player is serving, it displays the ball
        ballImg = <div className="imageDiv">&nbsp;</div>;
    }
    return (
        <div className={["BallComponent", props.className].join(" ")}>
            <div className="BallComponentContent">{ballImg}</div>
        </div>
    );
};

export default ballCompoonent;
