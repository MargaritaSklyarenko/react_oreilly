import React, { Component } from "react";
import Course from './Course/Course'
import Logo from "../../components/Logo/Logo";
import Button from "../../components/UI/Button/Button";
import Axios from "../../components/Axios/Axios";
import LocalhostService from "../../components/LocalhostService/LocalhostService";
import  { Redirect } from 'react-router-dom'
import classes from "./Courses.module.css";

export class Courses extends Component {
  axios = new Axios();
  localhostService = new LocalhostService();
  
  state = {
    courses: [],
    showFilteredValue: false,
    searchValue: ""
  };

  componentDidMount() {
    this.updateUsers();
  }

  updateUsers() {
    this.axios.getCourses().then(res =>
      this.setState({courses: res.data })
    );
  }

  deletePostHandler = (event, id) => {
    console.log(event.target.value);
    this.axios.deleteCourse(id).then(() => this.updateUsers());
  };

  editPostHandler = (event, id) => {
    console.log(event.target.value);
    //this.axios.editCourse(id).then(() => {
    return <Redirect to={"/courses/:" + id}  />
    //this.props.history.push("/courses/:" + id);
    //});
  };

  addPostHaandler = () => {
    return <Redirect to='/courses/new' />
    // this.props.history.push("/courses/new"); Doees not work((
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
                    deleteClicked={event => this.editPostHandler(event, course.id)}
                    editClicked={event => this.deletePostHandler(event, course.id)}
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

export default Courses;