import React from "react";
import { connect } from "react-redux";
import {
  getusermessages,
  addlike,
  removelike,
  deletemessage
} from "../../redux";
import MessageCard from "./MessageCard";

class GetUserMessages extends React.Component {
  componentDidMount() {
    this.props.getusermessages(this.props.username);
    // console.log("LOGGED IN USER: " + JSON.stringify(this.props.loggedin.username));
  }
  handleToggleLikes = messageID => {
    console.log("button worked " + messageID);
    this.props.addlike(messageID);
  };

  handleDelete = (messageId) => {
    console.log(messageId)
     this.props.deletemessage(messageId);
    
  };

  render() {
    if (this.props.result === null) {
      return <div>Work please.</div>;
    }
    return (
      <div>
        {this.props.result.map(message => (
          <MessageCard
            key={message.id}
            username={message.username}
            text={message.text}
            id={message.id}
            likes={message.likes.length}
            togglelikes={this.handleToggleLikes}
            deletemessage={this.handleDelete}
            loggedinUser = {this.props.loggedin.username}
          />
        ))}
      </div>
    );
  }
}

// const mapDispatchToProps = { messagelist};
// const mapStateToProps = state => {
//     return {
//         messages: state.messages.messagelist.result
//     }
// };

export default connect(
  state => ({
    loggedin: state.auth.login.result,
    result: state.messages.getusermessages.result,
    loading: state.messages.getusermessages.loading,
    error: state.messages.getusermessages.error
  }),
  { getusermessages, addlike, removelike, deletemessage }
)(GetUserMessages);
