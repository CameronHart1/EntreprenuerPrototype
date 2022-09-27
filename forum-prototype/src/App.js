import React, { useEffect } from "react";
import "./CSS/App.css";

// Routing stuff
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Frame from "./pages/Frame";
import { NewsFeed } from "./pages/NewsFeed";
import NoPage from "./pages/NoPage";
import { SignIn } from "./pages/SignIn";
import PostPage from "./pages/Post";
import UploadVideoPage from "./pages/videoupload";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frame />}>
            <Route index element={<Navigate to="/newsfeed" />} />
            <Route path="newsfeed" element={<NewsFeed />} />
            <Route path="post" element={<PostPage />} />
            <Route path="video/upload" element={<UploadVideoPage/>}/>
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
