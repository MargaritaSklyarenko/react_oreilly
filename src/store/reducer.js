import * as actionTypes from "./actions";

const initialState = {
  courses: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COURSES:
      return {
      ...state,
      courses: action.courses
    };
    case actionTypes.ADD_COURSE:
      return {
        ...state,
        courses: {
          ...state.courses,
          [action.courseId]: state.courses[action.courseId] + 1
        }
      };
    case actionTypes.REMOVE_COURSE:
      const updatedArray = state.courses.filter(
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

export default reducer;
