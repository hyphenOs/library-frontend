const formValidator = (apiToFormFieldIDs, userInput, isEditForm) => {
  let formErrors = {};
  for (let field in apiToFormFieldIDs) {
    if (isEditForm && !apiToFormFieldIDs[field].editable) {
      continue;
    }
    let value = userInput[field];

    let fieldEmpty = !value;
    if (fieldEmpty && apiToFormFieldIDs[field].required) {
      formErrors[field] = {
        error: true,
        helperText: "this field should be non-empty"
      };
    } else if (apiToFormFieldIDs[field].customValidator && !fieldEmpty) {
      let customValidator = apiToFormFieldIDs[field].customValidator;
      let formError = customValidator(value);
      if (formError.error) formErrors[field] = formError;
    }
  }

  return { formErrors, errorCount: Object.keys(formErrors).length };
};

export default formValidator;
