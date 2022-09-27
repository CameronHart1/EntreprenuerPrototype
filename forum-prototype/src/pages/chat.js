import { useEffect, useState } from "react";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import "../CSS/p_chat_page.css";
import "../CSS/CommonElements.css";

import { DirectMessages } from "../DataObjects/Messages";

const ChatPage = () => {
  let { chatname } = useParams();
  const [chatRoom, setChatRoom] = useState(chatname ? chatname : "");
  const nav = useNavigate();

  // a fake db that looks up messages
  const [messagesDB, setMessagesDB] = useState(
    DirectMessages.reduce((acc, history) => {
      const { name, Messages, profileCol, LastActive } = history;
      const id = name.split(" ").join("-").toLowerCase();
      return (
        (acc[id] = {
          messages: Messages,
          col: profileCol,
          lastActive: LastActive,
        }),
        acc
      );
    }, {})
  );

  const addMessage = (msg, name) => {
    messagesDB[name].messages.push({ User: 0, Message: msg });
    setMessagesDB((prev) => ({
      ...prev,
      name: {
        ...prev[name],
        Message: [prev[name].Message, { User: 0, Message: msg }],
      },
    }));
  };

  const updateRoom = (room) => {
    setChatRoom(room);
  };

  return (
    <div id="ChatWrapper">
      <div id="ChatRooms" className="ShadowBox">
        <p>Direct Message</p>
        <SideList
          nav={nav}
          id="ChatDM"
          array={DirectMessages}
          path={chatRoom}
          updateRoom={updateRoom}
        />
        <div className="ChatSideDivider" />

        <div id="ChatGC">
          <p>Group Message</p>
        </div>
      </div>
      {chatRoom == "" ? (
        <NoChat />
      ) : (
        <ChatRoomComp
          addMessage={addMessage}
          messages={messagesDB[chatRoom].messages}
          col={messagesDB[chatRoom].col}
          name={
            chatRoom.includes("-")
              ? chatRoom
                  .split("-")
                  .map((element) => {
                    return (
                      element.charAt(0).toUpperCase() +
                      element.slice(1).toLowerCase()
                    );
                  })
                  .join(" ")
              : chatRoom.charAt(0).toUpperCase() +
                chatRoom.slice(1).toLowerCase()
          }
        />
      )}
    </div>
  );
};

// Main Room
const NoChat = () => {
  return (
    <div>
      <h1>Select a chat room to start</h1>
    </div>
  );
};

const ChatRoomComp = (props) => {
  const { name, messages, addMessage } = props;
  var messageChains = [];
  const GenerateChains = () => {
    var lastIndex = -1;
    var chain = {};
    for (var i = 0; i < messages.length; i++) {
      if (lastIndex == messages[i].User) chain.mChain.push(messages[i].Message);
      else if (i != 0) {
        messageChains.push(chain);
        chain = { user: messages[i].User, mChain: [messages[i].Message] };
      } else chain = { user: messages[i].User, mChain: [messages[i].Message] };
      lastIndex = messages[i].User;
    }
    messageChains.push(chain);
    console.log(messageChains);
  };
  GenerateChains();

  return (
    <div id="ChatBody">
      <h1>{name}</h1>
      <div id="TextZone">
        <div className="MessageContainer">
          {messageChains.map((i) => (
            <DM
              chain={i.mChain}
              user={name}
              color={i.user != 0 ? props.col : ""}
            />
          ))}
        </div>
      </div>
      <MessageTyper
        addMessage={addMessage}
        name={name.split(" ").join("-").toLowerCase()}
      />
    </div>
  );
};

const DM = (props) => {
  const { chain, color, user } = props;

  return (
    <div className={color == "" ? "ChatMSG RightMSG" : "ChatMSG LeftMSG"}>
      {color != "" && (
        <div style={{ backgroundColor: color }} className="ProfileDM"></div>
      )}
      {color != "" && <p className="NameDM">{user}</p>}
      {chain.map((i) => (
        <div className="ChatBubble">
          <p>{i}</p>
        </div>
      ))}
    </div>
  );
};

const MessageTyper = (props) => {
  const [text, setText] = useState("");

  const updateText = (e) => {
    setText(e.target.value);
  };

  const PostMessage = (e) => {
    props.addMessage(text, props.name);
  };

  return (
    <div style={{ position: "relative" }}>
      <div id="BottomGradient" />
      <div className="RoundedDiv" id="MessageComposer">
        <div id="MessageTextExtras">
          <div style={{ display: "flex", gap: "10px", "margin-left": "3%" }}>
            <img
              width="24px"
              src={`${process.env.PUBLIC_URL}\\icons\\Chat\\Emote.svg`}
            />
            <img
              width="24px"
              src={`${process.env.PUBLIC_URL}\\icons\\Chat\\Bold.svg`}
            />
            <img
              width="24px"
              src={`${process.env.PUBLIC_URL}\\icons\\Chat\\Italic.svg`}
            />
            <img
              width="24px"
              src={`${process.env.PUBLIC_URL}\\icons\\Chat\\Picture.svg`}
            />
          </div>
          <img
            width="24px"
            style={{ "margin-right": "3%" }}
            src={`${process.env.PUBLIC_URL}\\icons\\Chat\\AddIcon.svg`}
          />
        </div>
        <textarea
          id="MessageTextAreaIn"
          rows="5"
          cols="20"
          defaultValue={text}
          onChange={updateText}
        ></textarea>
      </div>
      <button
        className="BlueButton"
        id="ReplyCommentButton"
        onClick={PostMessage}
      >
        Reply Comment
      </button>
    </div>
  );
};

// ----------------------------------------
const SideList = (props) => {
  const currentPath = useLocation().pathname.split("/").at(-1);
  const changeSelection = (e, path) => {
    props.nav(`/chat/${path}`);
    props.updateRoom(path);
  };

  return (
    <div id={props.id}>
      {props.array.map((i, index) => {
        return (
          <ChatGroupButton
            name={i.name}
            online={i.online}
            profileCol={i.profileCol}
            unread={i.Unread}
            lastActive={i.LastActive}
            path={currentPath}
            key={index}
            changeSelection={changeSelection}
            id={index}
          />
        );
      })}
    </div>
  );
};

// SideBar
const ChatGroupButton = (props) => {
  const {
    name,
    changeSelection,
    online,
    profileCol,
    unread,
    lastActive,
    path,
    id,
  } = props;

  var thisPath = name.split(" ").join("-").toLowerCase();

  //   realisticly we would work with date times here but lazy
  const ActiveString = () => {
    const hours = Math.floor(lastActive / 3600);
    if (hours > 0) {
      if (hours >= 24) return "Over a day ago";
      return `${hours} ${hours == 1 ? "hour" : "hours"} ago`;
    }
    const minutes = Math.floor(lastActive / 1440);
    if (minutes > 0)
      return `${minutes} ${minutes == 1 ? "minute" : "minutes"} ago`;
    return "now";
  };

  return (
    <div
      className={
        thisPath == path ? "ChatGroupSide SelectedNavButt" : "ChatGroupSide"
      }
      onClick={(e) => changeSelection(e, thisPath)}
    >
      <div className="ChatGroupLHS">
        <div style={{ backgroundColor: profileCol }} className="ChatProfilePic">
          <div
            className={online ? "ChatStatusDot" : "ChatStatusDot ChatOffline"}
          ></div>
        </div>
        <div>
          <p className="ChatGroupName">{name}</p>
          <p className="ChatGroupLastOnline">{ActiveString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
