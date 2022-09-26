import { useState } from "react";
import "../../CSS/c_vertical_nav.css";

export const VerticalNav = () => {
  const [selected, setSelected] = useState("");

  const changeSelection = (e,path) => {
    setSelected(path);
  };

  return (
    <div className="NavWrapper">
      <h1>Kontrolia</h1>
      <div id="NewsFeeds">
        <p id="NewsFeedsLabel">News Feeds</p>
        <NfItem
          imgSrc="\icons\SideNav\Game.svg"
          msg="News Feed"
          selected={selected}
          name="newsfeed"
          changeSelection={changeSelection}
        />
        <NfItem
          imgSrc="\icons\SideNav\Trending.svg"
          msg="Trending"
          selected={selected}
          name="trending"
          changeSelection={changeSelection}
        />
        <NfItem
          imgSrc="\icons\SideNav\Profile.svg"
          msg="Following"
          selected={selected}
          name="following"
          changeSelection={changeSelection}
        />
        <NfItem
          imgSrc="\icons\SideNav\Video.svg"
          msg="Your Videos"
          add={true}
          selected={selected}
          name="yourvideos"
          changeSelection={changeSelection}
        />
        <NfItem
          imgSrc="\icons\SideNav\Document.svg"
          msg="Post"
          add={true}
          selected={selected}
          name="post"
          changeSelection={changeSelection}
        />
      <div className="Divider"/>
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
      onClick={e => props.changeSelection(e,props.name)}
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
