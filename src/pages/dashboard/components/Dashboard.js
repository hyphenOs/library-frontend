import React from "react";
import { connect } from "react-redux";
import { getBooksAPIAction } from "../../books/actions/booksActions";

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getBooksAPIAction();
  }
  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        {this.props.totalBooks ? <h3>Books: {this.props.totalBooks}</h3> : null}
      </div>
    );
  }
}

const mapStateToProps = ({ books }) => {
  return {
    totalBooks: books.length
  };
};
const mapDispatchToProps = { getBooksAPIAction };
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
