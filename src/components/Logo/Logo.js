import React from "react";
import Logo from "../../assets/courses.png";
import classes from "./Logo.module.css";
const logo = props => {
  return (
    <div className={classes.Logo} style={{ height: props.height }}>
      <img src={Logo} alt="Logo" />
    </div>
  );
};

export default logo;
