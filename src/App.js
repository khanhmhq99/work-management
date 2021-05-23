import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import * as actions from "./actions/index";
import { connect } from "react-redux";
import "./App.css";

class App extends Component {
  onToggleForm = () => {
    let itemEditing = this.props.taskEditing;
    if (itemEditing && itemEditing.id !== "") {
      this.props.onOpenForm();
    } else {
      this.props.onToggleForm();
    }

    this.props.onClearTask({
      id: "",
      name: "",
      status: false,
    });
  };
  render() {
    var { isDisplayForm } = this.props;
    return (
      <div className='container'>
        <div className='text-center'>
          <h1>Work Management</h1>
        </div>
        <div className='row'>
          {/* Form */}
          <div className={isDisplayForm ? "col-4" : "col-0"}>
            <TaskForm />
          </div>
          <div className={isDisplayForm ? "col-8" : "col-12"}>
            <button
              type='button'
              className='btn btn-primary'
              onClick={this.onToggleForm}>
              <span className='fa fa-plus mr-1'></span> Add more work
            </button>
            {/* Search - sort */}
            <Control />
            {/* List */}
            <div className='row mt-3'>
              <div className='col-12'>
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    taskEditing: state.taskEditing,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearTask: (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
