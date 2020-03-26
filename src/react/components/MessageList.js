import React from "react";
//import MessageCard from "./MessageCard";
import { connect } from "react-redux";
import { messagelist, addlike, removelike } from "../../redux";
import MessageCard from "./MessageCard";
import Grid from "@material-ui/core/Grid";

class MessageList extends React.Component {
  componentDidMount() {
    this.props.messagelist();
  }

  handleToggleLikes = messageID => {
    console.log("button worked " + messageID);
    this.props.addlike(messageID);
  };

  render() {
    if (this.props.result === null) {
      return <div>Work please.</div>;
    }
    return (
      <div>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={4}>
        {this.props.result.map(message => (
          <MessageCard 
            username={message.username} 
            text={message.text} 
            key = {message.id}
            id = {message.id}
            likes={message.likes.length}
            togglelikes = {this.handleToggleLikes}
            loggedinUser = {this.props.loggedin.username}
          />
        ))}</Grid>
        </Grid>
      </div>
    );
  }
}


export default connect(
  state => ({
    loggedin: state.auth.login.result,
    result: state.messages.messagelist.result,
    loading: state.messages.messagelist.loading,
    error: state.messages.messagelist.error
  }),
  { messagelist, addlike, removelike }
)(MessageList);

