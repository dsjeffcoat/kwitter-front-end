import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
//import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getuserlist } from "../../redux";

class GetUserList extends React.Component {
  componentDidMount() {
    this.props.getuserlist();
  }

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
    const flatProps = {
      options: this.props.result.map(user => user.displayName)
    };
    return (
      <Card className={classes.root}>
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "30px", width: "600px" }}
        >
          Lookup user
        </Typography>
        <CardActionArea>
          <CardContent>
            <Autocomplete
              {...flatProps}
              id="userList"
              renderInput={params => (
                <TextField {...params} label="User List" margin="normal" />
              )}
            />
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing></CardActions>
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
  { getuserlist }
)(GetUserList);
