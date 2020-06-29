import axios from "axios";

const baseUrl = "http://localhost:8000/books/";

export const getBooksAPIAction = (searchTerm = "") => {
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

export const addBookAPIAction = (bookData, successCB, errorCB) => {
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

export const editBookAPIAction = (bookId, patchData, successCB, errorCB) => {
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
