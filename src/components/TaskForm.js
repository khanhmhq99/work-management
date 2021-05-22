import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false,
    };
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (name === "status") {
      value === "true" ? (value = true) : (value = false);
    }
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    //Clear & close
    this.onClear();
    this.onCloseForm();
  };

  onClear = () => {
    this.setState({
      name: "",
      status: false,
    });
  };

  componentDidMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      });
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps && nextProps.task) {
  //     this.setState({
  //       id: nextProps.task.id,
  //       name: nextProps.task.name,
  //       status: nextProps.task.status,
  //     });
  //   }
  // }
  static getDerivedStateFromProps(props, state) {
    if (props.task && state && props.task.id !== state.id) {
      return {
        id: props.task.id,
        name: props.task.name,
        status: props.task.status,
      };
    } else if (!props.task && !state.name && !state.status) {
      return {
        id: "",
        name: "",
        status: false,
      };
    } else if (!props.task && state.id && state.name) {
      return {
        id: "",
        name: "",
        status: false,
      };
    }
    return null;
  }

  render() {
    let { id } = this.state;
    return (
      <div className='card border-warning'>
        <h5 className='card-header bg-warning text-white'>
          {id !== "" ? "Update work" : "Add work"}
          <button
            type='button'
            className='close'
            aria-label='Close'
            onClick={this.onCloseForm}>
            <span aria-hidden='true'>&times;</span>
          </button>
        </h5>
        <div className='card-body'>
          <form action='' onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor=''>Name</label>
              <input
                type='text'
                className='form-control'
                name='name'
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor=''>Status</label>
              <select
                className='form-control'
                name='status'
                value={this.state.status}
                onChange={this.onChange}>
                <option value={true}>Active</option>
                <option value={false}>Hide</option>
              </select>
            </div>
            <div className='form-group text-right'>
              <button type='submit' className='btn btn-success'>
                <span className='fa fa-check'></span> Save
              </button>
              <button
                type='button'
                className='btn btn-danger ml-1'
                onClick={this.onClear}>
                <span className='fa fa-times'></span> Cancle
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
