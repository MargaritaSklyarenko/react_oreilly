import React from "react";
import classes from "./Search.module.css";

const Saerch = props => {
    return (
        <input className={classes.Search} type="text" placeholder={props.placeholder}></input>
    );
}

export default Saerch;