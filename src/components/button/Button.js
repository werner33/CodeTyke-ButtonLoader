import React from "react";

import "./Styles.scss";

const Button = (props) => {
  const {
    inactive,
    rightIconPath,
    handleSubmit,
    label,
    leftIconPath,
    loading,
  } = props;

  const leftIcon = leftIconPath;
  const rightIcon = (
    <img className="submitButton--loadingIcon" src={rightIconPath} />
  );
  return (
    <div
      className={"submitButton " + (inactive ? "submitButton--inactive" : "")}
      onClick={handleSubmit}
    >
      {leftIcon}
      {label} {loading ? rightIcon : null}
    </div>
  );
};

export default Button;
