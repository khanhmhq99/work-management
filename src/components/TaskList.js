import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import _ from "lodash";
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
    let filter = {
      name: name === "filterName" ? value : this.state.filterName,
      status:
        name === "filterStatus"
          ? parseInt(value)
          : parseInt(this.state.filterStatus),
    };
    this.props.onFilterTable(filter);
  };
  render() {
    var { tasks, filterTask, searchTask, sortTask } = this.props;
    //Filter task
    if (filterTask) {
      if (filterTask.name) {
        tasks = tasks.filter((task) => {
          return (
            task.name.toLowerCase().indexOf(filterTask.name.toLowerCase()) !==
            -1
          );
        });
      }
      if (filterTask.status != null) {
        tasks = tasks.filter((task) => {
          if (filterTask.status === -1) {
            return tasks;
          } else {
            return task.status === (filterTask.status === 1 ? true : false);
          }
        });
      }
    }
    //Search
    if (searchTask != null) {
      // tasks = tasks.filter((task) => {
      //   return task.name.toLowerCase().indexOf(searchTask.toLowerCase()) !== -1;
      // });
      tasks = _.filter(tasks, (task) => {
        return task.name.toLowerCase().indexOf(searchTask.toLowerCase()) !== -1;
      });
    }
    //sort
    if (sortTask.by === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortTask.value;
        else if (a.name < b.name) return -sortTask.value;
        else return 0;
      });
    } else if (sortTask.by === "status") {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sortTask.value;
        else if (a.status < b.status) return sortTask.value;
        else return 0;
      });
    }
    var elmTasks = tasks.map((task, index) => {
      return <TaskItem key={task.id} index={index} task={task} />;
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

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filterTask: state.filterTask,
    searchTask: state.searchTask,
    sortTask: state.sortTask,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: (filter) => {
      dispatch(actions.filterTask(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
