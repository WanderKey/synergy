import React from "react";
import "./Message.css";
import { defaultImgs } from "../defaultimgs";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

const Message = () => {
  const { Moralis, account } = useMoralis();
  const user = Moralis.User.current();

  const [messageArr, setMessageArr] = useState();

  useEffect(() => {
    async function getMessages() {
      try {
        const Messages = Moralis.Object.extend("Message");
        const query = new Moralis.Query(Messages);
        const results = await query.find();
        const limit7 = results?.slice(-7);
        setMessageArr(limit7);
      } catch (error) {
        console.error(error);
      }
    }
    getMessages();
  });

  return (
    <>
      {messageArr
        ?.map((e) => {
          return (
            <>
              <div className="messageBox">
                <img
                  src={
                    e.attributes.messageUserPic
                      ? e.attributes.messageUserPic
                      : defaultImgs[2]
                  }
                  className="profilepic-small"
                ></img>
                <div className="messages">
                  <div className="userName">
                    {e.attributes.messageUserName}
                    <div className="time">
                      {`${e.attributes.messageAcc.slice(
                        0,
                        4
                      )}...${e.attributes.messageAcc.slice(38)} at
                                ${e.attributes.createdAt.toLocaleString(
                                  "en-us",
                                  { month: "short" }
                                )}  
                                ${e.attributes.createdAt.toLocaleString(
                                  "en-us",
                                  { day: "numeric" }
                                )}
                                `}
                    </div>
                  </div>
                  <div className="messageContent">
                    {e.attributes.messageTxt}
                  </div>
                </div>
              </div>
            </>
          );
        })
        .reverse()}
    </>
  );
};

export default Message;

{
  /* <div>
            <div className="messageBox">
                <img src={defaultImgs[2]} className="profilepic-small"></img>
                <div className="messages">
                    <div className="userName">
                        Wangqi
                        <div className="time">0x42..314  1h</div>
                    </div>
                    <div className="messageContent">
                    Hello World！
                    </div>
                </div>
            </div>
            <div className="messageBox">
                <img src={defaultImgs[3]} className="profilepic-small"></img>
                <div className="messages">
                    <div className="userName">
                        Wangqi
                        <div className="time">0x42..314  1h</div>
                    </div>
                    <div className="messageContent">
                    Hello World！
                    </div>
                </div>
            </div>
            <div className="messageBox">
                <img src={defaultImgs[2]} className="profilepic-small"></img>
                <div className="messages">
                    <div className="userName">
                        Wangqi
                        <div className="time">0x42..314  1h</div>
                    </div>
                    <div className="messageContent">
                    Hello World！
                    </div>
                </div>
            </div>
            <div className="messageBox">
                <img src={defaultImgs[3]} className="profilepic-small"></img>
                <div className="messages">
                    <div className="userName">
                        Wangqi
                        <div className="time">0x42..314  1h</div>
                    </div>
                    <div className="messageContent">
                    Hello World！
                    </div>
                </div>
            </div>
            <div className="messageBox">
                <img src={defaultImgs[4]} className="profilepic-small"></img>
                <div className="messages">
                    <div className="userName">
                        Wangqi
                        <div className="time">0x42..314  1h</div>
                    </div>
                    <div className="messageContent">
                    Hello World！
                    </div>
                </div>
            </div>
        </div> */
}
