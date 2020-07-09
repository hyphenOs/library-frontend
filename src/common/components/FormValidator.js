/* Copyright (c) 2020 hyphenOs Software Labs Private Limited */

const formValidator = (formFieldAttributes, userInput, isEditForm) => {
  let formErrors = {};
  for (let field in formFieldAttributes) {
    let fieldObj = formFieldAttributes[field];
    if (isEditForm && !fieldObj.editable) {
      continue;
    }
    let fieldKey = fieldObj.key;

    let value = userInput[fieldKey];

    let fieldEmpty = !value;
    if (fieldEmpty && fieldObj.required) {
      formErrors[fieldKey] = {
        error: true,
        helperText: "this field should be non-empty"
      };
    } else if (fieldObj.customValidator && !fieldEmpty) {
      let customValidator = fieldObj.customValidator;
      let formError = customValidator(value);
      if (formError.error) formErrors[fieldKey] = formError;
    }
  }

  return { formErrors, errorCount: Object.keys(formErrors).length };
};

export default formValidator;
