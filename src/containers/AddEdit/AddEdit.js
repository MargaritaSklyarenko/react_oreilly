import React, { Component } from "react";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input"
import Axios from "../../components/Axios/Axios";
import LocalhostService from "../../components/LocalhostService/LocalhostService";
import * as actionTypes from "../../store/actions";
import classes from "./AddEdit.module.css"
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Duration from "../../components/Duration/Duration";

import moment from 'moment'


export class AddEdit extends Component {
    axios = new Axios();
    localhostService = new LocalhostService();
    state = {
        addEditForm: {
            title: {
              name: "title",
              elementType: "input",
              label: "Title",
              elementConfig: {
                type: "text",
                placeholder: "Enter title"
              }
            },
            description: {
              name: "description",
              elementType: "input",
              label: "Description",
              elementConfig: {
                type: "Enter description",
                placeholder: "Enter description"
              }
            },
            creationDate: {
                name: "creationDate",
                elementType: "",
                label: "Creation date",
                elementConfig: {
                  type: "text",
                  placeholder: "Enter creation date"
                }
              },
            duration: {
                name: "duration",
                elementType: "input",
                label: "Duration",
                elementConfig: {
                  type: "number",
                  placeholder: "Enter duration"
                }
              },
            authors: {
                name: "authors",
                elementType: "",
                label: "Authors",
                elementConfig: {
                  type: "text",
                  placeholder: "Enter authors"
                }
              }
          },
          values: {
            id: this.props.match.params.id || "",
            title: "",
            description: "",
            creationDate: new Date(),
            duration: "",
            authors: []
          },
          displayErrModal: false
    };

  componentDidMount() {
    if (this.state.values.id !== "" && !!this.props.storedCourses) {
      // use memo and selector 
        const course = this.props.storedCourses.find((course) => course.id === (this.state.values.id ));
        const updatedAddEditForm= { ...this.state.addEditForm };
        const updatedvalues = { ...this.state.values };

        if(!course) {
          return;
        }

        updatedvalues.title = course.title;
        updatedvalues.description = course.description;
        updatedvalues.creationDate = moment(course.creationDate).format("MM.DD.YYYY");
        updatedvalues.duration = course.duration;
        updatedvalues.authors = course.authors;

        this.setState({addEditForm: updatedAddEditForm, values: updatedvalues });
    }
  }

  setNewVal(field, event) {
    let val = field === "creationDate" ? moment(event).format("MM.DD.YYYY") : event.target.value;
    const updatedvalues = { ...this.state.values };

    updatedvalues[field] = val;
    this.setState({values: updatedvalues });
  }

  saveHandler = (event) => {

    event.preventDefault();
    const course = { ...this.state.values };
    this.setState({displayErrModal: false });

    
    
    for (let prop in course) {
      if( course[prop] === "" && prop !== "id") {
        return this.setState({displayErrModal: true });
      } 
    }

    if (this.state.values.id === "" && !!this.props.storedCourses.length) {
      return this.axios.addCourse(course).then(() => this.props.history.push("/courses"));  
    }

    this.axios.editCourse(course).then(() => this.props.history.push("/courses"));
    // doesn't redirect for some reason, fails but updates course
  };

  logOut = () => {
    this.localhostService.setState("", false);
  };

  cancelHandler = () => {
    this.props.history.push("/courses/");
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.addEditForm) {
      formElementsArray.push({
        id: key,
        config: this.state.addEditForm[key]
      });
    }
    let form = (
      <form onSubmit={this.addEditHandler}>
        {formElementsArray.map(formElement => {
          if (formElement.config.elementType === "input") {
            if (formElement.config.elementConfig.type === "number") {
              return (
                <div className={classes.OneRow}>
                  <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    label={formElement.config.label}
                    value={this.state.values[formElement.config.name]}
                    changed={data => this.setNewVal(formElement.config.name, data)}
                  />
                  {this.state.values.id !== "" && !!this.state.values[formElement.config.name] && <Duration duration={this.state.values[formElement.config.name]}></Duration>}
                </div>
              );      
            }
            return (
                <Input
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  label={formElement.config.label}
                  value={this.state.values[formElement.config.name]}
                  changed={data => this.setNewVal(formElement.config.name, data)}
                />
            );
          }
        })}

        <div className={classes.Container && classes.OneRow} style={{padding: "10px"}}>
          <label className={classes.Label}>{this.state.addEditForm.creationDate.label}</label>
          {!!this.state.values.creationDate &&
            <DatePicker selected={(new Date(this.state.values[this.state.addEditForm.creationDate.name]))}
            onChange={date => this.setNewVal(this.state.addEditForm.creationDate.name, date)} />}  
        </div>
        
        <div>
            <Button btnType="Regular" clicked={this.saveHandler}>Save</Button>
            <Button btnType="Regular" clicked={this.cancelHandler}>Cancel</Button>
        </div>
      </form>
    );
    return (
      <div className={classes.Container}>
        <header>
          <Logo height="20%"/>
          <div>
            <p>{this.localhostService.getState().userName}</p>
            <a href='/login' onClick={this.logOut} >log off</a>
          </div>
        </header>
        <p><a href='/courses'>Courses</a> -&gt; { this.state.values.title ? this.state.values.title : "New course"} </p>
        {this.state.displayErrModal && <p>Feel all the fields</p>}
        <main>
            {form}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    storedCourses: state.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEdit);

// export default AddEdit;