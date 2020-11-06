import React, { useEffect, useState } from "react";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input"
import Axios from "../../components/Axios/Axios";
import LocalhostService from "../../components/LocalhostService/LocalhostService";
import classes from "./AddEdit.module.css"
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import Duration from "../../components/Duration/Duration";

import moment from 'moment'


const AddEdit = props => {

    const axios = new Axios();
    const localhostService = new LocalhostService();
    
    const storedCourses = useSelector(state => {
      return state.courses;
    });

    const [addEditForm, setAddEditForm] = useState({
      
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
        });

       const [values, setValues] = useState({
          id: props.match.params.id || "",
          title: "",
          description: "",
          creationDate: new Date(),
          duration: "",
          authors: []
        });
        
  const [displayErrModal, setDisplayErrModal] = useState(false);

  useEffect(() => {
    console.log(addEditForm, values, storedCourses);
    if (values.id !== "" && !!storedCourses) {
      // use memo and selector 
        const course = storedCourses.find((course) => course.id === (values.id ));
        const updatedAddEditForm= { ...addEditForm };
        const updatedvalues = { ...values };

        if(!course) {
          return;
        }

        updatedvalues.title = course.title;
        updatedvalues.description = course.description;
        updatedvalues.creationDate = moment(course.creationDate).format("MM.DD.YYYY");
        updatedvalues.duration = course.duration;
        updatedvalues.authors = course.authors;

        setAddEditForm(updatedAddEditForm);
        setValues(updatedvalues);
        
    }
  }, []);

  const setNewVal = (field, event) => {
    let val = field === "creationDate" ? moment(event).format("MM.DD.YYYY") : event.target.value;
    const updatedvalues = { ...values };

    updatedvalues[field] = val;
    setValues(updatedvalues);
  };

  const saveHandler = (event) => {

    event.preventDefault();
    const course = { ...values };
    setDisplayErrModal(false);
    
    for (let prop in course) {
      if( course[prop] === "" && prop !== "id") {
        return setDisplayErrModal(true);
      } 
    }

    if (values.id === "") {
      return axios.addCourse(course).then(() => props.history.push("/courses"));  
    }

    axios.editCourse(course).then(() => props.history.push("/courses"));
    // doesn't redirect for some reason, fails but updates course
  };

  const logOut = () => {
    localhostService.setState("", false);
  };

  const cancelHandler = () => {
    props.history.push("/courses/");
  }

    const formElementsArray = [];
    for (let key in addEditForm) {
      formElementsArray.push({
        id: key,
        config: addEditForm[key]
      });
    }
    let form = (
      <form>
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
                    value={values[formElement.config.name]}
                    changed={data => setNewVal(formElement.config.name, data)}
                  />
                  {values.id !== "" && !!values[formElement.config.name] && <Duration duration={values[formElement.config.name]}></Duration>}
                </div>
              );      
            }
            return (
                <Input
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  label={formElement.config.label}
                  value={values[formElement.config.name]}
                  changed={data => setNewVal(formElement.config.name, data)}
                />
            );
          }
          return <br></br>;
        })}

        <div className={classes.Container && classes.OneRow} style={{padding: "10px"}}>
          <label className={classes.Label}>{addEditForm.creationDate.label}</label>
          {!!values.creationDate &&
            <DatePicker selected={(new Date(values[addEditForm.creationDate.name]))}
            onChange={date => setNewVal(addEditForm.creationDate.name, date)} />}  
        </div>
        
        <div>
            <Button btnType="Regular" clicked={saveHandler}>Save</Button>
            <Button btnType="Regular" clicked={cancelHandler}>Cancel</Button>
        </div>
      </form>
    );
    return (
      <div className={classes.Container}>
        <header>
          <Logo height="20%"/>
          <div>
            <p>{localhostService.getState().userName}</p>
            <a href='/login' onClick={logOut} >log off</a>
          </div>
        </header>
        <p><a href='/courses'>Courses</a> -&gt; { values.title ? values.title : "New course"} </p>
        {displayErrModal && <p>Feel all the fields</p>}
        <main>
            {form}
        </main>
      </div>
    );
};


export default AddEdit;
