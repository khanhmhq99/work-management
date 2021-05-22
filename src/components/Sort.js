import React, { Component } from "react";
class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {
        by: "name",
        value: 1,
      },
    };
  }
  onClick = (sortBy, sortValue) => {
    sortValue = parseInt(sortValue);
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue,
      },
    });
    this.props.onSort(sortBy, sortValue);
  };
  render() {
    var { sort } = this.state;
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
                <span className='fa fa-check'></span>
              ) : null}
            </a>
            <a
              className='dropdown-item'
              href='/#'
              onClick={() => this.onClick("name", -1)}>
              <span className='fa fa-sort-alpha-desc pr-1'></span> Name Z-A
              {sort.by === "name" && sort.value === -1 ? (
                <span className='fa fa-check'></span>
              ) : null}
            </a>
            <div className='dropdown-divider'></div>
            <a
              className='dropdown-item'
              href='/#'
              onClick={() => this.onClick("status", 1)}>
              Active (Status)
              {sort.by === "status" && sort.value === 1 ? (
                <span className='fa fa-check'></span>
              ) : null}
            </a>
            <a
              className='dropdown-item'
              href='/#'
              onClick={() => this.onClick("status", -1)}>
              Hide (Status)
              {sort.by === "status" && sort.value === -1 ? (
                <span className='fa fa-check'></span>
              ) : null}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Sort;
