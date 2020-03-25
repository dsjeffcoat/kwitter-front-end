import React from "react";
import {
  Menu,
  UserCard,
  GetUserMessages,
  CreateNewMessage,
  GetUserList
} from "./components";
import { userIsAuthenticated } from "./HOCs";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getuser, deleteuser, createmessage } from "../redux";

class Profile extends React.Component {
  componentDidMount() {
    this.props.getuser(this.props.match.params.username);
  }

  handleDeleteUser = () => {
    this.props.deleteuser(this.props.match.params.username);
  };

  render() {
    const classes = makeStyles(theme => ({
      root: {
        flexGrow: 1
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
      }
    }));
    if (this.props.result === null) {
      return <div></div>;
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Menu isAuthenticated={this.props.isAuthenticated} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Paper className={classes.paper}>
              <UserCard
                username={this.props.result.user.username}
                displayName={this.props.result.user.displayName}
                pictureLocation={this.props.result.user.pictureLocation}
                bio={this.props.result.user.about}
                password={this.props.result.user.password}
                deleteuser={this.handleDeleteUser}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <GetUserMessages username={this.props.match.params.username} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Paper className={classes.paper}>
              <CreateNewMessage username={this.props.result.user.username} />
              <GetUserList />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    result: state.users.getuser.result,
    loading: state.users.getuser.loading,
    error: state.users.getuser.error
  }),
  { getuser, deleteuser, createmessage }
)(userIsAuthenticated(Profile));
