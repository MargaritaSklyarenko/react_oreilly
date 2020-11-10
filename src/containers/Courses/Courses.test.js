import React from "react";
import reducer from "../../store/reducer";
import * as actionTypes from "../../store/actions";

import { configure, shallow } from "enzyme";
import Adaptor from "enzyme-adapter-react-16";

import ShowCoursesWithRouter from "./Courses";
import Course from './Course/Course';


configure({ adapter: new Adaptor() });

describe("<Courses />", () => {
  let wrapper, instance;
  beforeEach(() => {
    wrapper = shallow(<ShowCoursesWithRouter onSetCourses={() => {}} />);
    instance = wrapper.instance();
    console.log("wrapper", wrapper);
  });
  it("should render <Courses /> when receiving courses", () => {
    //wrapper = shallow(<ShowCoursesWithRouter onSetCourses={() => {}}/>);
    //console.log("wrapper", wrapper);
    //instance = wrapper.instance();
    reducer(
        { courses: [] },
        {
          type: actionTypes.SET_COURSES,
          courses: [ {
            "id": "0",
            "title": "From Zero to RHCSA",
            "creationDate": "2000-01-03T00:00:00.000Z",
            "duration": 15,
            "description": "Welcome to From Zero to RHCSA: 10 Weeks to Becoming RHCSA Certified by Sander van Vugt. This is the ultimate training tool for getting Red Hat RHCSA certified. In this 10-week program Sander van Vugt will guide you through a learning journey that builds on the knowledge you gain each week and walk you through key study elements for the exam. This Learning Path includes video lessons, chapter reading, exercises, labs and practice exams.",
            "authors": [ "Chop-suey Chinese", "Alfreds Futterkiste"]
        },
        {
            "id": "1",
            "title": "InnerSource",
            "creationDate": "2012-04-23T00:00:00.000Z",
            "duration": 23,
            "description": "InnerSource is the application of open source methodologies to internally-developed software. While simple to define, InnerSource can be difficult to explain and implement successfully. Many engineers lack background in open source and the ideas and mechanics of open code development. Even those with that background face a new set of constraints and motivations when trying to work openly within the enterprise. This learning path gives a simple, easy to understand introduction to InnerSource. It introduces key terms, concepts, and principles for effective InnerSource along with explanations and real examples. It is intended to bring newcomers up to speed as well as provide those with experience a common vocabulary to use when discussing more advanced concepts.",
            "authors": [ "Ernst Handel", "Chop-suey Chinese", "Maison Dewey"]
        }]
        }
      );
    console.log("wrapper", instance);
    //console.log("wrapper", instance.h);
    /*instance.setCourses({ courses: [ {
        "id": "0",
        "title": "From Zero to RHCSA",
        "creationDate": "2000-01-03T00:00:00.000Z",
        "duration": 15,
        "description": "Welcome to From Zero to RHCSA: 10 Weeks to Becoming RHCSA Certified by Sander van Vugt. This is the ultimate training tool for getting Red Hat RHCSA certified. In this 10-week program Sander van Vugt will guide you through a learning journey that builds on the knowledge you gain each week and walk you through key study elements for the exam. This Learning Path includes video lessons, chapter reading, exercises, labs and practice exams.",
        "authors": [ "Chop-suey Chinese", "Alfreds Futterkiste"]
    }]});*/
    // Не знаю как достать то, что мне нужно
    expect(wrapper.find(Course)).toHaveLength(0);
  });
});
