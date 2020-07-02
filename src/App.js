/* Copyright (c) 2020 hyphenOs Software Labs Private Limited */

import React from "react";
import "./App.css";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./common/reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <div className="App">
      <h1>Library App</h1>
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}
