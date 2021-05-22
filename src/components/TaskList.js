import React, { Component } from "react";
import TaskItem from "./TaskItem";
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1, // all: -1, active: 1, hide: 0
    };
  }
  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    );
  };
  render() {
    var { tasks } = this.props;
    var elmTasks = tasks.map((task, index) => {
      return (
        <TaskItem
          key={task.id}
          index={index}
          task={task}
          onUpdateStatus={this.props.onUpdateStatus}
          onDeleteTask={this.props.onDeleteTask}
          onUpdate={this.props.onUpdate}
        />
      );
    });
    var { filterName, filterStatus } = this.state;
    return (
      <table className='table table-bordered table-hover'>
        <thead>
          <tr>
            <th scope='col' className='text-center'>
              No
            </th>
            <th scope='col' className='text-center'>
              Name
            </th>
            <th scope='col' className='text-center'>
              Status
            </th>
            <th scope='col' className='text-center'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
            <td>
              <input
                type='text'
                className='form-control'
                name='filterName'
                value={filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                className='form-control'
                name='filterStatus'
                id=''
                value={filterStatus}
                onChange={this.onChange}>
                <option value={-1}>All</option>
                <option value={0}>Hide</option>
                <option value={1}>Active</option>
              </select>
            </td>
            <td></td>
          </tr>
          {elmTasks}
        </tbody>
      </table>
    );
  }
}

export default TaskList;
