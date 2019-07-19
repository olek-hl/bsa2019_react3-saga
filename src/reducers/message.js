const initialState = {
  text: "",
  messageData: {},
  isLoading: false
};

export function singeMessageReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_MESSAGE_TEXT":
      return { ...state, text: action.payload };

    case "GET_MESSAGE_BY_ID":
      return { ...state, isLoading: true };

    case "MESSAGE_RECEIVED":
      return {
        ...state,
        messageData: action.data,
        text: action.data.message,
        isLoading: false
      };

    default:
      return state;
  }
}
