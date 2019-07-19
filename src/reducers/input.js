const initialState = {
  test: ""
};

export function inputReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_TEXT":
      return { ...state, text: action.payload };

    case "SUBMIT_FORM":
      return { ...state, text: "" };

    default:
      return state;
  }
}
