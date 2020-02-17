import React from "react";
import { connect } from "react-redux";
import { Add } from "@material-ui/icons";
import BookTable from "./BookTable";
import BookForm from "./BookForm";
import {
  addBookAPIAction, // Create
  getBooksAPIAction, // Retrieve
  editBookAPIAction, // Update
  deleteBookAPIAction // Delete
} from "../actions/booksActions";
import SearchComponent from "../../../common/components/SearchComponent";

const initialState = {
  open: false,
  bookData: {},
  error: null
};

class Books extends React.Component {
  state = { ...initialState };

  componentDidMount() {
    this.props.getBooksAPIAction();
  }

  openForm = (bookData = {}) => {
    this.setState({ open: true, bookData });
  };

  closeForm = () => {
    this.setState({ ...initialState });
  };

  addBook = bookData => {
    addBookAPIAction(
      bookData,
      successResponse => {
        alert("Book Created Successfully");
        this.props.getBooksAPIAction();
        this.closeForm();
      },
      errorResponse => {
        console.log(errorResponse);
        this.setState({ error: errorResponse });
      }
    );
  };

  editBook = (bookId, bookData) => {
    // close form if fields unchanged
    if (!Object.keys(bookData).length) {
      this.closeForm();
      return;
    }

    editBookAPIAction(
      bookId,
      bookData,
      successResponse => {
        alert("Book Updated Successfully");
        this.props.getBooksAPIAction();
        this.closeForm();
      },
      errorResponse => {
        console.log(errorResponse);
        this.setState({ error: errorResponse });
      }
    );
  };

  deleteBook = bookId => {
    deleteBookAPIAction(
      bookId,
      successResponse => {
        alert("Book Deleted Successfully");
        this.props.getBooksAPIAction();
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );
  };

  render() {
    return (
      <div>
        <span style={styles.headerBar}>
          <SearchComponent searchAPI={this.props.getBooksAPIAction} />
          <Add onClick={() => this.openForm()} />
        </span>

        {/* FORM (Details View) */}
        {this.state.open ? (
          <BookForm
            open={this.state.open}
            closeForm={this.closeForm}
            formData={this.state.bookData}
            addBook={this.addBook}
            editBook={this.editBook}
            error={this.state.error}
          />
        ) : null}

        {/* TABLE (List View) */}
        <h2>Books</h2>
        <BookTable
          books={this.props.books}
          showEditForm={this.openForm}
          performDelete={this.deleteBook}
        />
      </div>
    );
  }
}

const styles = {
  headerBar: { float: "right", marginRight: 20, display: "flex" }
};

const mapStateToProps = ({ books }) => {
  return { books };
};

const mapDispatchToProps = { getBooksAPIAction };

export default connect(mapStateToProps, mapDispatchToProps)(Books);
