import { useState } from "react";
import { renderMatches, useLocation, useNavigate } from "react-router-dom";
import "../../CSS/c_vertical_nav.css";
// storing this externally for neatness
import { Following } from "../../DataObjects/Following";
import { SidebarFeed, UnityGaming } from "../../DataObjects/SideBarArrays";

export const VerticalNav = () => {
  const nav = useNavigate();

  return (
    <div className="NavWrapper">
      {/* top Content */}
      <div>
        <h1>Kontrolia</h1>
        {/* News feeds ------------------------------ */}
        <SideList nav={nav} id="NewsFeeds" msg="News Feeds" array={SidebarFeed}/>
        <div className="Divider" />
        {/* Following ------------------------------ */}
        <div id="Following">
          <p className="SectionLabel">Following</p>
          {Following.map((i) => {
            return <UserImage key={i.name} name={i.name} online={i.online} color={i.profileCol} />;
          })}
        </div>
        <div className="Divider" />
        {/* Unity Gaming ------------------------------ */}
        <SideList nav={nav} id="UnityGaming" msg="unity Gaming" array={UnityGaming}/>
      </div>
      {/* Bottom content */}
      <div></div>
    </div>
  );
};

// Components --------------------------------------
const SideList = (props) => {
  const currentPath =  useLocation().pathname.substring(1);
  const changeSelection = (e, path) => {
    props.nav(`/${path}`);
  };

  return (
    <div id={props.id}>
      <p className="SectionLabel">{props.msg}</p>
      {props.array.map((i) => {
        return (
          <SideBarItem
            key={i.id}
            imgSrc={i.img}
            msg={i.msg}
            add={i.add}
            name={i.id}
            selected={currentPath}
            changeSelection={changeSelection}
          />
        );
      })}
    </div>
  );
};

const SideBarItem = (props) => {
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
// -------
const UserImage = (props) => {
  return (
    <div className="ProfileItem">
      <div
        style={{ backgroundColor: props.color }}
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
