import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

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
    this.props.onSaveTask(this.state);
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
    if (this.props.taskEditing) {
      this.setState({
        id: this.props.taskEditing.id,
        name: this.props.taskEditing.name,
        status: this.props.taskEditing.status,
      });
    } else {
      this.onClear();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taskEditing) {
      this.setState({
        id: nextProps.taskEditing.id,
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status,
      });
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.taskEditing && state && props.taskEditing.id !== state.id) {
  //     return {
  //       id: props.taskEditing.id,
  //       name: props.taskEditing.name,
  //       status: props.taskEditing.status,
  //     };
  //   } else if (!props.taskEditing && !state.name && !state.status) {
  //     return {
  //       id: "",
  //       name: "",
  //       status: false,
  //     };
  //   } else if (!props.taskEditing && state.id && state.name) {
  //     return {
  //       id: "",
  //       name: "",
  //       status: false,
  //     };
  //   }
  //   return null;
  // }

  render() {
    if (!this.props.isDisplayForm) return "";
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
                <span className='fa fa-times'></span> Clear
              </button>
            </div>
          </form>
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
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
