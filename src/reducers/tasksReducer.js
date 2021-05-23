import * as types from "../constants/ActionTypes";
import _ from "lodash";

var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [];

var s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

var randomId = () => {
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

var tasksReducer = (state = initialState, action) => {
  let id = -1;
  let index = -1;
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    case types.SAVE_TASK:
      let newTask = {
        id: action.task.id,
        name: action.task.name,
        status: action.task.status,
      };
      if (!newTask.id) {
        newTask.id = randomId();
        state.push(newTask);
      } else {
        index = _.findIndex(state, (task) => {
          return task.id === newTask.id;
        });
        state[index] = newTask;
      }

      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.UPDATE_STATUS_TASK:
      id = action.id;
      index = _.findIndex(state, (task) => {
        return task.id === id;
      });
      state[index] = {
        ...state[index],
        status: !state[index].status,
      };
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.DELETE_TASK:
      id = action.id;
      index = _.findIndex(state, (task) => {
        return task.id === id;
      });
      state.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    default:
      return state;
  }
};

export default tasksReducer;
