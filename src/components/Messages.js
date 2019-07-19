import { Component } from "react";
import React from "react";

export class Messages extends Component {
  removeMessage = e => {
    let key = e.target.closest(".Messages-message").dataset.key;
    this.props.removeMessage(key);
  };

  likeMessage = e => {
    let checkLike = e.target.classList.contains("liked");
    checkLike
      ? e.target.classList.remove("liked")
      : e.target.classList.add("liked");
    let key = e.target.closest(".Messages-message").dataset.key;
    this.props.likeMessage(key);
  };

  getAllMessages = () => {
    this.props.getMessages();
  };

  componentDidMount() {
    this.getAllMessages();
  }

  render() {
    const { messages, isLoading } = this.props;

    if (isLoading) {
      return <p className="loader" />;
    }
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const { member } = this.props;
    const messageFromMe = message.user === member.user;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    const showAvatar = messageFromMe ? "avatar avatar--hidden" : "avatar";
    const showIcons = messageFromMe ? "icons" : "icons--hidden";
    const showLike = messageFromMe ? "like--hidden" : "like";
    return (
      <li
        key={message.created_at}
        className={className}
        data-key={message.created_at.toString().replace(/[^0-9]/g, "")}
      >
        <span className={showAvatar}>
          <img src={message.avatar} alt="avatar" />
        </span>
        <div className="Message-content">
          <div className="message-date">
            {
              new Date(message.created_at)
                .toISOString()
                .split("T")
                .join(" ")
                .split(".")[0]
            }
          </div>
          <div className="text">{message.message}</div>
          <div className={showIcons}>
            <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={this.removeMessage}
            />
            <i className="fa fa-edit" aria-hidden="true" />
          </div>
          <div className={showLike}>
            <i className="fa fa-thumbs-up" onClick={this.likeMessage} />
          </div>
        </div>
      </li>
    );
  }
}
