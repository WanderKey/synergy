import React from "react";
import "./Home.css";
import { defaultImgs } from "../defaultimgs";
import { TextArea } from "web3uikit";
import { useState, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Icon, Button } from "web3uikit";
import MarketTable from "../components/MarketTable";
import TransacTable from "../components/TransacTable";

const Home = () => {
  const [Isupdate, setUpdata] = useState(false);

  const Update = () => {
    setUpdata(!Isupdate);
  };

  useEffect(() => {
    setUpdata(!Isupdate);
  }, []);

  return (
    <>
      <div>
        <div className="pageIdentify">数据市场</div>
        <div className="mainContent">
          <div className="fileList">
            <div className="title-box">
              <div className="title">文件列表</div>
              <div className="post" onClick={Update}>
                更新
                <Icon fill="#ffffff" size={20} svg="reload" />
              </div>
            </div>
            <MarketTable isupdate={Isupdate}></MarketTable>
          </div>

          <div className="fileList">
            <div className="title-box">
              <div className="title">传输记录</div>
              <div className="post" onClick={Update}>
                更新
                <Icon fill="#ffffff" size={20} svg="reload" />
              </div>
            </div>
            <TransacTable isupdate={Isupdate}></TransacTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
