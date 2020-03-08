import React from "react";
import Spinner from "react-spinkit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { signup, login } from "../../redux";
import "./SignupForm.css";
import { Link, Redirect } from "react-router-dom";

class SignupForm extends React.Component {
  state = {
    username: "",
    displayName: "",
    password: ""
  };

  handleSignup = e => {
    e.preventDefault();
    this.props.signup(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, error } = this.props;

    return (
      <React.Fragment>
        <form id="signup-form" onSubmit={this.handleSignup}>
          <label htmlFor="username">Username</label>
          <TextField
            type="text"
            name="username"
            variant="outlined"
            autoFocus
            required
            onChange={this.handleChange}
          />
          <label htmlFor="displayName">Display Name</label>
          <TextField
            type="text"
            name="displayName"
            variant="outlined"
            required
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <TextField
            type="password"
            name="password"
            variant="outlined"
            required
            onChange={this.handleChange}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            Sign Up
          </Button>
          <p>
            Already a user? <Link to={"/"}>Login here</Link>
          </p>
        </form>
        {loading && <Spinner name="circle" color="blue" /> && (
          <Redirect path="/" />
        )}
        {error && (
          <p style={{ color: "red" }}>
            Error During Submission!
            <br />
            Please resubmit according to the following guidelines: <br />
            (1) Username must be unique and at least 3 characters. <br />
            (2) Username is case-sensitive.
            <br />
            (3) Password must be at least 3 alphanumeric characters and
            case-sensitive.
          </p>
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.users.signup.result,
    loading: state.users.signup.loading,
    error: state.users.signup.error
  }),
  { signup, login }
)(SignupForm);
