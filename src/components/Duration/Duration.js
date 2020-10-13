import React from "react";
 
const Duration = props => {
    const hours = Math.floor(props.duration /60);
    const mins = props.duration % 60;
   
    return <h4>{!hours ? "" : (hours ===1 ? hours + " hour" : hours + ' hours')} {mins} minutes</h4>;
}

export default Duration;