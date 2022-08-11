import React from "react";
import "./Settings.css";
import { useState, useRef } from "react";
import { Input, TextArea, Button } from "web3uikit";
import { useMoralis } from "react-moralis";

const Settings = () => {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();

  const [theFile, setTheFile] = useState();
  const [username, setUserName] = useState();
  const [name, setName] = useState();
  const [email, setMail] = useState();
  const [bio, setBio] = useState();
  const [institute, setInsti] = useState();
  const [job, setJob] = useState();
  const { Moralis } = useMoralis();
  const [isUpdataed, setUpdate] = useState(false);
  const user = Moralis.User.current();

  const onBtnClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  const saveEdits = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

    if (username) {
      myDetails.set("username", username);
    }

    if (name) {
      myDetails.set("name", name);
    }
    if (email) {
      myDetails.set("email", email);
    }
    if (institute) {
      myDetails.set("institute", institute);
    }
    if (bio) {
      myDetails.set("bio", bio);
    }
    if (job) {
      myDetails.set("job", job);
    }

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("profilePic", file.ipfs());
    }
    await myDetails.save();
    setUpdate(true);
    window.location.reload();
  };

  // const init = () => {

  //   const _username = user.attributes.username;
  //   const _ethAddress = user.attributes.ethAddress;
  //   const _bio = user.attributes.bio;
  //   const _name = user.attributes.name;
  //   const _email = user.attributes.email;
  //   const _institute = user.attributes.institute;
  //   const _job = user.attributes.job;
  //   setUserName(_username);
  //   setBio(_bio);
  //   setName(_name);
  //   setMail(_email);
  //   setInsti(_institute);
  //   setJob(_job);
  //   console.log("initial")
  // }

  return (
    <>
      <div className="pageIdentify">设置</div>
      <div className="settingsPage">
        <div className="title">账户</div>
        <div className="accountBox">
          <img
            className="profilepic-large"
            src={selectedFile ? selectedFile : user.attributes.profilePic}
          ></img>
          <div className="editBox">
            <div className="btnBox" onClick={onBtnClick}>
              <input
                type="file"
                name="file"
                ref={inputFile}
                onChange={changeHandler}
                style={{ display: "none" }}
              ></input>
              <Button
                color="blue"
                id="changePic"
                text="更换头像"
                theme="secondary"
                type="button"
              />
            </div>
            <div className="input-box-text">
              <div className="input-title">昵称</div>
              <Input
                label=""
                value={isUpdataed ? username : user.attributes.username}
                width="20%"
                labelBgColor="#141d26"
                onChange={(e) => setUserName(e.target.value)}
              ></Input>
            </div>
            <div>
              <div className="input-title">账户地址：</div>
              <div className="text-italic">{user.attributes.ethAddress}</div>
            </div>
          </div>
        </div>

        <div className="title">个人简介</div>
        <TextArea
          width="100%"
          value={isUpdataed ? bio : user.attributes.bio}
          onChange={(e) => setBio(e.target.value)}
        ></TextArea>
        <div className="title">个人信息</div>
        <div className="inputBoxs">
          <div className="inputBox">
            <div className="input-box-text">
              <div className="input-title">姓名</div>
              <Input
                label=""
                name="NameChange"
                value={isUpdataed ? name : user.attributes.name}
                width="100%"
                labelBgColor="#141d26"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-box-text">
              <div className="input-title">邮箱</div>
              <Input
                label=""
                name="MailChange"
                value={isUpdataed ? email : user.attributes.email}
                width="100%"
                labelBgColor="#141d26"
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
          </div>
          <div className="inputBox">
            <div className="input-box-text">
              <div className="input-title">单位</div>
              <Input
                label=""
                name="instiChange"
                value={isUpdataed ? institute : user.attributes.institute}
                width="100%"
                labelBgColor="#141d26"
                onChange={(e) => setInsti(e.target.value)}
              />
            </div>
            <div className="input-box-text">
              <div className="input-title">职务</div>
              <Input
                label=""
                name="jobChange"
                value={isUpdataed ? job : user.attributes.job}
                width="100%"
                labelBgColor="#141d26"
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="save" onClick={() => saveEdits()}>
          保存
        </div>
      </div>
    </>
  );
};

export default Settings;
