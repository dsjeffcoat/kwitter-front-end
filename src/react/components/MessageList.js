import React from "react";
import MessageCard from "./MessageCard";

const messages = [
    {
        "id": 2532,
        "text": "<3 Kenzie Academy!",
        "username": "cheriaa43",
        "createdAt": "2020-03-12T18:17:27.132Z",
        "likes": []
    },
    {
        "id": 2528,
        "text": "It's an awesome day at Kenzie Academy!",
        "username": "cheriaa43",
        "createdAt": "2020-03-12T16:49:58.012Z",
        "likes": []
    }];
    
class MessageList extends React.Component {
    render() {
        return messages.map(message => {
            return <MessageCard
                username={message.username}
                text={message.text}
                createdAt={message.createdAt}
            />
        });
    }
}

export default MessageList;