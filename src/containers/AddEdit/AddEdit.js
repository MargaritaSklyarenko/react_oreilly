import React, { Component } from "react";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input"
import Axios from "../../components/Axios/Axios";
import * as actionTypes from "../../store/actions";
import classes from "./AddEdit.module.css"
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Duration from "../../components/Duration/Duration";

import moment from 'moment'


export class AddEdit extends Component {
    axios = new Axios();
    state = {
        id: this.props.match.params.id,
        addEditForm: {
            title: {
              name: "title",
              elementType: "input",
              label: "Title",
              elementConfig: {
                type: "text",
                placeholder: "Enter title"
              },
              value: ""
            },
            description: {
              name: "description",
              elementType: "input",
              label: "Description",
              elementConfig: {
                type: "Enter description",
                placeholder: "Enter description"
              },
              value: ""
            },
            creationDate: {
                name: "creationDate",
                elementType: "",
                label: "Creation date",
                elementConfig: {
                  type: "text",
                  placeholder: "Enter creation date"
                },
                value: new Date()
              },
            duration: {
                name: "duration",
                elementType: "input",
                label: "Duration",
                elementConfig: {
                  type: "number",
                  placeholder: "Enter duration"
                },
                value: ""
              },
            authors: {
                name: "authors",
                elementType: "",
                label: "Authors",
                elementConfig: {
                  type: "text",
                  placeholder: "Enter authors"
                },
                value: ""
              }
          },
          newValues: {
            title: "",
            description: "",
            creationDate: new Date(),
            duration: "",
            authors: []
          }
    };

  componentDidMount() {
    if (this.state.id !== "" && !!this.props.storedCourses) {
        const course = this.props.storedCourses.find((course) => course.id === (this.state.id ));
        const updatedAddEditForm= { ...this.state.addEditForm };
        const updatedNewValues = { ...this.state.newValues };

        if(!course) {
          return;
        }

        updatedAddEditForm.title.value = course.title;
        updatedAddEditForm.description.value = course.description;
        updatedAddEditForm.creationDate.value = moment(course.creationDate).format("MM.DD.YYYY");
        updatedAddEditForm.duration.value = course.duration;
        updatedAddEditForm.authors.value = course.authors;
        updatedNewValues.title = course.title;
        updatedNewValues.description = course.description;
        updatedNewValues.creationDate = moment(course.creationDate).format("MM.DD.YYYY");
        updatedNewValues.duration = course.duration;
        updatedNewValues.authors = course.authors;

        this.setState({addEditForm: updatedAddEditForm, newValues: updatedNewValues });
    }
  }

  setNewVal(field, event) {
    let val = field === "creationDate" ? moment(event).format("MM.DD.YYYY") : event.target.value
    const updatedNewValues = { ...this.state.newValues };

    updatedNewValues[field] = val;

    this.setState({newValues: updatedNewValues });
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
                    value={this.state.newValues[formElement.config.name]}
                    changed={data => this.setNewVal(formElement.config.name, data)}
                  />
                  {this.state.id !== "" && !!formElement.config.value && <Duration duration={formElement.config.value}></Duration>}
                </div>
              );      
            }
            return (
                <Input
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  label={formElement.config.label}
                  value={this.state.newValues[formElement.config.name]}
                  changed={data => this.setNewVal(formElement.config.name, data)}
                />
            );
          }
        })}

        <div className={classes.Container && classes.OneRow} style={{padding: "10px"}}>
          <label className={classes.Label}>{this.state.addEditForm.creationDate.label}</label>
          {!!this.state.addEditForm.creationDate.value &&
            <DatePicker selected={(new Date(this.state.newValues[this.state.addEditForm.creationDate.name]))}
            onChange={date => this.setNewVal(this.state.addEditForm.creationDate.name, date)} />}  
        </div>
        
        <div>
            <Button btnType="Regular">Save</Button>
            <Button btnType="Regular">Cancel</Button>
        </div>
      </form>
    );
    return (
      <div className={classes.Container}>
        <header>
          <Logo height="20%"/>
        </header>
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
    /*onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
    onIncrementValue: () =>
      dispatch({ type: actionTypes.INCREMENT_VAL, value: 5 }),
    onDecrementValue: () =>
      dispatch({ type: actionTypes.DECREMENT_VAL, value: 5 }),
    onStoreResult: result =>
      dispatch({ type: actionTypes.STORE_RESULT, result: result }),
    onDeleteResult: id =>
      dispatch({ type: actionTypes.DELETE_RESULT, resultElId: id })*/
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEdit);

// export default AddEdit;