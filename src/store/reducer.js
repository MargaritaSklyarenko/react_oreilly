import * as actionTypes from "./actions";
// import { createSelector } from 'reselect';

const { List } = require('immutable');
const initialState = {};

initialState.courses = List([]);

const getCourses = initialState.courses;
// const coursesSelector = state => state.get('courses');
/*∂const coursesSelector = createSelector(
    [getCourses],
    (courses) => courses
);*/

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COURSES:
      return {
      ...state,
      courses: action.courses
    };
    case actionTypes.REMOVE_COURSE:
      const updatedArray = getCourses.filter(
        course => course.id !== action.courseId
      );
      return {
        ...state,
        courses: updatedArray
      };
    default:
      return state;
  }
};

// console.log(coursesSelector(state))   

export default reducer;
