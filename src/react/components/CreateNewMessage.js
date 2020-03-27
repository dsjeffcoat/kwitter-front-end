import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
//import IconButton from '@material-ui/core/IconButton';
//import FavoriteIcon from '@material-ui/icons/Favorite';
//import CardActions from '@material-ui/core/CardActions';
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { createmessage } from "../../redux";
//import {reset} from 'redux-form';

class CreateNewMessage extends React.Component {
  // constructor (props){
  //     super(props);
  //     this.textInput=React.createRef()
  // }
  state = { text: "" };
  handleCreate = events => {
    // const messageData =  this.state.messageText
    console.log(`state is ${JSON.stringify(this.state)}`);

    this.props.createmessage(this.state);
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const classes = makeStyles({
      root: { maxWidth: 600, maxHeight: 30 },
      title: {
        fontSize: 14
      },
      pos: {
        marginBottom: 12
      }
    });
    const { error } = this.props;
    return (
      <>
        <Card className={classes.root} variant="outlined">
          <Typography
            component="div"
            style={{
              backgroundColor: "#4e209e",
              height: "30px",
              width: "600px",
              color: "white",
              paddingLeft: "75px"
            }}
          >
            Post Your Thoughts{" "}
          </Typography>
          <CardContent>
            <form
              className={classes.root}
              autoComplete="off"
              name="newMessageForm"
            >
              <TextField
                id="messageText"
                name="text"
                label="New Message"
                placeholder={this.state.text}
                variant="outlined"
                onChange={this.handleChange}
              />
            </form>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="#6634f0"
              className={classes.submit}
              onClick={this.handleCreate}
            >
              Post Message
            </Button>

            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </CardContent>
        </Card>
      </>
    );
  }
}

export default connect(
  state => ({
    result: state.messages.createmessage.result,
    loading: state.messages.createmessage.loading,
    error: state.messages.createmessage.error
  }),
  { createmessage }
)(CreateNewMessage);
