const initialState = {
  data: [],
  currentUser: {
    id: "1",
    user: "Sasha",
    avatar: "https://i.pravatar.cc/300?img=14"
  },
  isLoading: false
};

export function messageReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_MESSAGES":
      return { ...state, isLoading: true };
    case "MESSAGES_RECEIVED":
      return { ...state, data: action.data, isLoading: false };
    case "SEND_MESSAGE":
      return {
        ...state,
        data: [...state.data, JSON.parse(action.payload)]
      };

    case "DELETE_MESSAGE":
      return {
        ...state,
        data: state.data.filter(
          e =>
            e.created_at.toString().replace(/[^0-9]/g, "") !==
            action.payload.toString().replace(/[^0-9]/g, "")
        )
      };

    case "LIKE_MESSAGE":
      return {
        ...state,
        data: state.data.map(data =>
          data.created_at === action.payload
            ? data.liked
              ? { ...data, liked: false }
              : { ...data, liked: true }
            : data
        )
      };

    default:
      return state;
  }
}
