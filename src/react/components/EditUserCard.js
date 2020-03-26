import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { edituser } from "../../redux";

class EditUserCard extends React.Component {
  state = {
    password: "",
    displayName: "",
    about: ""
  };

  handleSubmit = event => {
    console.log("Submit event state = " + JSON.stringify(this.state));
    this.props.edituser(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const classes = makeStyles({
      root: {
        maxWidth: 345
      }
    });

    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <form id="update-user" onSubmit={this.handleSubmit}>
                <TextField
                  label="Username"
                  variant="outlined"
                  disabled
                  defaultValue={this.props.username}
                />
                <TextField
                  required
                  id="displayName"
                  label="Display Name"
                  variant="outlined"
                  name="displayName"
                  defaultValue={this.props.displayName}
                  onChange={this.handleChange}
                />
                <TextField
                  id="aboutInfo"
                  label="Tell us about yourself"
                  variant="outlined"
                  name="about"
                  defaultValue={this.props.about}
                  onChange={this.handleChange}
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </form>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="large" color="primary" onClick={this.handleSubmit}>
            Update Profile
          </Button>
        </CardActions>
      </Card>
    );
  }
}
export default connect(
  state => ({
    result: state.users.edituser.result,
    loading: state.users.edituser.loading,
    error: state.users.edituser.error
  }),
  { edituser }
)(EditUserCard);
