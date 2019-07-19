import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../actions/usersActions";
import { Link } from "react-router-dom";

export class Users extends Component {
  getAllUsers = () => {
    this.props.fetchAllUsers();
  };

  componentDidMount() {
    this.getAllUsers();
  }

  onDelete = e => {
    let id = e.target.dataset.key;
    this.props.deleteUserAction(id);
  };

  render() {
    const { users } = this.props;

    if (users.isLoading) {
      return <p className="loader" />;
    }
    return (
      <div>
        <Link to={`/chat`}>
          <button className="go-to-chat">Go to chat</button>
        </Link>
        <ul className="Users-list">
          {users.data.map(u => this.renderUser(u))}
        </ul>
      </div>
    );
    //
  }

  renderUser(user) {
    const className = "User-user";
    return (
      <li key={user.id.toString()} className={className}>
        <div className="user-fullName">
          <span className="user-name">{user.login}</span>
          <span className="user-password">{user.password}</span>
        </div>
        <div className="user-buttons">
          <button
            className="delete-user"
            data-key={user.id.toString()}
            onClick={this.onDelete}
          >
            Delete user
          </button>
          <button className="edit-user">Edit user</button>
        </div>
      </li>
    );
  }
}

const mapStateToProps = store => {
  return {
    users: store.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: () => dispatch(getUsers()),
    deleteUserAction: id => dispatch(deleteUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
