import { combineReducers } from "redux";
import tasksReducer from "./tasksReducer";
import displayFormReducer from "./displayFormReducer";
import taskEditingReducer from "./taskEditingReducer";
import filterTaskReducer from "./filterTaskReducer";
import searchReducer from "./searchReducer";
import sortReducer from "./sortReducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  isDisplayForm: displayFormReducer,
  taskEditing: taskEditingReducer,
  filterTask: filterTaskReducer,
  searchTask: searchReducer,
  sortTask: sortReducer,
});

export default rootReducer;
