import React from "react";
import "./Profile.css";
import { useState, useRef, useEffect } from "react";
import {
  useMoralis,
  useWeb3ExecuteFunction,
  useMoralisFile,
} from "react-moralis";
import { Icon, Button } from "web3uikit";
import FileTable from "../components/FileTable";
import ShareTable from "../components/ShareTable";
import StreamTable from "../components/StreamTable";
import GetTable from "../components/GetTable";

const Profile = () => {
  const inputFile = useRef(null);
  const [theFile, setTheFile] = useState();
  const [selectFile, setSelectFile] = useState();
  const [fileArr, setFileArray] = useState();

  const { saveFile } = useMoralisFile();

  const [Isupdate, setUpdata] = useState(false);

  const { Moralis, account } = useMoralis();
  const user = Moralis.User.current();
  // await Moralis.enableWeb3();
  const contractProcessor = useWeb3ExecuteFunction();

  const changeHandler = (event) => {
    const file = event.target.files[0];
    setTheFile(file);
    setSelectFile(file.name);
  };

  // save file to IPFS
  const uploadFile = async () => {
    const myFiles = Moralis.Object.extend("fileStorage");
    const newfile = new myFiles();

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      const ipfsAddress = file.ipfs();
      const date = new Date();
      const currentTime = date.toLocaleString("zh", {
        timeZone: "Asia/Shanghai",
      });
      const fileTrace = [
        {
          from: "local",
          to: user.attributes.ethAddress,
          timeStamp: currentTime,
        },
      ];
      const JSONTrace = await saveFile(
        "fileTrace.json",
        { base64: btoa(JSON.stringify(fileTrace)) },
        {
          type: "base64",
          saveIPFS: true,
        }
      );
      newfile.set("fileTrace", JSONTrace.ipfs());
      newfile.set("fileAddress", ipfsAddress);
      newfile.set("fileName", data.name);
      newfile.set("fileSize", data.size);
      newfile.set("fileOwner", user.attributes.ethAddress);
      newfile.set("shareFrom", user.attributes.ethAddress);
      newfile.set("isVisible", true);
      newfile.set("isShare", false);
      //save file to server
      await newfile.save();
    }
    alert("文件上传成功！");
    window.location.reload();
    setUpdata(!Isupdate);
  };

  const Update = () => {
    setUpdata(!Isupdate);
  };

  const onSelecterClick = () => {
    inputFile.current.click();
  };

  useEffect(() => {
    setUpdata(!Isupdate);
  }, []);

  return (
    <>
      <div>
        <div className="pageIdentify">个人中心</div>
        <div className="mainContent">
          <div className="fileList">
            <div className="title-box">
              <div className="title">我的文件</div>
              <div className="post" onClick={Update}>
                更新
                <Icon fill="#ffffff" size={20} svg="reload" />
              </div>
            </div>
            <FileTable isupdate={Isupdate}></FileTable>
          </div>

          <div className="fileList">
            <div className="title-box">
              <div className="title">已共享的文件</div>
              <div className="post" onClick={Update}>
                更新
                <Icon fill="#ffffff" size={20} svg="reload" />
              </div>
            </div>
            <ShareTable isupdate={Isupdate}></ShareTable>
          </div>

          <div className="fileList">
            <div className="title-box">
              <div className="title">获取的文件</div>
              <div className="post" onClick={Update}>
                更新
                <Icon fill="#ffffff" size={20} svg="reload" />
              </div>
            </div>
            <GetTable isupdate={Isupdate}></GetTable>
          </div>

          <div className="fileList">
            <div className="title-box">
              <div className="title">文件流</div>
              <div className="post" onClick={Update}>
                更新
                <Icon fill="#ffffff" size={20} svg="reload" />
              </div>
            </div>
            <StreamTable isupdate={Isupdate}></StreamTable>
          </div>

          <div className="title-box">
            <div className="title">上传文件</div>
          </div>
          <div className="btn-box">
            <div className="choose-file">
              <div className="post" onClick={onSelecterClick}>
                选择文件
              </div>
              <input
                type="file"
                name="file"
                ref={inputFile}
                onChange={changeHandler}
                style={{ display: "none" }}
              ></input>
              <div
                className="post"
                onClick={uploadFile}
                style={{ backgroundColor: "#8247e5" }}
              >
                上传
                <Icon fill="#ffffff" size={20} svg="checkmark"></Icon>
              </div>
            </div>
          </div>
          <div className="fileName">
            {/* <Icon fill="#ffffff" size={20} svg="file" ></Icon> */}
            <h3>{selectFile}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
