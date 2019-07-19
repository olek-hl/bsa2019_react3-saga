import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import { changeMessageText, getMessage } from "../actions/messageActions";

export class Message extends Component {
  onChange = e => {
    const text = e.target.value;
    this.props.changeText(text);
  };
  onCancel = () => {
    this.props.history.push("/chat");
  };

  getMessagById = id => {
    this.props.fetchMessageById(id);
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.getMessagById(id);
  }
  render() {
    const { singleMessage } = this.props;
    return (
      <div className="message-edit-container">
        <textarea value={singleMessage.text} onChange={this.onChange} />
        <div className="message-edit-buttons-container">
          <button>Edit</button>
          <button onClick={this.onCancel}>Cancel</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  console.log(store);
  return {
    singleMessage: store.singleMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeText: text => dispatch(changeMessageText(text)),
    fetchMessageById: id => dispatch(getMessage(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
