import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class Sort extends Component {
  onClick = (sortBy, sortValue) => {
    sortValue = parseInt(sortValue);
    let sortVar = {
      by: sortBy,
      value: sortValue,
    };
    this.props.onSort(sortVar);
  };
  render() {
    var { sort } = this.props;
    return (
      <div className='col-6'>
        <div className='dropdown'>
          <button
            className='btn btn-primary dropdown-toggle'
            type='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'>
            Sort
          </button>
          <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
            <a
              className='dropdown-item'
              href='/#'
              onClick={() => this.onClick("name", 1)}>
              <span className='fa fa-sort-alpha-asc pr-1'></span> Name A-Z
              {sort.by === "name" && sort.value === 1 ? (
                <span className='fa fa-check ml-1'></span>
              ) : null}
            </a>
            <a
              className='dropdown-item'
              href='/#'
              onClick={() => this.onClick("name", -1)}>
              <span className='fa fa-sort-alpha-desc pr-1'></span> Name Z-A
              {sort.by === "name" && sort.value === -1 ? (
                <span className='fa fa-check ml-1'></span>
              ) : null}
            </a>
            <div className='dropdown-divider'></div>
            <a
              className='dropdown-item'
              href='/#'
              onClick={() => this.onClick("status", 1)}>
              Active (Status)
              {sort.by === "status" && sort.value === 1 ? (
                <span className='fa fa-check ml-1'></span>
              ) : null}
            </a>
            <a
              className='dropdown-item'
              href='/#'
              onClick={() => this.onClick("status", -1)}>
              Hide (Status)
              {sort.by === "status" && sort.value === -1 ? (
                <span className='fa fa-check ml-1'></span>
              ) : null}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sort: state.sortTask,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onSort: (sortVar) => {
      dispatch(actions.sortTask(sortVar));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
