import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import _ from "lodash";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1,
      },
      keyWord: "",
      sort: {
        by: "name",
        value: 1,
      },
    };
  }
  componentDidMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null,
      });
    }
  };
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };
  onOpenForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  generateId() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }

  onSubmit = (data) => {
    let { tasks } = this.state;
    if (data.id === "") {
      //add
      let task = {
        id: this.generateId(),
        name: data.name,
        status: data.status,
      };
      tasks.push(task);
    } else {
      //Editing
      let index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks: tasks,
      taskEditing: null,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onUpdateStatus = (id) => {
    let { tasks } = this.state;
    // let index = this.findIndex(id);
    let index = _.findIndex(tasks, (task) => {
      return task.id === id;
    });
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
    }
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onDeleteTask = (id) => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.onCloseForm();
  };

  onUpdate = (id) => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    let taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing,
    });
    this.onOpenForm();
  };

  onFilter = (name, status) => {
    status = parseInt(status, 10);
    this.setState({
      filter: {
        name: name.toLowerCase(),
        status: status,
      },
    });
  };
  onSearch = (value) => {
    this.setState({
      keyWord: value.toLowerCase(),
    });
  };

  onSort = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue,
      },
    });
  };
  findIndex = (id) => {
    let { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };

  render() {
    var { tasks, isDisplayForm, taskEditing, filter, keyWord, sort } =
      this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      if (filter.status != null) {
        tasks = tasks.filter((task) => {
          if (filter.status === -1) {
            return tasks;
          } else {
            return task.status === (filter.status === 1 ? true : false);
          }
        });
      }
    }

    if (keyWord != null) {
      // tasks = tasks.filter((task) => {
      //   return task.name.toLowerCase().indexOf(keyWord) !== -1;
      // });
      tasks = _.filter(tasks, (task) => {
        return task.name.toLowerCase().indexOf(keyWord) !== -1;
      });
    }

    

    if (sort.by === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else if (sort.by === "status") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return -sort.value;
        else if (a.name < b.name) return sort.value;
        else return 0;
      });
    }
    var elmForm = isDisplayForm ? (
      <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
      />
    ) : (
      ""
    );
    return (
      <div className='container'>
        <div className='text-center'>
          <h1>Work Management</h1>
        </div>
        <div className='row'>
          {/* Form */}
          <div className={isDisplayForm ? "col-4" : "col-0"}>{elmForm}</div>
          <div className={isDisplayForm ? "col-8" : "col-12"}>
            <button
              type='button'
              className='btn btn-primary'
              onClick={this.onToggleForm}>
              <span className='fa fa-plus mr-1'></span> Add more work
            </button>
            {/* Search - sort */}
            <Control onSearch={this.onSearch} onSort={this.onSort} />
            {/* List */}
            <div className='row mt-3'>
              <div className='col-12'>
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDeleteTask={this.onDeleteTask}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
