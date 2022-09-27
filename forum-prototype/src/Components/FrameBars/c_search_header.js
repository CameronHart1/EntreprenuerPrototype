import { useNavigate } from "react-router-dom";
import "../../CSS/c_search_header.css";

export const SearchHeader = () => {
  const nav = useNavigate();

  return (
    <div className="SearchWrapper">
      <LeftWidgets />
      <SearchBar />
      <RightWidgets nav={nav} />
    </div>
  );
};
const LeftWidgets = () => {
  return (
    <div id="LW_Wrapper">
      <img src={`${process.env.PUBLIC_URL}\\icons\\Search\\Discovery.svg`} />
      <p>Browse</p>
      <img src={`${process.env.PUBLIC_URL}\\icons\\small-right.svg`} />
    </div>
  );
};

const SearchBar = () => {
  return (
    <div id="SearchBar">
      <img src={`${process.env.PUBLIC_URL}\\icons\\Search\\Search.svg`} />
      <input id="SearchIn" type="text" placeholder="Search Everything" />
    </div>
  );
};

const RightWidgets = (props) => {
  const { nav } = props;
  return (
    <div id="RW_Wrapper">
      <img src={`${process.env.PUBLIC_URL}\\icons\\Search\\Plus.svg`} />
      <img src={`${process.env.PUBLIC_URL}\\icons\\Chat.svg`} />
      <img src={`${process.env.PUBLIC_URL}\\icons\\Search\\Notification.svg`} />
      <div id="ProfilePic" onClick={(e)=>nav("/settings/profile")} />
    </div>
  );
};
