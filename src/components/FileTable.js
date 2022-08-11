import { Table, Avatar, Typography, Button } from "web3uikit";
import { useState, useRef, useEffect } from "react";
import { useMoralis } from "react-moralis";

const FileTable = ({ isupdate }) => {
  const [fileArr, setFileArray] = useState();
  const [fileData, setFileData] = useState();
  const { Moralis, account } = useMoralis();

  useEffect(() => {
    async function getFile() {
      try {
        const files = Moralis.Object.extend("fileStorage");
        const query = new Moralis.Query(files);
        query.equalTo("fileOwner", account);
        query.equalTo("isVisible", true);
        const results = await query.find();

        setFileArray(results);
      } catch (error) {
        console.error(error);
      }
    }
    getFile();
    // console.log(fileArr);
    const myfiles = fileArr;
    const tableData = [];
    {
      myfiles?.map((file, i) => {
        const name = file.attributes.fileName;
        const crateTime = file.attributes.createdAt.toLocaleString("chinese", {
          hour12: false,
        });
        const owner = file.attributes.fileOwner.slice(0, 10);
        const size = file.attributes.fileSize;
        const size_KB = size / 1024;
        const size_MB = size_KB / 1024;
        const size_show = size_MB.toFixed(1);
        const fileID = file.id;
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
              icon="x"
              iconColor="red"
              iconLayout="icon-only"
              isTransparent
              onClick={() => onDeletebtn(fileID)}
            />
          </>
        );
        const data = [i + 1, name, size_show, crateTime, btns];

        tableData.push(data);
      });
    }
    setFileData(tableData);
  }, [isupdate]);

  async function onEditbtn(fileID) {
    const files = Moralis.Object.extend("fileStorage");
    const query = new Moralis.Query(files);
    query.equalTo("objectId", fileID);
    const results = await query.first();
    results.set("isShare", true);
    await results.save();
    alert("文件已共享！");
  }

  async function onDeletebtn(fileID) {
    const files = Moralis.Object.extend("fileStorage");
    const query = new Moralis.Query(files);
    query.equalTo("objectId", fileID);
    const results = await query.first();
    results.set("isVisible", false);
    await results.save();
    // console.log(results);
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
          <span>创建日期</span>,
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
export default FileTable;
