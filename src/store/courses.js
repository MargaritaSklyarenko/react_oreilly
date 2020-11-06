// this file contains action creators for burger builder
import * as actionTypes from "./actions";

export const removeCourse = id => {
  return {
    type: actionTypes.REMOVE_COURSE,
    courseId: id
  };
};

export const setCourses = courses => {
  return {
    type: actionTypes.SET_COURSES,
    courses: courses
  };
};
