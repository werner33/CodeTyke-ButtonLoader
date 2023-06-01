import React from "react";
import loadingLogo from "../../assets/loading-gif.gif";

import "./Styles.scss";

const Button = (props) => {
  return (
    <div
      id="submitAnswerButton"
      className={
        "submitButton " + (props.inactive ? "submitButton--inactive" : "")
      }
      onClick={props.handleSubmit}
    >
      <div>{props.leftIcon}</div>
      <div>{props.label}</div>
      <div>
        <img src={props.rightIcon ? loadingLogo : " "} />
      </div>
    </div>
  );
};

export default Button;
