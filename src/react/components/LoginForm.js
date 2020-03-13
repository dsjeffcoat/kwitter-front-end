import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { login } from "../../redux";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import { TextField, Button } from "@material-ui/core";

class LoginForm extends React.Component {
  state = { username: "", password: "" };

  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, error } = this.props;
    return (
      <React.Fragment>
        <form id="login-form" onSubmit={this.handleLogin}>
          <label htmlFor="username">Username</label>
          <TextField
            type="text"
            variant="outlined"
            name="username"
            autoFocus
            required
            onChange={this.handleChange}
          />

          <label htmlFor="password">Password</label>
          <TextField
            type="password"
            variant="outlined"
            name="password"
            required
            onChange={this.handleChange}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            Login
          </Button>
          <p>
            Not a user? <Link to={"/signup"}>Sign up here</Link>
          </p>
        </form>
        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.login.result,
    loading: state.auth.login.loading,
    error: state.auth.login.error
  }),
  { login }
)(LoginForm);
