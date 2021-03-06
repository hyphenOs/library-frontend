/* Copyright (c) 2020 hyphenOs Software Labs Private Limited */

import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField
} from "@material-ui/core";
import formValidator from "../../../common/components/FormValidator";

const initialState = {
  isEditForm: false,
  formData: {
    title: "",
    author: "",
    isbn: "",
    year: ""
  },
  changedFields: {},
  formErrors: {},
  error: null
};

const formFieldAttributes = {
  title: {
    key: "title",
    editable: true,
    required: true,
    customValidator: value =>
      value.length > 100
        ? { helperText: "enter less than 100 characters", error: true }
        : { helperText: "", error: false }
  },
  author: {
    key: "author",
    editable: true,
    required: true,
    customValidator: value =>
      value.length > 100
        ? { helperText: "enter less than 100 characters", error: true }
        : { helperText: "", error: false }
  },
  isbn: {
    key: "isbn",
    editable: false,
    required: true,
    customValidator: value =>
      value.length !== 17
        ? {
            helperText: "invalid ISBN. valid value is '123-4-56789-012-3'",
            error: true
          }
        : { helperText: "", error: false }
  },
  year: {
    key: "year",
    editable: true,
    required: true,
    customValidator: value =>
      isNaN(value)
        ? { helperText: "Invalid Year", error: true }
        : { helperText: "", error: false }
  }
};

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    let isEditForm = Boolean(Object.keys(this.props.formData).length);
    this.state = {
      ...initialState,
      formData: isEditForm ? this.props.formData : initialState.formData,
      isEditForm
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error) {
      return { error: props.error };
    }
    return null;
  }

  onChangeHandler = e => {
    const { id, value } = e.target;
    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        [id]: value
      },
      changedFields: {
        ...this.state.changedFields,
        [id]: value
      }
    });
  };

  onSubmit = () => {
    const { formErrors, errorCount } = formValidator(
      formFieldAttributes,
      this.state.formData,
      this.state.isEditForm
    );
    this.setState({ formErrors });
    if (errorCount === 0) {
      this.state.isEditForm
        ? this.props.update(this.state.formData.id, this.state.changedFields)
        : this.props.create(this.state.formData);
    }
  };

  fieldError = id => {
    let apiErrors = this.apiErrorsToFormFields();
    let errors = { ...apiErrors, ...this.state.formErrors };
    let field = errors[id];
    return field ? field.error : false;
  };

  fieldHelperText = id => {
    let apiErrors = this.apiErrorsToFormFields();
    let errors = { ...apiErrors, ...this.state.formErrors };
    let field = errors[id];
    return field ? field.helperText : "";
  };

  apiErrorsToFormFields = () => {
    const { error } = this.state;
    let apiErrors = {};
    if (error && error.response && error.response.data) {
      let errorData = error.response.data;
      for (let apiKey in errorData) {
        apiErrors[apiKey] = {
          helperText: errorData[apiKey].join(""),
          error: true
        };
      }
    }
    return apiErrors;
  };

  render() {
    const { title, author, isbn, year } = this.state.formData;
    return (
      <div>
        {/* Dialog Form */}
        <Dialog open={this.props.open} onClose={this.props.closeForm}>
          <DialogTitle>Book Form</DialogTitle>

          <DialogContent>
            <form id="bookForm">
              <TextField
                id={formFieldAttributes.title.key}
                value={title}
                onChange={this.onChangeHandler}
                label="Title"
                fullWidth
                margin="normal"
                error={this.fieldError(formFieldAttributes.title.key)}
                helperText={this.fieldHelperText(formFieldAttributes.title.key)}
                autoFocus
              />
              <TextField
                id={formFieldAttributes.author.key}
                value={author}
                onChange={this.onChangeHandler}
                label="Author"
                fullWidth
                margin="normal"
                error={this.fieldError(formFieldAttributes.author.key)}
                helperText={this.fieldHelperText(formFieldAttributes.author.key)}
              />
              <TextField
                id={formFieldAttributes.isbn.key}
                value={isbn}
                onChange={this.onChangeHandler}
                label="ISBN"
                fullWidth
                margin="normal"
                error={this.fieldError(formFieldAttributes.isbn.key)}
                helperText={this.fieldHelperText(formFieldAttributes.isbn.key)}
                disabled={this.state.isEditForm}
              />
              <TextField
                id={formFieldAttributes.year.key}
                value={year}
                onChange={this.onChangeHandler}
                label="Year"
                fullWidth
                margin="normal"
                error={this.fieldError(formFieldAttributes.year.key)}
                helperText={this.fieldHelperText(formFieldAttributes.year.key)}
              />
              <Button
                color="primary"
                onClick={this.onSubmit}
                variant="contained"
              >
                {this.state.isEditForm ? "Edit " : "Add "}
                Book
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default BookForm;
