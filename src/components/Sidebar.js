import React from "react";
import "./Sidebar.css";
import { Icon } from "web3uikit";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { defaultImgs } from "../defaultimgs";
import Logo from "../images/rubick.png";
import { useState } from "react";

const Sidebar = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const mylogo = Logo;
  const [clickCounter, setCounter] = useState(0);

  const clickLogo = () => {
    let count = clickCounter;
    count = count + 1;
    if (count === 9) {
      alert(
        "恭喜你发现彩蛋：fileSynergy-beta版上线的时间正好是作者的生日哦~~~~~~~~~~"
      );
      setCounter(0);
    }
    setCounter(count);
  };

  return (
    <>
      <div className="siderContent">
        <div className="menu">
          <div className="details">
            <img
              src={mylogo}
              className="myLogo"
              alt=""
              onClick={clickLogo}
            ></img>
          </div>

          <Link to="/" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="list" />
              主页
            </div>
          </Link>

          <Link to="/profile" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="user" />
              个人中心
            </div>
          </Link>

          <Link to="/settings" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="cog" />
              设置
            </div>
          </Link>
        </div>

        <div className="details">
          <img
            src={
              user.attributes.profilePic
                ? user.attributes.profilePic
                : defaultImgs[2]
            }
            className="profilePic"
          ></img>
          <div className="profile">
            <div className="who">{user.attributes.username.slice(0, 6)}</div>
            <div className="accWhen">
              {`${user.attributes.ethAddress.slice(
                0,
                4
              )}...${user.attributes.ethAddress.slice(38)}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
