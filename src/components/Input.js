import { Component } from "react";
import React from "react";
import { store } from "../store/configureStore";

export class Input extends Component {
  onChange = e => {
    const text = e.target.value;
    this.props.changeText(text);
  };

  onSubmit = e => {
    e.preventDefault();
    const state = store.getState();
    const text = store.getState().input.text;
    let data = {
      id: Math.floor(Math.random() * 1000000) + 1,
      user: state.message.currentUser.user,
      avatar: state.message.currentUser.avatar,
      created_at: new Date()
        .toISOString()
        .split("T")
        .join(" ")
        .split(".")[0],
      message: text,
      marked_read: false
    };
    console.log(data);
    this.props.submitForm(text);
    if (state.input.text.length > 0) {
      this.props.sendMessage(JSON.stringify(data));
      this.props.showMessage(JSON.stringify(data));
    }
  };

  render() {
    const { text } = this.props;
    return (
      <div className="Input">
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            value={text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autoFocus={true}
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}
