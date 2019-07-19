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
    type: "DELETE_MESSAGE",
    payload: id
  };
}

export function likeMessage(id) {
  return {
    type: "LIKE_MESSAGE",
    payload: id
  };
}

export function changeMessageText(text) {
  return {
    type: "CHANGE_MESSAGE_TEXT",
    payload: text
  };
}

export function getMessage(id) {
  return {
    type: "GET_MESSAGE_BY_ID",
    payload: id
  };
}
