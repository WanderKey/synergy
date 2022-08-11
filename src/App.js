import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import "./App.css";
import { useMoralis } from "react-moralis";
import { ConnectButton, Icon } from "web3uikit";
import Logo from "./images/rubick.png";
import { useState } from "react";

const App = () => {
  const { isAuthenticated, Moralis } = useMoralis();
  const mylogo = Logo;

  return (
    <>
      {isAuthenticated ? (
        <div className="page">
          <div className="sideBar">
            <Sidebar />
            <div
              className="logout"
              onClick={() => {
                Moralis.User.logOut().then(() => {
                  window.location.reload();
                });
              }}
            >
              <div className="menuItems">
                退出
                <Icon fill="#ffffff" size={33} svg="logOut" />
              </div>
            </div>
            <footer className="footer-text">
              <h4>©Copyright THU-WangQi 2022 </h4>
            </footer>
          </div>
          <div className="mainWindow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          <div className="rightBar">
            <Rightbar />
          </div>
        </div>
      ) : (
        <div className="loginPage">
          <img className="myLogo" src={mylogo} alt=""></img>
          <ConnectButton />
        </div>
      )}
    </>
  );
};

export default App;
