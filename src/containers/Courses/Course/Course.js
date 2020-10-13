import React from "react";
import DateFormatter from "../../../components/DateFormatter/DateFormatter";
import Duration from "../../../components/Duration/Duration";
import Description from "../../../components/Description/Description";
import Authors from "../../../components/Authors/Authors";
import Button from "../../../components/UI/Button/Button";
import classes from "./Course.module.css";

const Course = props => {
    console.log(props);
    return (
      <div className={classes.Course}> 
        <div className={classes.CourseContent}>
            <div>
                <h1>{props.title}</h1>
                <Duration duration={props.duration}></Duration>
                <DateFormatter date={props.creationDate}></DateFormatter>
            </div>
            <Description description={props.description}></Description>
            {/*<Authors authors={props.authors}></Authors>*/}
        </div>
        <div className={classes.Buttons}>
            <Button btnType="Regular">Edit course</Button>
            <Button btnType="Regular">Delete course</Button>
        </div>
    </div>
    );
}

export default Course;