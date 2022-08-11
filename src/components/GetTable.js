import { Table, Avatar, Typography, Button } from "web3uikit";
import { useState, useRef, useEffect } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";
import axios from "axios";

const GetTable = ({ isupdate }) => {
  const [fileArr, setFileArray] = useState();
  const [fileData, setFileData] = useState();
  const { Moralis, account } = useMoralis();
  const user = Moralis.User.current();
  const { saveFile } = useMoralisFile();

  useEffect(() => {
    async function getFile() {
      try {
        const fileListUrl = user.attributes.fileList;
        // console.log(fileListUrl);
        const results = await axios.get(fileListUrl);
        const files = results.data;
        setFileArray(files);
        //   console.log(fileArr);
      } catch (error) {
        console.error(error);
      }
    }
    getFile();
    //   console.log(fileArr);
    const myfiles = fileArr;
    const tableData = [];
    {
      myfiles?.map((file, i) => {
        const name = file.fileName;
        const owner = file.owner.slice(0, 10);
        const size = file.size;
        const size_KB = size / 1024;
        const size_MB = size_KB / 1024;
        const size_show = size_MB.toFixed(1);
        const fileID = file.ID;
        const address = file.address;
        const btns = (
          <>
            <Button
              color="blue"
              isTransparent
              size="small"
              text="共享"
              onClick={() => onEditbtn(fileID)}
            />
            <Button
              icon="download"
              iconColor="blue"
              iconLayout="icon-only"
              isTransparent
              onClick={() => onDownloadbtn(fileID, address)}
            />
          </>
        );
        const data = [i + 1, name, size_show, owner, btns];

        tableData.push(data);
      });
    }
    //   console.log(tableData.reverse());
    setFileData(tableData);
  }, [isupdate]);

  async function onEditbtn(fileID) {
    const files = Moralis.Object.extend("fileStorage");
    const newfile = new files();
    const query = new Moralis.Query(files);
    query.equalTo("objectId", fileID);
    const results = await query.first();

    newfile.set("fileTrace", results.attributes.fileTrace);
    newfile.set("fileAddress", results.attributes.fileAddress);
    newfile.set("fileName", results.attributes.fileName);
    newfile.set("fileSize", results.attributes.fileSize);
    newfile.set("fileOwner", results.attributes.fileOwner);
    newfile.set("shareFrom", user.attributes.ethAddress);
    newfile.set("isVisible", true);
    newfile.set("isShare", true);

    await newfile.save();
    alert("文件已共享！");
  }

  async function onDownloadbtn(fileID, address) {
    window.open(address);

    //将记录添加到trace数据中
    const files = Moralis.Object.extend("fileStorage");
    const query = new Moralis.Query(files);
    query.equalTo("objectId", fileID);
    const results = await query.first();
    const traceUrl = results.attributes.fileTrace;
    const shareFrom = user.attributes.ethAddress;
    // console.log(traceUrl);

    const date = new Date();
    const currentTime = date.toLocaleString("zh", {
      timeZone: "Asia/Shanghai",
    });
    const res = await axios.get(traceUrl);
    const traceData = res.data;
    const newTrace = {
      from: shareFrom,
      to: "local",
      timeStamp: currentTime,
    };
    console.log(newTrace);
    traceData.push(newTrace);
    const JSONTrace = await saveFile(
      "fileTrace.json",
      { base64: btoa(JSON.stringify(traceData)) },
      {
        type: "base64",
        saveIPFS: true,
      }
    );
    console.log(JSONTrace.ipfs());
    results.set("fileTrace", JSONTrace.ipfs());
    // console.log(traceData);

    // results.set("isShare", true);
    await results.save();
    console.log("下载成功");
  }

  return (
    <div>
      <Table
        alignCellItems="center"
        columnsConfig="0.7fr 4fr 1.5fr 3fr 2fr"
        data={fileData}
        header={[
          <span>#</span>,
          <span>文件名</span>,
          <span>文件大小(MB)</span>,
          <span>创建者</span>,
          "",
        ]}
        isColumnSortable={[true, true, true, true, false]}
        maxPages={3}
        onPageNumberChanged={function noRefCheck() {}}
        onRowClick={function noRefCheck() {}}
        pageSize={5}
      />
    </div>
  );
};
export default GetTable;
