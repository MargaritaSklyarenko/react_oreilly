
import React, { useEffect, useState, useCallback } from "react";
import Course from './Course/Course'
import Logo from "../../components/Logo/Logo";
import Button from "../../components/UI/Button/Button";
import Axios from "../../components/Axios/Axios";
import LocalhostService from "../../components/LocalhostService/LocalhostService";
import * as actions from "../../store/courses";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import classes from "./Courses.module.css";
import { withRouter } from "react-router";

const Courses = props =>  {
  const axios = new Axios();
  const localhostService = new LocalhostService();
 
  const propTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    };
    
  const dispatch = useDispatch();

  const onCourseRemoved = useCallback(id => dispatch(actions.removeCourse(id)), [dispatch]);
  const onSetCourses = useCallback(courses => dispatch(actions.setCourses(courses)), [dispatch]);

  const [courses, setCourses] = useState([]);
  const [showFilteredValue, setShowFilteredValue] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    updateUsers();
  }, [onCourseRemoved, onSetCourses]);

  const updateUsers = () => {
    axios.getCourses().then(res => {
      setCourses(res.data);
      onSetCourses(res.data);
      }
    );
  }

  const deletePostHandler = (id) => {
    onCourseRemoved(id);
    axios.deleteCourse(id).then(() => updateUsers());
  };

  const editPostHandler = (id) => {;
    props.history.push("/courses/" + id);
  };

  const addPostHaandler = () => {
    // withRouter hock 
    props.history.push("/courses/new");
  }

  const searchCourse = () => {
    setShowFilteredValue(true);
  }

  const logOut = () => {
    localhostService.setState("", false);
  };

  const updateInputValue = (evt) => {
    setSearchValue(evt.target.value)
  };

  
    return (
      <div className={classes.Courses}>
        <header>
          <Logo height="20%"/>
          <div>
            <p>{localhostService.getState().userName}</p>
            <a href='/login' onClick={logOut} >log off</a>
          </div>
        </header>
        <nav>
            <div>   
                <input className={classes.Search} value={searchValue} type="text" placeholder="Search by title" onChange={updateInputValue}></input>
                <Button btnType="Regular" clicked = {searchCourse} >Search</Button>
            </div>
          <Button btnType="Regular" clicked = {addPostHaandler}>Add course</Button>
        </nav>
        <main>
            <div>
                {  
                courses
                  .filter(course => {
                    if( !showFilteredValue || searchValue === "") {
                      return true;
                    }
                    return course.title === searchValue;
                  })
                  .map(course => (
                  <Course
                    key={course.id}
                    id={course.id}
                    title = {course.title}
                    creationDate = {course.creationDate}
                    editClicked={id => editPostHandler(course.id)}
                    deleteClicked={id => deletePostHandler(course.id)}
                    duration = {course.duration}
                    description = {course.description}
                    authors = {course.authors}
                />
                ))}
            </div>
        </main>
      </div>
    );
  };


const ShowCoursesWithRouter = withRouter(Courses)

export default ShowCoursesWithRouter;

/*
const ShowCoursesWithRouter = withRouter(Courses);
export default Courses;*/