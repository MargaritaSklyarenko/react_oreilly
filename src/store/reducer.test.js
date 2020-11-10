import reducer from "./reducer";
import * as actionTypes from "./actions";

describe("reducer", () => {
  it("should return the state", () => {
    expect(reducer({}, {})).toEqual({});
  });

  it("should store the courses", () => {
    expect(
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
      )
    ).toEqual({
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
    });
  });
});
