import React from "react";
import RAWBG from "../../../../../../Slike/red_down_white_bg.gif";
import RAGBG from "../../../../../../Slike/red_down_gray_bg.gif";
// RAWBG - RedArrowWhiteBackGround
// RAGBG - RedArrowGrayBackGround

const RedArrow = (props) => {
  const imgSrc = props.gray ? RAGBG : RAWBG;
  return (
    <img
      src={imgSrc}
      alt="redArrow"
      className={["redArrow", props.className].join("")}
    />
  );
};

export default RedArrow;
