import React, { Component } from "react";
import { connect } from "react-redux";
import { Messages } from "../components/Messages";
import { Input } from "../components/Input";
import { Login } from "../components/Login";
import { loginUser } from "../actions/loginActions";
import { changeText, submitForm } from "../actions/inputActions";
import {
  sendMessage,
  removeMessage,
  likeMessage,
  getMessages,
  newMessage
} from "../actions/messageActions";
import "./App.css";

class App extends Component {
  render() {
    const {
      messages,
      input,
      changeTextAction,
      submitFormAction,
      sendMessageAction,
      removeMessageAction,
      likeMessageAction,
      getAllMessagesAction,
      showMessageAction
    } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <span className="chat-name">Chat</span>
          <span className="message-count">
            Messages: {messages.data.length}
          </span>
          <span className="last-message">
            Last message:
            {messages.data[messages.data.length - 1]
              ? formatDate(messages.data[messages.data.length - 1].created_at)
              : ""}
          </span>
        </div>
        <Messages
          messages={messages.data}
          isLoading={messages.isLoading}
          member={messages.currentUser}
          removeMessage={removeMessageAction}
          likeMessage={likeMessageAction}
          getMessages={getAllMessagesAction}
        />
        <Input
          text={input.text || ""}
          changeText={changeTextAction}
          submitForm={submitFormAction}
          sendMessage={sendMessageAction}
          showMessage={showMessageAction}
        />
      </div>
    );
  }
}

const mapStateToProps = store => {
  console.log(store);
  return {
    login: store.login,
    messages: store.message,
    input: store.input
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logUserAction: body => dispatch(loginUser(body)),
    getAllMessagesAction: () => dispatch(getMessages()),
    removeMessageAction: id => dispatch(removeMessage(id)),
    likeMessageAction: id => dispatch(likeMessage(id)),
    changeTextAction: text => dispatch(changeText(text)),
    submitFormAction: text => dispatch(submitForm(text)),
    sendMessageAction: data => dispatch(newMessage(data)),
    showMessageAction: data => dispatch(sendMessage(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const formatDate = date => {
  return new Date(date)
    .toISOString()
    .split("T")
    .join(" ")
    .split(".")[0];
};
