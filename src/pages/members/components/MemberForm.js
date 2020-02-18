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
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip_code: ""
  },
  changedFields: {},
  formErrors: {},
  error: null
};

const fieldAttributes = {
  name: {
    required: true,
    customValidato: value =>
      value.length > 30
        ? { helperText: "enter less than 30 characters", error: true }
        : { helperText: "", error: false }
  },
  phone: {
    required: true,
    customValidator: value =>
      isNaN(value)
        ? { helperText: "Invalid Phone Number", error: true }
        : { helperText: "", error: false }
  },
  email: { required: true },
  address: { required: true },
  city: { required: true },
  state: { required: true },
  zip_code: { required: true }
};

class MemberForm extends React.Component {
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
      fieldAttributes,
      this.state.formData
    );
    this.setState({ formErrors });
    if (errorCount === 0) {
      this.state.isEditForm
        ? this.props.editMember(
            this.state.formData.id,
            this.state.changedFields
          )
        : this.props.addMember(this.state.formData);
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
    const { name, phone, email, address, city, state, zip_code } = this.state.formData;
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.closeForm}>
          <DialogTitle>Member Form</DialogTitle>

          <DialogContent>
            <form id="memberForm">
              <TextField
                id="name"
                value={name}
                onChange={this.onChangeHandler}
                label="Name"
                fullWidth
                margin="dense"
                error={this.fieldError("name")}
                helperText={this.fieldHelperText("name")}
                autoFocus
              />
              <TextField
                id="phone"
                value={phone}
                onChange={this.onChangeHandler}
                label="Phone"
                fullWidth
                margin="dense"
                error={this.fieldError("phone")}
                helperText={this.fieldHelperText("phone")}
              />
              <TextField
                id="email"
                value={email}
                onChange={this.onChangeHandler}
                label="Email"
                fullWidth
                margin="dense"
                error={this.fieldError("email")}
                helperText={this.fieldHelperText("email")}
              />
              <TextField
                id="address"
                value={address}
                onChange={this.onChangeHandler}
                label="Address"
                fullWidth
                margin="dense"
                error={this.fieldError("address")}
                helperText={this.fieldHelperText("address")}
              />
              <TextField
                id="city"
                value={city}
                onChange={this.onChangeHandler}
                label="City"
                fullWidth
                margin="dense"
                error={this.fieldError("city")}
                helperText={this.fieldHelperText("city")}
              />
              <TextField
                id="state"
                value={state}
                onChange={this.onChangeHandler}
                label="State"
                fullWidth
                margin="dense"
                error={this.fieldError("state")}
                helperText={this.fieldHelperText("state")}
              />
              <TextField
                id="zip_code"
                value={zip_code}
                onChange={this.onChangeHandler}
                label="Zip Code"
                fullWidth
                margin="dense"
                error={this.fieldError("zip_code")}
                helperText={this.fieldHelperText("zip_code")}
              />
              <Button
                color="primary"
                onClick={this.onSubmit}
                variant="contained"
              >
              {this.state.isEditForm ? "Edit " : "Add "}
                Member
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default MemberForm;
