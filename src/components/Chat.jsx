import React from "react";
import Contacts from "./Contacts";
import Content from "./Content";
import {useChat} from "../hooks/useChat";
import {useAuth} from "../hooks/useAuth";

const Chat = () => {
    const { messages, error, loading } = useChat();
    const { user } = useAuth();
    console.log(messages, "messages", loading, error)
    return (
        <div id="frame">
            <Contacts/>
            <Content messages={messages} currentUser={user} />
        </div>
    )
};

export default Chat;
