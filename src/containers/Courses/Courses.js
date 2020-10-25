import React, { Component } from "react";
import Course from './Course/Course'
import Logo from "../../components/Logo/Logo";
import Button from "../../components/UI/Button/Button";
import Axios from "../../components/Axios/Axios";
import LocalhostService from "../../components/LocalhostService/LocalhostService";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classes from "./Courses.module.css";
import * as actionTypes from "../../store/actions";
import { withRouter } from "react-router";

export class Courses extends Component {
  axios = new Axios();
  localhostService = new LocalhostService();

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  
  state = {
    courses: [],
    showFilteredValue: false,
    searchValue: ""
  };

  componentDidMount() {
    this.updateUsers();
  }

  updateUsers() {
    this.axios.getCourses().then(res => {
        this.setState({courses: res.data })
        this.props.onSetCourses(res.data);
      }
    );
  }

  deletePostHandler = (id) => {
    this.props.onCourseRemoved(id);
    this.axios.deleteCourse(id).then(() => this.updateUsers());
  };

  editPostHandler = (id) => {;
    //this.axios.editCourse(id).then(() => {
    this.props.history.push("/courses/" + id);
    //});
  };

  addPostHaandler = () => {
    // withRouter hock 
    this.props.history.push("/courses/new");
  }

  searchCourse = () => {
    this.setState({ showFilteredValue: true });

    console.log(this.state);
  }

  logOut = () => {
    this.localhostService.setState("", false);
  };

  updateInputValue = (evt) => {
    this.setState({searchValue: evt.target.value })
  };

  render() {
    return (
      <div className={classes.Courses}>
        <header>
          <Logo height="20%"/>
          <div>
            <p>{this.localhostService.getState().userName}</p>
            <a href='/login' onClick={this.logOut} >log off</a>
          </div>
        </header>
        <nav>
            <div>   
                <input className={classes.Search} value={this.state.searchValue} type="text" placeholder="Search by title" onChange={this.updateInputValue}></input>
                <Button btnType="Regular" clicked = {this.searchCourse} >Search</Button>
            </div>
          <Button btnType="Regular" clicked = {this.addPostHaandler}>Add course</Button>
        </nav>
        <main>
            <div>
                {  
                this.state.courses
                  .filter(course => {
                    if( !this.state.showFilteredValue || this.state.searchValue === "") {
                      return true;
                    }
                    return course.title === this.state.searchValue;
                  })
                  .map(course => (
                  <Course
                    key={course.id}
                    id={course.id}
                    title = {course.title}
                    creationDate = {course.creationDate}
                    editClicked={id => this.editPostHandler(course.id)}
                    deleteClicked={id => this.deletePostHandler(course.id)}
                    duration = {course.duration}
                    description = {course.description}
                    authors = {course.authors}
                />
                ))}
            </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCourseRemoved: (id) => 
      dispatch({ type: actionTypes.REMOVE_COURSE, courseId: id }),
    onSetCourses: (courses) => 
      dispatch({ type: actionTypes.SET_COURSES, courses: courses })
  };
};

const ShowCoursesWithRouter = withRouter(Courses)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowCoursesWithRouter);

/*
const ShowCoursesWithRouter = withRouter(Courses);
export default Courses;*/