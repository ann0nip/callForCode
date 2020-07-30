export default (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_SPINNER_STATUS":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};
