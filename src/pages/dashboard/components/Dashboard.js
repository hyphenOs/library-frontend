/* Copyright (c) 2020 hyphenOs Software Labs Private Limited */

import React from "react";
import { connect } from "react-redux";
import { retrieveBooksAPIAction } from "../../books/actions/booksActions";
import { getMembersAPIAction } from "../../members/actions/membersActions";

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.retrieveBooksAPIAction();
    this.props.getMembersAPIAction();
  }
  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        {this.props.totalBooks ? <h3>Books: {this.props.totalBooks}</h3> : null}
        {this.props.totalMembers ? (
          <h3>Members: {this.props.totalMembers}</h3>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ books, members }) => {
  return {
    totalBooks: books.length,
    totalMembers: members.length,
  };
};
const mapDispatchToProps = { retrieveBooksAPIAction, getMembersAPIAction };
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
