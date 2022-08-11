import React from "react";
import "./Rightbar.css";
import { TextArea, Icon } from "web3uikit";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import Message from "./Message";

const Rightbar = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  const [message, setMessage] = useState();

  async function saveMessage() {
    if (!message) return;
    const Messages = Moralis.Object.extend("Message");
    const newMessage = new Messages();
    newMessage.set("messageTxt", message);
    newMessage.set("messageUserName", user.attributes.username);
    newMessage.set("messageAcc", user.attributes.ethAddress);
    newMessage.set("messageUserPic", user.attributes.profilePic);

    await newMessage.save();
    window.location.reload();
  }

  return (
    <>
      <div className="rightbarContent">
        <div className="messageBoard">
          <nav className="nav-text">留言板</nav>
          <div className="textArea">
            <TextArea
              label=""
              name="messageTxtArea"
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              width="95%"
            ></TextArea>
          </div>

          <div className="post-btn" onClick={saveMessage}>
            <div className="post">
              <Icon fill="#ffffff" size={20} svg="telegram" />
            </div>
          </div>

          <div className="messageTabs">
            <div className="messageTab">最新留言</div>
          </div>
          <Message></Message>
        </div>
      </div>
    </>
  );
};

export default Rightbar;
