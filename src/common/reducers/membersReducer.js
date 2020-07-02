/* Copyright (c) 2020 hyphenOs Software Labs Private Limited */

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_MEMBERS":
      return action.payload;
    default:
      return state;
  }
};
