import React from "react";
import Spinner from "react-spinkit";
import { Button, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { connect } from "react-redux";
import { signup } from "../../redux";
import "./SignupForm.css";
import { Link } from "react-router-dom";

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

  setShow = e => {
    this.setState({ show: true });
  };

  render() {
    const { loading, error } = this.props;

    return (
      <React.Fragment>
        <form
          id="signup-form"
          noValidate
          autoComplete="off"
          onSubmit={this.handleSignup}
        >
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            Sign Up
          </Button>
          <p>
            Already a user? <Link to="/">Login here</Link>
          </p>
        </form>
        {loading && <Spinner name="circle" color="blue" />}
        {error && (
          <>
            <Alert severity="error">
              {/* <p style={{ color: "red" }}> */}
              <AlertTitle>Registration Error</AlertTitle>
              <p>
                Please resubmit according to the following guidelines: <br />
                (1) Username must be unique and at least 3 characters. <br />
                (2) Username is case-sensitive.
                <br />
                (3) Password must be at least 3 alphanumeric characters and
                case-sensitive.
              </p>
            </Alert>
          </>
        )}
        {/* {
          <>
            <Alert severity="success" onClose={() => setShow(false)}>
              <AlertTitle>Registration Successful</AlertTitle>
              <p>
                Head over to the <Link href="/">Login Page</Link> and log into
                your account for the first time!
              </p>
            </Alert>
          </>
        } */}
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
  { signup }
)(SignupForm);
