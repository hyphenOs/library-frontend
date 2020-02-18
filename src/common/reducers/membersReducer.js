const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_MEMBERS":
      return action.payload;
    default:
      return state;
  }
};
