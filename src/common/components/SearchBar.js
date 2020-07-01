/* Copyright (c) 2020 hyphenOs Software Labs Private Limited */

import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  onChangeHandler = e => {
    this.setState({ searchTerm: e.target.value });
  };

  search = () => {
    this.props.searchAPI(this.state.searchTerm);
  };

  render() {
    return (
      <div>
        <input
          placeholder="key1=value1&key2=value2"
          onChange={this.onChangeHandler}
        />
        <input type="button" value="Search" onClick={this.search} />
      </div>
    );
  }
}

export default SearchBar;
