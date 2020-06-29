import axios from "axios";

const baseUrl = "http://localhost:8000/books/";

// CRUD API Actions

export const createBookAPIAction = (bookData, successCB, errorCB) => {
  return (dispatch) => {
    axios
      .post(baseUrl, bookData)
      .then((response) => {
        successCB(response);
      })
      .catch((error) => {
        errorCB(error);
      });
  };
};

export const retrieveBooksAPIAction = (searchTerm = "") => {
  return (dispatch) => {
    axios
      .get(baseUrl + "?" + searchTerm)
      .then((response) => {
        dispatch({ type: "GET_BOOKS", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateBookAPIAction = (bookId, patchData, successCB, errorCB) => {
  return (dispatch) => {
    axios
      .patch(baseUrl + bookId + "/", patchData)
      .then((response) => {
        successCB(response);
      })
      .catch((error) => {
        errorCB(error);
      });
  };
};

export const deleteBookAPIAction = (bookId, successCB, errorCB) => {
  return (dispatch) => {
    axios
      .delete(baseUrl + bookId + "/")
      .then((response) => {
        successCB(response);
      })
      .catch((error) => {
        errorCB(error);
      });
  };
};
