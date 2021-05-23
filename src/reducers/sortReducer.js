import * as types from "../constants/ActionTypes";

var initialState = {
  by: "name",
  value: 1,
};

var sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SORT:
      return action.sortVar;
    default:
      return state;
  }
};

export default sortReducer;
