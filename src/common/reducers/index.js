/* Copyright (c) 2020 hyphenOs Software Labs Private Limited */

import { combineReducers } from "redux";
import booksReducer from "./booksReducer";
import membersReducer from "./membersReducer";

const rootReducer = combineReducers({
  books: booksReducer,
  members: membersReducer
});

export default rootReducer;
