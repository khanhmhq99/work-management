import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWord: "",
    };
  }
  onSearch = () => {
    this.props.onSearch(this.state.keyWord);
  };
  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };
  render() {
    var { keyWord } = this.state;
    return (
      <div className='col-6'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Work name...'
            name='keyWord'
            value={keyWord}
            onChange={this.onChange}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-primary'
              type='button'
              id='button-addon2'
              onClick={this.onSearch}>
              <span className='fa fa-search mr-1'></span> Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
