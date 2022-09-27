import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../CSS/p_settings.css";
import "../CSS/CommonElements.css";
import { SettingsTabs } from "../DataObjects/Settings";
import { useContext, useState } from "react";
import { UserContext } from "../context/user.context";

const SettingsPage = () => {
  const nav = useNavigate();
  let { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab ? tab : "");
  const { setCurrentUser } = useContext(UserContext);

  const updateTab = (room) => {
    setActiveTab(room);
  };

  const signOut = () => {
    setCurrentUser(null);
    nav("/");
  };

  const tabSwitch = (param) => {
    switch (param) {
      case "profile":
        return <ProfileTab signOut={signOut} />;
      default:
        return null;
    }
  };

  return (
    <div id="SettingsWrapper">
      <h1>Account Settings</h1>
      <PageTabs nav={nav} updateTab={updateTab} />
      {tabSwitch(activeTab)}
    </div>
  );
};

const PageTabs = (props) => {
  const currentPath = useLocation().pathname.split("/").at(-1);
  const changeSelection = (e, path) => {
    props.nav(`/settings/${path}`);
    props.updateTab(path);
  };

  return (
    <div id="SettingsPageTabs">
      {SettingsTabs.map((i, index) => {
        return (
          <TabButton
            name={i.name}
            link={i.link}
            path={currentPath}
            key={index}
            changeSelection={changeSelection}
          />
        );
      })}
    </div>
  );
};

// SideBar
const TabButton = (props) => {
  const { name, changeSelection, link, path } = props;

  return (
    <div
      className={
        link == path ? "SettingsTabButton SelectedNavButt" : "SettingsTabButton"
      }
      onClick={(e) => changeSelection(e, link)}
    >
      <p>{name}</p>
    </div>
  );
};

const ProfileTab = (props) => {
  return (
    <div id="ProfileTabWrapper">
      <button onClick={props.signOut} className="BlueButton" id="SignOutButton">
        Sign Out
      </button>
    </div>
  );
};

export default SettingsPage;
