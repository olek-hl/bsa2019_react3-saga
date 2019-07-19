import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/usersActions";
import { store } from "../store/configureStore";

export class Users extends Component {
  getAllUsers = () => {
    this.props.fetchAllUsers();
  };

  componentDidMount() {
    this.getAllUsers();
  }

  render() {
    const { users } = this.props;
    const state = store.getState();

    if (users.isLoading) {
      return <p className="loader" />;
    }
    return (
      <ul className="Users-list">{users.data.map(u => this.renderUser(u))}</ul>
    );
    //
  }

  renderUser(user) {
    const className = "User-user";
    return (
      <li key={user.id.toString()} className={className}>
        <span className="user-name">{user.login}</span>
        <span className="user-password">{user.password}</span>
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
    fetchAllUsers: () => dispatch(getUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
