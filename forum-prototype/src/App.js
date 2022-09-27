import React, { useContext, useEffect } from "react";
import "./CSS/App.css";

// Routing stuff
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Frame from "./pages/Frame";
import { NewsFeed } from "./pages/NewsFeed";
import NoPage from "./pages/NoPage";
import { SignIn } from "./pages/SignIn";
import PostPage from "./pages/Post";
import UploadVideoPage from "./pages/videoupload";
import ChatPage from "./pages/chat";
import { UserContext } from "./context/user.context";

const App = () => {
  const { currentUser } = useContext(UserContext);
  const MainRedir=currentUser?"/newsfeed":"/account/signin";

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frame />}>
            <Route index element={<Navigate to={MainRedir} />} />
            <Route path="newsfeed" element={<NewsFeed />} />
            <Route path="post" element={<PostPage />} />
            <Route path="video/upload" element={<UploadVideoPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="chat/:chatname" element={<ChatPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
          {/* <Route path="*" element={<NoPage />} /> */}
          <Route path="/account/:signtype" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
