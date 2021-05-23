import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };
  onDeleteTask = () => {
    this.props.onDeleteTask(this.props.task.id);
    this.props.onCloseForm();
  };
  onEditTask = () => {
    this.props.onOpenForm();
    this.props.onEditTask(this.props.task);
  };
  render() {
    var { task, index } = this.props;
    return (
      <tr>
        <th className='text-center'>{index + 1}</th>
        <td>{task.name}</td>
        <td className='text-center'>
          {task.status ? (
            <span className='badge badge-success' onClick={this.onUpdateStatus}>
              Active
            </span>
          ) : (
            <span className='badge badge-danger' onClick={this.onUpdateStatus}>
              Hide
            </span>
          )}
        </td>
        <td className='text-center'>
          <button
            type='button'
            className='btn btn-info btn-sm mr-1'
            onClick={this.onEditTask}>
            <span className='fa fa-pencil mr-1'></span> Edit
          </button>
          <button
            type='button'
            className='btn btn-danger btn-sm'
            onClick={this.onDeleteTask}>
            <span className='fa fa-trash mr-1'></span> Delete
          </button>
        </td>
      </tr>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatus: (id) => {
      dispatch(actions.updateStatus(id));
    },
    onDeleteTask: (id) => {
      dispatch(actions.deleteTask(id));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
    onEditTask: (task) => {
      dispatch(actions.editTask(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
