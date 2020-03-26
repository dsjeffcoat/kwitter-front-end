import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getuserlist, getuser, getusermessages } from "../../redux";

class GetUserList extends React.Component {
  state = { username: "" };
  componentDidMount() {
    this.props.getuserlist();
  }
  handleLookup = e => {
    console.log(this.state.username);
    this.props.getuser(this.state.username);
    this.props.getusermessages(this.state.username);
  };
  handleChange = e => {
    console.log("handle change " + e.target.name + ":" + e.target.value);
    this.setState({ [e.target.name]: e.target.value });
    console.log("state = " + JSON.stringify(this.state));
  };
  render() {
    const classes = makeStyles(theme => ({
      root: { maxWidth: 600 },
      title: {
        fontSize: 14
      },
      pos: {
        marginBottom: 12
      }
    }));
    if (this.props.result === null) {
      return <div></div>;
    }
    const flatProps = { options: this.props.result.map(user => user.username) };
    return (
      <Card className={classes.root}>
        <Typography
          component="div"
          style={{
            backgroundColor: "#4e209e",
            height: "30px",
            width: "600px",
            color: "white",
            paddingLeft: "100px"
          }}
        >
          Lookup user
        </Typography>
        <CardActionArea>
          <CardContent>
            <Autocomplete
              {...flatProps}
              id="userList"
              name="username"
              renderInput={params => (
                <TextField
                  {...params}
                  id="txtUser"
                  name="username"
                  label="User List"
                  margin="normal"
                  onSelect={this.handleChange}
                />
              )}
            />
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <Button id="lookupUser" onClick={this.handleLookup}>
            Lookup
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  state => ({
    result: state.users.getuserlist.result,
    loading: state.users.getuserlist.loading,
    error: state.users.getuserlist.error
  }),
  { getuserlist, getuser, getusermessages }
)(GetUserList);
