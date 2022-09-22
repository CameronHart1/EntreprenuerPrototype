import React from "react";
// Whe can put a header and footer here and the will be displayed no matter the page the user is on

// import Header from "../components/c_search_header.jsx";
// import Footer from "../components/c_footer";

import "../CSS/p_frame.css";

import { Outlet } from "react-router-dom";
// import Layout from "./pages/Layout";
// import Home from "./pages/Home";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
// import NoPage from "./pages/NoPage";

const Frame = (props) => {
  return (
    <div className="FrameDiv">
      {/* <Header options={defaultSearch}></Header> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Frame;
