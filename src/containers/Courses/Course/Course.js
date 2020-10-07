import React from "react";
import Date from "../../../components/Date/Date";
import Duration from "../../../components/Description/Duration/Duration";
import Description from "../../../components/Description/Description";
import Authors from "../../../components/Authors/Authors";
import Button from "../../../components/UI/Button/Button";

const Course = props => {
    return (
      <div > 
        <div>
            <h1>{props.title}</h1>
            <Date date={props.cretionDate}></Date>
            <Duration duration={props.duration}></Duration>
            <Description description={props.description}></Description>
            <Authors authors={props.authors}></Authors>
        </div>
        <div>
            <Button btnType="Regular">Edit course</Button>
            <Button btnType="Regular">Delete course</Button>
        </div>
    </div>
    );
}

export default Course;