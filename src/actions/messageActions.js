export function getMessages() {
  return {
    type: "GET_MESSAGES"
  };
}

export function newMessage(data) {
  return {
    type: "NEW_MESSAGE",
    payload: data
  };
}

export function sendMessage(data) {
  return {
    type: "SEND_MESSAGE",
    payload: data
  };
}

export function removeMessage(id) {
  return {
    type: "REMOVE_MESSAGE",
    payload: id
  };
}

export function likeMessage(id) {
  return {
    type: "LIKE_MESSAGE",
    payload: id
  };
}
