import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Content from "./Content";
import "./Home.css"; // link to CSS for layout
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
