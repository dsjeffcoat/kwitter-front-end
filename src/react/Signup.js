import React from "react";
import { Menu, SignupForm } from "./components";
import { userIsNotAuthenticated } from "./HOCs";

class Signup extends React.Component {
  render() {
    return (
      <>
        <Menu />
        <h2>Come Join Us Today!</h2>
        <SignupForm />
      </>
    );
  }
}

export default userIsNotAuthenticated(Signup);
