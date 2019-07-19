import { put, takeLatest, all } from "redux-saga/effects";
function* fetchMessages() {
  const json = yield fetch("/message").then(response => response.json());
  yield put({ type: "MESSAGES_RECEIVED", data: json });
}
function* fetchMessagesWatcher() {
  yield takeLatest("GET_MESSAGES", fetchMessages);
}

function* fetchUsers() {
  const json = yield fetch("/users").then(response => response.json());
  yield put({ type: "USERS_RECEIVED", data: json });
}
function* fetchUsersWatcher() {
  yield takeLatest("GET_USERS", fetchUsers);
}

function* logUser(userData) {
  const json = yield fetch("/login", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(res => res.json())
    .then(res => res);
  yield put({ type: "USER_LOG", data: json });
}

function* userLoginWatcher() {
  yield takeLatest("LOGIN_USER", logUser);
}

function* newMessage(messageData) {
  const json = yield fetch("/message", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: messageData.payload
  })
    .then(res => res)
    .then(res => res);
  yield put({ type: "MESSAGE_ADDED", data: json });
}

function* newMessageWatcher() {
  yield takeLatest("NEW_MESSAGE", newMessage);
}

function* deleteMessage(id) {
  const json = yield fetch(`/message/${id.payload}`, {
    method: "delete",
    headers: {
      Accept: "application/text, text/plain, */*",
      "Content-Type": "application/text"
    },
    body: id.payload
  })
    .then(res => res)
    .then(res => res);
  yield put({ type: "MESSAGE_DELETED", data: json });
}

function* deleteMessageWatcher() {
  yield takeLatest("DELETE_MESSAGE", deleteMessage);
}

function* getMessageById(id) {
  const json = yield fetch(`/message/${id.payload}`, {
    method: "get",
    headers: {
      Accept: "application/text, text/plain, */*",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => res);
  yield put({ type: "MESSAGE_RECEIVED", data: json });
}

function* getMessageByIdWatcher() {
  yield takeLatest("GET_MESSAGE_BY_ID", getMessageById);
}

function* editMessage(data) {
  const json = yield fetch(`/message/${data.payload.id}`, {
    method: "put",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data.payload)
  })
    .then(res => res.json())
    .then(res => res);
  yield put({ type: "MESSAGE_EDITED", data: json });
}

function* editMessageWatcher() {
  yield takeLatest("EDIT_MESSAGE_BY_ID", editMessage);
}

function* deleteUser(id) {
  const json = yield fetch(`/user/${id.payload}`, {
    method: "delete",
    headers: {
      Accept: "application/text, text/plain, */*",
      "Content-Type": "application/text"
    }
  })
    .then(res => res)
    .then(res => res);
  yield put({ type: "USER_DELETED", data: json });
}

function* deleteUserWatcher() {
  yield takeLatest("DELETE_USER", deleteUser);
}

export default function* rootSaga() {
  yield all([
    fetchMessagesWatcher(),
    userLoginWatcher(),
    fetchUsersWatcher(),
    newMessageWatcher(),
    deleteMessageWatcher(),
    getMessageByIdWatcher(),
    editMessageWatcher(),
    deleteUserWatcher()
  ]);
}
