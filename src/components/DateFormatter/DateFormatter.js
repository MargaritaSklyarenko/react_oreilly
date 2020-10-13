import React from "react";
import moment from 'moment'


const DateFormatter = props => {
    return <h4>{moment(props.date).format("DD.MM.YYYY")}</h4>;
}

export default DateFormatter;