import React from "react";
import GAWBG from "../../../../../../Slike/green_up_white_bg.gif";
import GAGBG from "../../../../../../Slike/green_up_gray_bg.gif";
import "./Arrow.scss";
// GAWBG - GreenArrowWhiteBackGround
// GAGBG - GreenArrowGrayBackGround

const GreenArrow = (props) => {
  const imgSrc = props.gray ? GAGBG : GAWBG;
  return (
    <img
      src={imgSrc}
      alt="greenArrow"
      className={["greenArrow", props.className].join("")}
    />
  );
};

export default GreenArrow;
