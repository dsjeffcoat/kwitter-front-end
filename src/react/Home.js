import React from "react";
import { LoginForm, Menu, SignupForm } from "./components";
import { userIsNotAuthenticated } from "./HOCs";
import { Switch } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <>
        <Menu />
        <h2>Your favorite microblogging platform</h2>
        <Switch>
          <LoginForm />
          <SignupForm />
        </Switch>
      </>
    );
  }
}

export default userIsNotAuthenticated(Home);
