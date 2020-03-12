import React from "react";

// const fakeMessage = {
//   id: 2528,
//   text: "It's an awesome day at Kenzie Academy!",
//   username: "cheriaa43",
//   createdAt: "2020-03-12T16:49:58.012Z",
//   likes: []
// };

class MessageCard extends React.Component {
    render() {
        return (
            <div style={{
                border: "1px solid black", borderRadius: "10px", padding: "1em", margin: "2em"
            }}
            >  
                <h4>{this.props.username}</h4>
                <p>{this.props.text}</p>
                <p>{new Date(this.props.createdAt).toDateString()}</p>
            </div>
        );
    }
}

export default MessageCard;