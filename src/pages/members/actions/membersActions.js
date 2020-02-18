import axios from "axios";

const baseUrl = "http://localhost:8000/members/";

export const getMembersAPIAction = (searchTerm = "") => {
  return dispatch => {
    axios
      .get(baseUrl + "?" + searchTerm)
      .then(response => {
        dispatch({ type: "GET_MEMBERS", payload: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const addMemberAPIAction = (memberData, successCB, errorCB) => {
  axios
    .post(baseUrl, memberData)
    .then(response => {
      successCB(response);
    })
    .catch(error => {
      errorCB(error);
    });
};

export const editMemberAPIAction = (memberId, patchData, successCB, errorCB) => {
  axios
    .patch(baseUrl + memberId + "/", patchData)
    .then(response => {
      successCB(response);
    })
    .catch(error => {
      errorCB(error);
    });
};

export const deleteMemberAPIAction = (memberId, successCB, errorCB) => {
  axios
    .delete(baseUrl + memberId + "/")
    .then(response => {
      successCB(response);
    })
    .catch(error => {
      errorCB(error);
    });
};

