import { useState } from "react";
import { renderMatches } from "react-router-dom";
import "../../CSS/c_vertical_nav.css";

export const VerticalNav = () => {
  const [selected, setSelected] = useState("");

  const changeSelection = (e, path) => {
    setSelected(path);
  };

  const SidebarFeed = [
    {
      id: "newsfeed",
      msg: "News Feed",
      img: "\\icons\\SideNav\\Game.svg",
      add: false,
    },
    {
      id: "trending",
      msg: "Trending",
      img: "\\icons\\SideNav\\Trending.svg",
      add: false,
    },
    {
      id: "following",
      msg: "Following",
      img: "\\icons\\SideNav\\Profile.svg",
      add: false,
    },
    {
      id: "yourvideos",
      msg: "Your Videos",
      img: "\\icons\\SideNav\\Video.svg",
      add: true,
    },
    {
      id: "post",
      msg: "Post",
      img: "\\icons\\SideNav\\Document.svg",
      add: true,
    },
  ];
  const SidebarFollowing = [
    { name: "Higgins Reyes", online: false },
    { name: "Everett Porter", online: false },
    { name: "Carrie Zamora", online: true },
    { name: "Millie Hicks", online: false },
    { name: "Susan Craig", online: false },
    { name: "Charlotte Cain", online: false },
    { name: "Christina Palmer", online: false },
  ];

  return (
    <div className="NavWrapper">
      <h1>Kontrolia</h1>
      <div id="NewsFeeds">
        <p className="SectionLabel">News Feeds</p>
        {SidebarFeed.map((i) => {
          return (
            <NfItem
              imgSrc={i.img}
              msg={i.msg}
              selected={selected}
              add={i.add}
              name={i.id}
              changeSelection={changeSelection}
            />
          );
        })}
      </div>
      <div className="Divider" />
      <div id="Following">
        <p className="SectionLabel">Following</p>
        {SidebarFollowing.map((i) => {
          return <UserImage name={i.name} online={i.online} />;
        })}
      </div>
      <div className="Divider" />
      <div id="UnityGaming">
        
      </div>
    </div>
  );
};

const NfItem = (props) => {
  return (
    <div
      id={props.name}
      className={
        props.selected == props.name
          ? "NewsFeedItem selectedButt"
          : "NewsFeedItem"
      }
      onClick={(e) => props.changeSelection(e, props.name)}
    >
      <img src={`${process.env.PUBLIC_URL}${props.imgSrc}`}></img>
      <p>{props.msg}</p>
      {props.add && (
        <img
          src={`${process.env.PUBLIC_URL}\\icons\\SideNav\\AddIcon.svg`}
        ></img>
      )}
    </div>
  );
};

const UserImage = (props) => {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <div className="ProfileItem">
      <div
        style={{ backgroundColor: `#${randomColor}` }}
        className="ProfilePic"
      />
      <p>{props.name}</p>
      <img
        src={
          props.online
            ? `${process.env.PUBLIC_URL}\\icons\\SideNav\\live-icon.svg`
            : `${process.env.PUBLIC_URL}\\icons\\notification-small.svg`
        }
      />
    </div>
  );
};
