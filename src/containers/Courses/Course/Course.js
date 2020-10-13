import React, { Component }  from "react";
import DateFormatter from "../../../components/DateFormatter/DateFormatter";
import Duration from "../../../components/Duration/Duration";
import Description from "../../../components/Description/Description";
import Authors from "../../../components/Authors/Authors";
import Button from "../../../components/UI/Button/Button";
import classes from "./Course.module.css";

class Course extends Component {
    render() {
        return (
        <div className={classes.Course}> 
            <div className={classes.CourseContent}>
                <div>
                    <h1>{this.props.title}</h1>
                    <Duration duration={this.props.duration}></Duration>
                    <DateFormatter date={this.props.creationDate}></DateFormatter>
                </div>
                <Description description={this.props.description}></Description>
                {/*<Authors authors={props.authors}></Authors>*/}
            </div>
            <div className={classes.Buttons}>
                <Button btnType="Regular" clicked={this.props.editClicked}>Edit course</Button>
                <Button btnType="Regular" clicked={this.props.deleteClicked}>Delete course</Button>
            </div>
        </div>
        );
    }
}

export default Course;