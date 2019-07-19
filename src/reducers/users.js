const initialState = {
  data: [],
  isLoading: false
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, isLoading: true };
    case "USERS_RECEIVED":
      return { ...state, data: action.data, isLoading: false };

    case "REMOVE_USER":
      return {
        ...state,
        data: state.data.filter(e => e.id !== action.payload)
      };

    default:
      return state;
  }
}
