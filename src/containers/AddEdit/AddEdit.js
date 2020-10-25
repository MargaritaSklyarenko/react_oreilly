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
        startDate: new Date(),
        addEditForm: {
            title: {
              elementType: "input",
              label: "Title",
              elementConfig: {
                type: "text",
                placeholder: "Enter title"
              },
              value: ""
            },
            description: {
              elementType: "input",
              label: "Description",
              elementConfig: {
                type: "Enter description",
                placeholder: "Enter description"
              },
              value: ""
            },
            creationDate: {
                elementType: "",
                label: "Creation date",
                elementConfig: {
                  type: "text",
                  placeholder: "Enter creation date"
                },
                value: ""
              },
            duration: {
                elementType: "input",
                label: "Duration",
                elementConfig: {
                  type: "number",
                  placeholder: "Enter duration"
                },
                value: ""
              },
            authors: {
                elementType: "",
                label: "Authors",
                elementConfig: {
                  type: "text",
                  placeholder: "Enter authors"
                },
                value: ""
              }
          }
    };

  componentDidMount() {
    


    // <DatePicker selected={new Date(moment(this.state.addEditForm.creationDate.value).format("DD.MM.YYYY"))} onChange={date => this.setState({startDate: date })} />
    if (this.state.id !== "" && !!this.props.storedCourses) {
        let course = this.props.storedCourses.find((course) => course.id === (this.state.id ));
        const updatedAddEditForm= { ...this.state.addEditForm };


        if(!course) {
          return;
        }

        updatedAddEditForm.title.value = course.title;
        updatedAddEditForm.description.value = course.description;
        updatedAddEditForm.creationDate.value = course.creationDate;
        updatedAddEditForm.duration.value = course.duration;
        updatedAddEditForm.authors.value = course.authors;

        this.setState({addEditForm: updatedAddEditForm });
    }
  }

  render() {
    const formElementsArray = [];
    console.log(new Date('12.1.1995'));
    console.log(this.state.addEditForm.creationDate.value);
    console.log( moment(this.state.addEditForm.creationDate.value).format("MM.DD.YYYY"));
    console.log((Date.parse("1.10.2000")));
    console.log((new Date(moment(this.state.addEditForm.creationDate.value).format("MM.DD.YYYY"))));
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
                    value={formElement.config.value}
                    changed={()=>{}}
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
                  value={formElement.config.value}
                  changed={()=>{}}
                />
            );
          }
        })}

        <div className={classes.Container && classes.OneRow} style={{padding: "10px"}}>
          <label className={classes.Label}>{this.state.addEditForm.creationDate.label}</label>
          {!!this.state.addEditForm.creationDate.value &&
          <DatePicker selected={(new Date(moment(this.state.addEditForm.creationDate.value).format("MM.DD.YYYY")))} onChange={date => this.setState({startDate: date })} />}  
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