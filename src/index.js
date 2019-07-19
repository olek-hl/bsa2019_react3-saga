import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import "./index.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "../src/containers/App";
import Login from "../src/components/Login";
import Users from "../src/components/usersList";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/chat" component={App} />
      <Route path="/user" component={Users} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
