
import React, { useEffect } from "react";
import "./CSS/App.css";

// Routing stuff
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Frame from "./pages/Frame";
import {NewsFeed} from "./pages/NewsFeed";
import NoPage from "./pages/NoPage";
import { SignIn } from "./pages/SignIn";
// import MakePost from "./pages/MakePost";
// import LoginPage from "./pages/Login";


const App = () => {
    // const [, setData] = React.useState(null);
    // const [posts, setPosts] = React.useState([{}]);
    // const [accounts, setAccounts] = React.useState([{}]);
  
    // useEffect(() => {
    //   // getting JSONs
    //   fetch("/Posts.json")
    //     .then((res) => res.json())
    //     .then((Jdata) => {
    //       setPosts(Jdata);
    //       // console.log("Parsed Articles");
    //     });
    //   fetch("/Accounts.json")
    //     .then((res) => res.json())
    //     .then((Jdata) => {
    //       setAccounts(Jdata);
    //       // console.log("Parsed Tutorials");
    //     });
    // }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frame/>}>
            <Route
              index
             element={<Navigate to="/newsfeed"/>}
            />
            <Route path="newsfeed" element={<NewsFeed/>}/>
            {/* <Route path="/makepost" element={<MakePost />} /> */}
            {/* <Route path="/login/:SignType" element={<LoginPage />} /> */}
            {/* <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} /> */}
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="/account/:signtype" element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;