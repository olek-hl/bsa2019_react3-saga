const initialState = {
  data: {},
  isLoading: false
};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, isLoading: true };

    case "USER_LOG":
      return { ...state, data: action.data, isLoading: false };

    default:
      return state;
  }
}
