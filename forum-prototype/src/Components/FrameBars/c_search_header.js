import "../../CSS/c_search_header.css";

export const SearchHeader = () => {
  return (
    <div className="SearchWrapper">
      <LeftWidgets />
      <SearchBar />
      <RightWidgets />
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
        <img  src={`${process.env.PUBLIC_URL}\\icons\\Search\\Search.svg`}/>
        <input id="SearchIn" type="text" placeholder="Search Everything"/>
    </div>
  );
};

const RightWidgets = () => {
  return (
    <div id="RW_Wrapper">
      <img src={`${process.env.PUBLIC_URL}\\icons\\Search\\Plus.svg`} />
      <img src={`${process.env.PUBLIC_URL}\\icons\\Chat.svg`} />
      <img src={`${process.env.PUBLIC_URL}\\icons\\Search\\Notification.svg`} />
      <div id="ProfilePic" />
    </div>
  );
};
