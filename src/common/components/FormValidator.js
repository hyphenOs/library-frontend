const formValidator = (fieldAttributes, userInput) => {
  let formErrors = {};
  for (let field in fieldAttributes) {
    let value = userInput[field];
    let fieldEmpty = !value;
    if (fieldEmpty && fieldAttributes[field].required) {
      formErrors[field] = {
        error: true,
        helperText: "this field should be non-empty"
      };
    } else if (!fieldEmpty && fieldAttributes[field].customValidator) {
      let customValidator = fieldAttributes[field].customValidator;
      let formError = customValidator(value);
      if (formError.error) formErrors[field] = formError;
    }
  }

  return { formErrors, errorCount: Object.keys(formErrors).length };
};

export default formValidator;
