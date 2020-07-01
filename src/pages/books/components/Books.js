/* Copyright (c) 2020 hyphenOs Software Labs Private Limited */

import React from "react";
import { connect } from "react-redux";
import { Add } from "@material-ui/icons";
import BookTable from "./BookTable";
import BookForm from "./BookForm";
import {
  createBookAPIAction, // Create
  retrieveBooksAPIAction, // Retrieve
  updateBookAPIAction, // Update
  deleteBookAPIAction, // Delete
} from "../actions/booksActions";
import SearchBar from "../../../common/components/SearchBar";
import CSVDownloader from "../../../common/components/CSVDownloader";

const initialState = {
  open: false,
  bookData: {},
  error: null,
};

class Books extends React.Component {
  state = { ...initialState };

  componentDidMount() {
    this.retrieve(); // Retrieve books when the component is mounted
  }

  // CRUD Actions

  create = (bookData) => {
    this.props.createBookAPIAction(
      bookData,
      (successResponse) => {
        alert("Book Created Successfully");
        this.retrieve();
        this.closeForm();
      },
      (errorResponse) => {
        console.log(errorResponse);
        this.setState({ error: errorResponse });
      }
    );
  };

  retrieve = () => {
    this.props.retrieveBooksAPIAction();
  };

  update = (bookId, bookData) => {
    // close form if fields unchanged
    if (!Object.keys(bookData).length) {
      this.closeForm();
      return;
    }

    this.props.updateBookAPIAction(
      // Edit
      bookId,
      bookData,
      (successResponse) => {
        alert("Book Updated Successfully");
        this.retrieve();
        this.closeForm();
      },
      (errorResponse) => {
        console.log(errorResponse);
        this.setState({ error: errorResponse });
      }
    );
  };

  delete = (bookId) => {
    this.props.deleteBookAPIAction(
      // Delete
      bookId,
      (successResponse) => {
        alert("Book Deleted Successfully");
        this.retrieve();
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  };

  openForm = (bookData = {}) => {
    this.setState({ open: true, bookData });
  };

  closeForm = () => {
    this.setState({ ...initialState });
  };

  render() {
    return (
      <div>
        <span style={styles.headerBar}>
          <SearchBar searchAPI={this.props.retrieveBooksAPIAction} />
          <CSVDownloader data={this.props.books} />
          <Add onClick={() => this.openForm()} />
        </span>

        {/* FORM (Details View) */}
        {this.state.open ? (
          <BookForm
            open={this.state.open}
            closeForm={this.closeForm}
            formData={this.state.bookData}
            create={this.create}
            update={this.update}
            error={this.state.error}
          />
        ) : null}

        {/* TABLE (List View) */}
        <h2>Books</h2>
        <BookTable
          books={this.props.books}
          openForm={this.openForm}
          delete={this.delete}
        />
      </div>
    );
  }
}

const styles = {
  headerBar: { float: "right", marginRight: 20, display: "flex" },
};

const mapStateToProps = ({ books }) => {
  return { books };
};

// add,edit, delete actions need not be passed through dispatch
// TODO: understand implications, if any
const mapDispatchToProps = {
  createBookAPIAction,
  retrieveBooksAPIAction,
  updateBookAPIAction,
  deleteBookAPIAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);
