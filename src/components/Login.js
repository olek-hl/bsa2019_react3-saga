import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/loginActions";

export class Login extends Component {
  onSubmit = e => {
    e.preventDefault();
    let login = e.target.getElementsByClassName("login-field")[0].value;
    let password = e.target.getElementsByClassName("pw-field")[0].value;
    let body = JSON.stringify({
      login: login,
      password: password
    });
    this.props.logUserAction(body);
  };

  componentDidUpdate() {
    let isAuth = this.props.login.data.auth;
    if (isAuth) {
      this.props.login.data.userInDB.isAdmin
        ? this.props.history.push("/user")
        : this.props.history.push("/chat");
    }
  }
  render() {
    const { login } = this.props;
    if (login.isLoading) {
      return <p className="loader" />;
    }
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Login:
          <input type="text" className="login-field" placeholder="login" />
        </label>
        <label>
          Password:
          <input type="password" className="pw-field" placeholder="password" />
        </label>
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}

const mapStateToProps = store => {
  console.log(store);
  return {
    login: store.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logUserAction: body => dispatch(loginUser(body))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
