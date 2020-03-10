import React from "react";

class SearchComponent extends React.Component {
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
      <div className={styles.searchBar}>
        <input
          placeholder="title=abc&year=123"
          onChange={this.onChangeHandler}
        />
        <input type="button" value="Search" onClick={this.search} />
      </div>
    );
  }
}

export default SearchComponent;

const styles = {
  searchBar: {}
};
